"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useFadeIn } from "@/hooks/use-fade-in";
import gsap from "gsap";

interface DuckData {
  id: number;
  name: string;
  text: string;
  date: string;
  color: string;
}

interface PhysicsDuck {
  el: HTMLDivElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  mass: number;
  angle: number;
  av: number;
  splashDone: boolean;
  bobPhase: number;
  msg: DuckData;
  color: string;
  gsapAnim: any;
}

const WATER_LEVEL = 0.62;
const GRAVITY = 0.45;
const SUBMERGE_RATIO = 0.32;
const NEON_COLORS = [
  "#ff3d71","#00d4aa","#ffb800","#7c4dff","#2990c0","#ff6d3a",
  "#ff3d9e","#3ad4ff","#ff5e99","#00e5bf","#ffcc33","#9d6eff"
];

const WAVE_LAYERS = [
  { amp:7, freq:0.008, speed:0.7, color:"rgba(0,212,170,0.12)", width:2 },
  { amp:4, freq:0.013, speed:1.1, color:"rgba(0,180,160,0.07)", width:1.5 },
  { amp:2, freq:0.019, speed:1.6, color:"rgba(0,140,120,0.04)", width:1 }
];

const FALLBACK_MESSAGES: DuckData[] = [
  { id:1, name:"匿名", text:"一半一半～～", date:"2026-06-21", color:"#ff3d71" },
  { id:2, name:"匿名", text:"咪西咪西", date:"2026-06-20", color:"#00d4aa" },
  { id:3, name:"匿名", text:"坐下！", date:"2026-06-19", color:"#ffb800" },
  { id:4, name:"不理不理左卫门", text:"你好，出场费一亿万元，请支付", date:"2026-06-19", color:"#7c4dff" },
  { id:5, name:"Latte", text:"能谤讥于市朝，闻寡人之耳者，受下赏！", date:"2026-06-19", color:"#2990c0" }
];

interface Ripple { x:number; y:number; radius:number; maxRadius:number; opacity:number; }
interface Splash { x:number; y:number; vx:number; vy:number; color:string; size:number; opacity:number; }

function createDuckCanvas(size:number): string {
  const canvas = document.createElement("canvas");
  const scale = 2;
  canvas.width = size * scale;
  canvas.height = size * scale;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const cx = size, cy = size;
  const s = scale;
  ctx.save();
  ctx.scale(s, s);
  const bodyColor = "#FFD700";
  const wingColor1 = "#FFB833";
  const wingColor2 = "#FF9500";
  const beakColor = "#FF8C00";
  const eyeColor = "#0a0a0a";
  const whiteStroke = "#FFFFFF";
  ctx.strokeStyle = whiteStroke;
  ctx.lineWidth = 5 / s;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.ellipse(0, 8, 30, 26, 0, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.arc(22, -18, 18, 0, Math.PI * 2);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.moveTo(12, -5);
  ctx.quadraticCurveTo(18, -12, 22, -18);
  ctx.quadraticCurveTo(26, -12, 16, -5);
  ctx.closePath();
  ctx.fill(); ctx.stroke();
  var wingGrad = ctx.createLinearGradient(-25, 0, -10, 15);
  wingGrad.addColorStop(0, wingColor1);
  wingGrad.addColorStop(1, wingColor2);
  ctx.fillStyle = wingGrad;
  ctx.beginPath();
  ctx.moveTo(-18, -2);
  ctx.quadraticCurveTo(-28, -10, -22, 8);
  ctx.quadraticCurveTo(-18, 18, -10, 12);
  ctx.quadraticCurveTo(-14, 2, -18, -2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = whiteStroke;
  ctx.lineWidth = 4 / s;
  ctx.stroke();
  ctx.fillStyle = beakColor;
  ctx.beginPath();
  ctx.moveTo(35, -20);
  ctx.quadraticCurveTo(48, -26, 50, -22);
  ctx.quadraticCurveTo(50, -18, 42, -18);
  ctx.quadraticCurveTo(36, -16, 35, -20);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = whiteStroke;
  ctx.lineWidth = 3 / s;
  ctx.stroke();
  ctx.fillStyle = bodyColor;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.quadraticCurveTo(-36, -8, -32, -14);
  ctx.quadraticCurveTo(-30, -6, -28, 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = whiteStroke;
  ctx.lineWidth = 3 / s;
  ctx.stroke();
  ctx.fillStyle = eyeColor;
  ctx.beginPath();
  ctx.arc(28, -22, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(29.5, -23.5, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,150,150,0.3)";
  ctx.beginPath();
  ctx.ellipse(32, -14, 5, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  return canvas.toDataURL();
}

export default function Guestbook() {
  const ref = useFadeIn();
  const poolRef = useRef<HTMLDivElement>(null);
  const rippleCanvasRef = useRef<HTMLCanvasElement>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);
  const ducksLayerRef = useRef<HTMLDivElement>(null);
  const ducksRef = useRef<PhysicsDuck[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const splashesRef = useRef<Splash[]>([]);
  const animFrameRef = useRef(0);
  const timeRef = useRef(0);
  const poolSizeRef = useRef({ w:0, h:0 });
  const [duckCount, setDuckCount] = useState(0);
  const [activeCard, setActiveCard] = useState<{name:string;text:string;date:string;color:string}|null>(null);
  const [formName, setFormName] = useState("");
  const [formText, setFormText] = useState("");
  const [submitMsg, setSubmitMsg] = useState("");
  const dragRef = useRef({ duck:null as PhysicsDuck|null, isDragging:false, hasMoved:false, offX:0, offY:0, startX:0, startY:0 });

  const getWaterY = useCallback(() => WATER_LEVEL * poolSizeRef.current.h, []);
  const duckSurfaceY = useCallback((duck:PhysicsDuck) => WATER_LEVEL * poolSizeRef.current.h - duck.size * 0.85 * (1 - SUBMERGE_RATIO), []);
  const createRipple = useCallback((x:number, y:number, maxRadius:number, opacity?:number) => {
    ripplesRef.current.push({ x, y, radius:0, maxRadius: maxRadius||30, opacity: opacity||0.55 });
  }, []);
  const createSplash = useCallback((x:number, y:number, color:string, intensity:number) => {
    const n = Math.floor(8 + intensity * 3);
    for (let i = 0; i < n; i++) {
      const a = -Math.PI/2 + (Math.random()-0.5)*Math.PI*1.2;
      splashesRef.current.push({ x:x+(Math.random()-0.5)*20, y:y+(Math.random()-0.5)*4, vx:Math.cos(a)*(1+Math.random()*intensity), vy:Math.sin(a)*(1+Math.random()*intensity)-2, color, size:1+Math.random()*3, opacity:0.85 });
    }
  }, []);
  const playSplashAnimation = useCallback((duck:PhysicsDuck) => {
    const surfaceY = duckSurfaceY(duck);
    if (duck.gsapAnim) { duck.gsapAnim.kill(); duck.gsapAnim = null; }
    const sinkY = surfaceY + duck.size * 0.25;
    duck.gsapAnim = gsap.timeline({
      onComplete: () => { duck.y=surfaceY; duck.vy=0; duck.splashDone=true; duck.bobPhase=Math.random()*Math.PI*2; duck.gsapAnim=null; duck.el.style.top=duck.y+"px"; }
    });
    duck.gsapAnim
      .to(duck, { y:sinkY, duration:0.28, ease:"power3.in", onUpdate:()=>{ duck.el.style.top=duck.y+"px"; const t=Math.min(1,(duck.y-surfaceY)/(duck.size*0.25)); duck.el.style.opacity=String(1-t*0.45); } })
      .to(duck, { y:surfaceY, duration:0.27, ease:"power1.out", onUpdate:()=>{ duck.el.style.top=duck.y+"px"; duck.el.style.opacity="1"; } });
  }, [duckSurfaceY]);

  const spawnDuck = useCallback((msg:DuckData, initial:boolean) => {
    const poolW = poolSizeRef.current.w, poolH = poolSizeRef.current.h;
    if (poolW===0||poolH===0) return null;
    const color = msg.color || NEON_COLORS[Math.floor(Math.random()*NEON_COLORS.length)];
    const size = 48 + Math.random()*20;
    const x = 30 + Math.random()*Math.max(50, poolW-100);
    const duck:PhysicsDuck = { el:document.createElement("div"), msg, color, x, y:0, vx:0, vy:0, size, mass:0.4+Math.random()*0.6, angle:0, av:0, splashDone:initial, bobPhase:Math.random()*Math.PI*2, gsapAnim:null };
    if (initial) { duck.y=duckSurfaceY(duck); duck.vx=(Math.random()-0.5)*0.4; duck.angle=(Math.random()-0.5)*8; }
    else { duck.y=-size-30; duck.vy=3+Math.random()*4; duck.vx=(Math.random()-0.5)*2; }
    const bgUrl = createDuckCanvas(size);
    duck.el.className = "duck-sprite";
    duck.el.setAttribute("data-clickable","");
    duck.el.style.cssText = [
      "position:absolute;left:"+duck.x+"px;top:"+duck.y+"px;width:"+size+"px;height:"+size+"px;",
      "cursor:pointer;z-index:2;pointer-events:auto;transform-origin:center center;",
      "background-size:contain;background-repeat:no-repeat;background-position:center;",
      "background-image:url("+bgUrl+");"
    ].join("");
    ducksLayerRef.current?.appendChild(duck.el);
    ducksRef.current.push(duck);
    setDuckCount(ducksRef.current.length);
    return duck;
  }, [duckSurfaceY]);

  useEffect(() => {
    FALLBACK_MESSAGES.forEach(msg => spawnDuck(msg, true));
  }, [spawnDuck]);

  useEffect(() => {
    let lastTime = 0, accum = 0;
    const tick = (ts:number) => {
      if (document.hidden) { animFrameRef.current = requestAnimationFrame(tick); return; }
      if (!lastTime) lastTime = ts;
      accum += ts - lastTime; lastTime = ts;
      if (accum < 33) { animFrameRef.current = requestAnimationFrame(tick); return; }
      accum = 0;
      timeRef.current += 0.033;
      const poolW = poolSizeRef.current.w, poolH = poolSizeRef.current.h;
      if (poolW===0||poolH===0) { animFrameRef.current = requestAnimationFrame(tick); return; }
      const waterY = WATER_LEVEL * poolH;
      ducksRef.current.forEach(d => {
        if (d.gsapAnim) return;
        const duckBottom = d.y + d.size * 0.85;
        if (d.splashDone) {
          const targetY = duckSurfaceY(d);
          d.y += (targetY-d.y)*0.06;
          d.y += Math.sin(d.bobPhase+timeRef.current*1.5)*0.4;
          d.vx += Math.sin(timeRef.current*0.6+d.bobPhase)*0.008;
          d.vx += (Math.random()-0.5)*0.015;
          d.vx *= 0.988;
          d.av += (Math.random()-0.5)*0.005;
          d.av *= 0.97;
          d.angle += d.av;
          if (Math.abs(d.angle)>15) d.av*=0.5;
        } else {
          d.vy += GRAVITY; d.vx *= 0.98;
          if (duckBottom >= waterY-5 && d.vy > 1) {
            d.y = waterY - d.size*0.85; d.vx *= 0.25;
            createRipple(d.x+d.size/2, waterY, d.size*0.85);
            createRipple(d.x+d.size/2, waterY, d.size*0.35, 0.25);
            createSplash(d.x+d.size/2, waterY, d.color, d.vy*0.35);
            playSplashAnimation(d);
            return;
          }
        }
        if (d.x<5){d.x=5;d.vx*=-0.3;}
        if (d.x>poolW-d.size-5){d.x=poolW-d.size-5;d.vx*=-0.3;}
        if (d.y<8){d.y=8;d.vy=Math.abs(d.vy)*0.3;}
        if (d.y>poolH-d.size-5){d.y=poolH-d.size-5;d.vy*=-0.3;}
        d.x+=d.vx; d.y+=d.vy;
        if (d.splashDone && Math.abs(d.vx)>0.2 && Math.random()<0.02) {
          createRipple(d.x+d.size/2, waterY, 4+Math.abs(d.vx)*1.5, 0.25);
        }
      });
      for (let i=0;i<ducksRef.current.length;i++){
        for (let j=i+1;j<ducksRef.current.length;j++){
          const a=ducksRef.current[i], b=ducksRef.current[j];
          if (!a.splashDone||!b.splashDone||a.gsapAnim||b.gsapAnim) continue;
          const dx=(a.x+a.size/2)-(b.x+b.size/2), dy=(a.y+a.size*0.35)-(b.y+b.size*0.35);
          const dist=Math.sqrt(dx*dx+dy*dy), minDist=(a.size+b.size)*0.35;
          if (dist<minDist&&dist>0.1){
            const overlap=minDist-dist, nx=dx/dist, ny=dy/dist, tm=a.mass+b.mass;
            a.x+=nx*overlap*b.mass/tm*0.5; a.y+=ny*overlap*b.mass/tm*0.5;
            b.x-=nx*overlap*a.mass/tm*0.5; b.y-=ny*overlap*a.mass/tm*0.5;
            a.vx*=0.85;a.vy*=0.85;b.vx*=0.85;b.vy*=0.85;
            a.av+=(Math.random()-0.5)*0.6; b.av+=(Math.random()-0.5)*0.6;
            if (overlap>3) createRipple((a.x+b.x)/2+a.size/4, WATER_LEVEL*poolH, 6+overlap*0.8, 0.25);
          }
        }
      }
      ducksRef.current.forEach(d => { if(!d.gsapAnim){d.el.style.left=d.x+"px";d.el.style.top=d.y+"px";d.el.style.transform="rotate("+d.angle+"deg)";} });
      ripplesRef.current = ripplesRef.current.filter(r => { r.radius+=1.5+r.radius*0.002; r.opacity-=0.008; return r.opacity>0&&r.radius<r.maxRadius; });
      splashesRef.current = splashesRef.current.filter(s => { s.x+=s.vx;s.y+=s.vy;s.vy+=0.12;s.opacity-=0.018; return s.opacity>0; });
      const rippleCtx = rippleCanvasRef.current?.getContext("2d");
      if (rippleCtx) {
        rippleCtx.clearRect(0,0,poolW,poolH);
        ripplesRef.current.forEach(r => {
          rippleCtx.beginPath(); rippleCtx.arc(r.x,r.y,r.radius,0,2*Math.PI);
          rippleCtx.strokeStyle="rgba(0,212,170,"+(r.opacity*0.7)+")";
          rippleCtx.lineWidth=Math.max(0.8,3*(1-r.radius/r.maxRadius));
          rippleCtx.stroke();
          var innerR=r.radius*0.55;
          if(innerR>2){rippleCtx.beginPath();rippleCtx.arc(r.x,r.y,innerR,0,2*Math.PI);rippleCtx.strokeStyle="rgba(0,212,170,"+(r.opacity*0.35)+")";rippleCtx.lineWidth=Math.max(0.5,2*(1-r.radius/r.maxRadius));rippleCtx.stroke();}
          var outerR=r.radius*1.35;
          if(outerR<r.maxRadius){rippleCtx.beginPath();rippleCtx.arc(r.x,r.y,outerR,0,2*Math.PI);rippleCtx.strokeStyle="rgba(0,180,160,"+(r.opacity*0.18)+")";rippleCtx.lineWidth=Math.max(0.3,1.2*(1-r.radius/r.maxRadius));rippleCtx.stroke();}
        });
        splashesRef.current.forEach(s => {
          rippleCtx.beginPath(); rippleCtx.arc(s.x,s.y,s.size,0,2*Math.PI);
          var hex=Math.floor(Math.min(255,s.opacity*255)).toString(16).padStart(2,"0");
          rippleCtx.fillStyle=s.color+hex; rippleCtx.fill();
        });
      }
      const waveCtx = waveCanvasRef.current?.getContext("2d");
      if (waveCtx) {
        waveCtx.clearRect(0,0,poolW,poolH);
        var waterGrad=waveCtx.createLinearGradient(0,waterY,0,poolH);
        waterGrad.addColorStop(0,"rgba(0,40,60,0.0)"); waterGrad.addColorStop(0.12,"rgba(0,55,75,0.05)");
        waterGrad.addColorStop(0.4,"rgba(0,70,90,0.08)"); waterGrad.addColorStop(1,"rgba(0,25,45,0.15)");
        waveCtx.beginPath();
        for(var i=0;i<=1;i+=0.002){
          var x=i*poolW,y=waterY;
          for(var w=0;w<WAVE_LAYERS.length;w++){var L=WAVE_LAYERS[w];y+=Math.sin(i*poolW*L.freq+timeRef.current*L.speed)*L.amp;}
          if(i===0)waveCtx.moveTo(x,y);else waveCtx.lineTo(x,y);
        }
        waveCtx.lineTo(poolW,poolH); waveCtx.lineTo(0,poolH); waveCtx.closePath();
        waveCtx.fillStyle=waterGrad; waveCtx.fill();
        for(var w=0;w<WAVE_LAYERS.length;w++){
          var L=WAVE_LAYERS[w]; waveCtx.beginPath();
          for(var i2=0;i2<=1;i2+=0.003){
            var x2=i2*poolW,y2=waterY;
            for(var wl=0;wl<WAVE_LAYERS.length;wl++){var layer=WAVE_LAYERS[wl];y2+=Math.sin(i2*poolW*layer.freq+timeRef.current*layer.speed)*layer.amp;}
            if(i2===0)waveCtx.moveTo(x2,y2);else waveCtx.lineTo(x2,y2);
          }
          waveCtx.strokeStyle=L.color; waveCtx.lineWidth=L.width; waveCtx.stroke();
        }
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [createRipple, createSplash, duckSurfaceY, playSplashAnimation]);

  useEffect(() => {
    const handleResize = () => {
      if(!poolRef.current) return;
      const rect = poolRef.current.getBoundingClientRect();
      poolSizeRef.current = { w:rect.width, h:rect.height };
      if(rippleCanvasRef.current){rippleCanvasRef.current.width=rect.width;rippleCanvasRef.current.height=rect.height;}
      if(waveCanvasRef.current){waveCanvasRef.current.width=rect.width;waveCanvasRef.current.height=rect.height;}
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const layer = ducksLayerRef.current;
    if(!layer) return;
    const onStart = (e:MouseEvent|TouchEvent) => {
      const target = (e.target as HTMLElement).closest(".duck-sprite");
      if(!target) return;
      if(e instanceof TouchEvent) e.preventDefault();
      const duck = ducksRef.current.find(d=>d.el===target);
      if(!duck) return;
      if(duck.gsapAnim){duck.gsapAnim.kill();duck.gsapAnim=null;}
      const drag = dragRef.current;
      drag.duck=duck; drag.isDragging=false; drag.hasMoved=false;
      const rect = poolRef.current!.getBoundingClientRect();
      const cx = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      const cy = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      drag.offX=cx-rect.left-duck.x; drag.offY=cy-rect.top-duck.y;
      drag.startX=cx; drag.startY=cy;
      duck.el.style.zIndex="20"; duck.el.style.transition="none"; duck.el.style.opacity="1";
    };
    const onMove = (e:MouseEvent|TouchEvent) => {
      const drag = dragRef.current;
      if(!drag.duck) return;
      const cx = e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      const cy = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
      if(!drag.isDragging){
        const dx=cx-drag.startX, dy=cy-drag.startY;
        if(Math.abs(dx)<6&&Math.abs(dy)<6) return;
        drag.isDragging=true; drag.hasMoved=true;
        if(e.cancelable&&e instanceof TouchEvent) e.preventDefault();
      }
      const rect = poolRef.current!.getBoundingClientRect();
      drag.duck.x=Math.max(5,Math.min(poolSizeRef.current.w-drag.duck.size-5,cx-rect.left-drag.offX));
      drag.duck.y=Math.max(5,Math.min(poolSizeRef.current.h-drag.duck.size-5,cy-rect.top-drag.offY));
      drag.duck.vx=0; drag.duck.vy=0; drag.duck.av=0;
      drag.duck.el.style.left=drag.duck.x+"px"; drag.duck.el.style.top=drag.duck.y+"px";
    };
    const onEnd = () => {
      const drag = dragRef.current;
      if(!drag.duck) return;
      drag.duck.el.style.zIndex="2"; drag.duck.el.style.transition="";
      if(!drag.hasMoved){
        showDuckCard(drag.duck.msg, drag.duck.el);
        drag.duck=null; return;
      }
      const waterY = getWaterY();
      const duckBottom = drag.duck.y + drag.duck.size*0.85;
      if(duckBottom < waterY-10){
        drag.duck.splashDone=false; drag.duck.vy=0; drag.duck.vx=0;
        if(drag.duck.gsapAnim){drag.duck.gsapAnim.kill();drag.duck.gsapAnim=null;}
        const sinkTarget = poolSizeRef.current.h - drag.duck.size - 5;
        drag.duck.gsapAnim = gsap.timeline({
          onComplete:()=>{drag.duck!.y=duckSurfaceY(drag.duck!);drag.duck!.vy=0;drag.duck!.splashDone=true;drag.duck!.bobPhase=Math.random()*Math.PI*2;drag.duck!.gsapAnim=null;drag.duck!.el.style.top=drag.duck!.y+"px";drag.duck!.el.style.opacity="1";}
        });
        drag.duck.gsapAnim
          .to(drag.duck,{y:waterY-drag.duck.size*0.85,duration:0.2,ease:"power2.in",onUpdate:()=>{drag.duck.el.style.top=drag.duck.y+"px";drag.duck.el.style.opacity="1";}})
          .to(drag.duck,{y:sinkTarget,duration:0.4,ease:"power2.in",onUpdate:()=>{drag.duck.el.style.top=drag.duck.y+"px";var t=Math.max(0,Math.min(1,(drag.duck.y-(waterY-drag.duck.size*0.85))/(sinkTarget-(waterY-drag.duck.size*0.85))));drag.duck.el.style.opacity=String(Math.max(0.3,1-t*0.6));}})
          .to(drag.duck,{y:duckSurfaceY(drag.duck),duration:0.5,ease:"power2.out",onUpdate:()=>{drag.duck.el.style.top=drag.duck.y+"px";drag.duck.el.style.opacity="1";}});
      } else {
        drag.duck.y=duckSurfaceY(drag.duck); drag.duck.splashDone=true; drag.duck.vy=0;
        drag.duck.vx=(Math.random()-0.5)*0.3;
        drag.duck.el.style.top=drag.duck.y+"px";
        createRipple(drag.duck.x+drag.duck.size/2, waterY, 10, 0.35);
      }
      drag.duck=null;
    };
    layer.addEventListener("mousedown",onStart);
    layer.addEventListener("touchstart",onStart,{passive:false});
    document.addEventListener("mousemove",onMove);
    document.addEventListener("touchmove",onMove,{passive:false});
    document.addEventListener("mouseup",onEnd);
    document.addEventListener("touchend",onEnd);
    return ()=>{
      layer.removeEventListener("mousedown",onStart);
      layer.removeEventListener("touchstart",onStart);
      document.removeEventListener("mousemove",onMove);
      document.removeEventListener("touchmove",onMove);
      document.removeEventListener("mouseup",onEnd);
      document.removeEventListener("touchend",onEnd);
    };
  }, [createRipple, duckSurfaceY, getWaterY]);

  const showDuckCard = useCallback((msg:DuckData, el:HTMLElement) => {
    setActiveCard({name:msg.name,text:msg.text,date:msg.date,color:msg.color});
    el.classList.add("bounce");
    setTimeout(()=>el.classList.remove("bounce"),350);
  }, []);

  const handleSubmit = useCallback((e:React.FormEvent) => {
    e.preventDefault();
    if(!formText.trim()) return;
    const msg:DuckData = {
      id:Date.now(),
      name:formName.trim()||"匿名",
      text:formText.trim(),
      date:new Date().toISOString().slice(0,10),
      color:NEON_COLORS[Math.floor(Math.random()*NEON_COLORS.length)]
    };
    const duck = spawnDuck(msg,false);
    if(duck){duck.vy=3+Math.random()*4;duck.vx=(Math.random()-0.5)*3;duck.splashDone=false;}
    setFormName(""); setFormText("");
    setSubmitMsg("\uD83E\uDD86 \u9E45\u5B50\u5DF2\u6295\u5165\u6C34\u6C60\uFF01");
    setTimeout(()=>setSubmitMsg(""),2500);
  }, [formName, formText, spawnDuck]);

  return (
    <section className="section" ref={ref}>
      <div className="container-wide">
        <div className="fade-in text-center">
          <p className="text-caption font-mono uppercase tracking-widest text-latte">guestbook</p>
          <h2 className="mt-3 text-h2" style={{color:"#1a1410"}}>\u7559\u8A00\u677F</h2>
        </div>
        <div className="duck-pool-wrapper" style={{marginTop:"2rem"}}>
          <div style={{textAlign:"center",marginBottom:"0.8rem",fontSize:"1.1rem",fontWeight:500,color:"#00d4aa"}}>
            \uD83E\uDD86 \u6B22\u8FCE\u6295\u5165\u5C0F\u9EC4\u9E2D
          </div>
          <div style={{textAlign:"center",marginBottom:"0.4rem",fontSize:"0.75rem",color:"#888"}}>
            \u6C60\u4E2D\u5DF2\u6709 <span style={{color:"#ffb800",fontWeight:700}}>{duckCount}</span> \u53EA\u9E45\u5B50
          </div>
          <div ref={poolRef} className="duck-pool" style={{
            position:"relative",width:"100%",height:"420px",borderRadius:"20px",overflow:"hidden",
            background:"linear-gradient(to bottom,#0f1a3a 0%,#0a1628 40%,#0d1f3c 100%)",
            border:"1px solid rgba(0,212,170,0.15)",
            boxShadow:"inset 0 0 60px rgba(0,212,170,0.08), 0 0 30px rgba(0,0,0,0.4)"
          }}>
            <div style={{position:"absolute",bottom:0,left:0,right:0,height:"38%",background:"linear-gradient(to top,rgba(0,100,120,0.15),transparent)",pointerEvents:"none",zIndex:1}}/>
            <canvas ref={rippleCanvasRef} style={{position:"absolute",inset:0,zIndex:2,pointerEvents:"none"}}/>
            <div ref={ducksLayerRef} style={{position:"absolute",inset:0,zIndex:3}}/>
            <canvas ref={waveCanvasRef} style={{position:"absolute",inset:0,zIndex:5,pointerEvents:"none"}}/>
            {activeCard && (
              <div style={{
                position:"absolute",top:"10%",left:"50%",transform:"translateX(-50%)",
                minWidth:"200px",maxWidth:"280px",zIndex:50,pointerEvents:"auto",
                background:"rgba(15,26,58,0.92)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
                borderRadius:"14px",border:"1px solid "+activeCard.color+"44",
                boxShadow:"0 0 30px "+activeCard.color+"22, 0 8px 32px rgba(0,0,0,0.5)",
                padding:"1.2rem",animation:"fadeInUp 0.25s ease-out"
              }} onClick={e=>e.stopPropagation()}>
                <button onClick={()=>setActiveCard(null)} style={{position:"absolute",top:"0.6rem",right:"0.8rem",background:"none",border:"none",color:"#888",fontSize:"1.2rem",cursor:"pointer",padding:"0 0.3rem"}}>\u00D7</button>
                <strong style={{color:activeCard.color,fontSize:"0.95rem",display:"block",marginBottom:"0.2rem"}}>{activeCard.name}</strong>
                <span style={{fontSize:"0.65rem",color:"#666",marginLeft:"0.4rem"}}>{activeCard.date}</span>
                <p style={{marginTop:"0.6rem",lineHeight:1.7,color:"#ccc",fontSize:"0.85rem",wordBreak:"break-word"}}>{activeCard.text}</p>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="gb-form" style={{marginTop:"1.5rem",display:"flex",gap:"0.8rem",flexWrap:"wrap",maxWidth:"900px",marginLeft:"auto",marginRight:"auto"}}>
          <input type="text" placeholder="\u4F60\u7684\u540D\u5B57" maxLength={30} value={formName} onChange={e=>setFormName(e.target.value)} style={{flex:"1 1 150px",padding:"0.7rem 1rem",borderRadius:"10px",border:"1px solid rgba(0,212,170,0.2)",background:"rgba(15,26,58,0.6)",color:"#ddd",fontSize:"0.85rem",outline:"none",backdropFilter:"blur(8px)"}} />
          <input type="text" placeholder="\u8BF4\u70B9\u4EC0\u4E48\u5427..." required maxLength={500} value={formText} onChange={e=>setFormText(e.target.value)} style={{flex:"2 1 200px",padding:"0.7rem 1rem",borderRadius:"10px",border:"1px solid rgba(0,212,170,0.2)",background:"rgba(15,26,58,0.6)",color:"#ddd",fontSize:"0.85rem",outline:"none",backdropFilter:"blur(8px)"}} />
          <button type="submit" style={{padding:"0.7rem 1.5rem",borderRadius:"10px",border:"none",background:"linear-gradient(135deg,#00d4aa,#00a88a)",color:"#0f1a3a",fontWeight:700,fontSize:"0.85rem",cursor:"pointer",whiteSpace:"nowrap",boxShadow:"0 0 15px rgba(0,212,170,0.3)"}}>\uD83E\uDD86 \u4E22\u9E45\u5B50</button>
        </form>
        {submitMsg && <p style={{textAlign:"center",marginTop:"0.6rem",color:"#00d4aa",fontSize:"0.85rem",animation:"fadeInUp 0.3s ease-out"}}>{submitMsg}</p>}
      </div>
      <style jsx>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .duck-sprite{transition:filter 0.3s,opacity 0.3s}
        .duck-sprite:hover{filter:brightness(1.4) drop-shadow(0 0 12px currentColor) !important;opacity:1 !important}
        .duck-sprite.bounce{animation:duckBounce 0.35s ease-out}
        @keyframes duckBounce{0%{transform:scale(1)}40%{transform:scale(1.15)}100%{transform:scale(1)}}
        .duck-pool-wrapper{max-width:900px;margin:0 auto}
        .gb-form{max-width:900px;margin:1.5rem auto 0}
        @media(max-width:640px){.duck-pool{height:340px!important}}
      `}</style>
    </section>
  );
}