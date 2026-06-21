 | / | / |   | = | = | = | = | = | = |   | 入 | 场 | 层 | 逻 | 辑 |   | = | = | = | = | = | = | 
 | v | a | r |   | i | n | t | r | o | L | a | y | e | r |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | " | i | n | t | r | o | - | l | a | y | e | r | " | ) | ; | 
 | v | a | r |   | m | a | i | n | C | o | n | t | e | n | t |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | " | m | a | i | n | - | c | o | n | t | e | n | t | " | ) | ; | 
 | v | a | r |   | h | a | s | E | n | t | e | r | e | d |   | = |   | f | a | l | s | e | ; | 
 | 
 | f | u | n | c | t | i | o | n |   | t | y | p | e | S | u | b | t | i | t | l | e | ( | e | l | , |   | t | e | x | t | ) |   | { | 
 |   |   | i | f |   | ( | ! | e | l |   | | | | |   | ! | t | e | x | t | ) |   | { |   | e | l |   | & | & |   | ( | e | l | . | t | e | x | t | C | o | n | t | e | n | t |   | = |   | " | 记 | 录 | 与 | 分 | 享 | " | ) | ; |   | r | e | t | u | r | n | ; |   | } | 
 |   |   | e | l | . | t | e | x | t | C | o | n | t | e | n | t |   | = |   | " | " | ; | 
 |   |   | v | a | r |   | c | h | a | r | s |   | = |   | t | e | x | t | . | s | p | l | i | t | ( | " | " | ) | ; | 
 |   |   | c | h | a | r | s | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | c | h | , |   | i | ) |   | { | 
 |   |   |   |   | v | a | r |   | s | p | a | n |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | ( | " | s | p | a | n | " | ) | ; | 
 |   |   |   |   | s | p | a | n | . | t | e | x | t | C | o | n | t | e | n | t |   | = |   | c | h | ; | 
 |   |   |   |   | s | p | a | n | . | s | t | y | l | e | . | a | n | i | m | a | t | i | o | n | D | e | l | a | y |   | = |   | ( | 0 | . | 0 | 6 |   | * |   | i | ) |   | + |   | " | s | " | ; | 
 |   |   |   |   | e | l | . | a | p | p | e | n | d | C | h | i | l | d | ( | s | p | a | n | ) | ; | 
 |   |   | } | ) | ; | 
 | } | 
 | 
 | f | u | n | c | t | i | o | n |   | i | n | i | t | I | n | t | r | o | T | e | x | t | ( | ) |   | { | 
 |   |   | v | a | r |   | t | i | t | l | e | E | l |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | " | i | n | t | r | o | T | i | t | l | e | " | ) | ; | 
 |   |   | v | a | r |   | s | u | b | t | i | t | l | e | E | l |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | " | i | n | t | r | o | S | u | b | t | i | t | l | e | " | ) | ; | 
 |   |   | 
 |   |   | f | e | t | c | h | ( | " | d | a | t | a | / | s | i | t | e | . | j | s | o | n | ? | v | = | " |   | + |   | D | a | t | e | . | n | o | w | ( | ) | ) | 
 |   |   |   |   | . | t | h | e | n | ( | f | u | n | c | t | i | o | n | ( | r | ) |   | { |   | r | e | t | u | r | n |   | r | . | j | s | o | n | ( | ) | ; |   | } | ) | 
 |   |   |   |   | . | t | h | e | n | ( | f | u | n | c | t | i | o | n | ( | d | a | t | a | ) |   | { | 
 |   |   |   |   |   |   | i | f |   | ( | d | a | t | a | . | n | a | m | e |   | & | & |   | t | i | t | l | e | E | l | ) |   | t | i | t | l | e | E | l | . | t | e | x | t | C | o | n | t | e | n | t |   | = |   | d | a | t | a | . | n | a | m | e | ; | 
 |   |   |   |   |   |   | i | f |   | ( | d | a | t | a | . | t | a | g | l | i | n | e |   | & | & |   | s | u | b | t | i | t | l | e | E | l | ) |   | t | y | p | e | S | u | b | t | i | t | l | e | ( | s | u | b | t | i | t | l | e | E | l | , |   | d | a | t | a | . | t | a | g | l | i | n | e | ) | ; | 
 |   |   |   |   | } | ) | 
 |   |   |   |   | . | c | a | t | c | h | ( | f | u | n | c | t | i | o | n | ( | ) |   | { | 
 |   |   |   |   |   |   | i | f |   | ( | t | i | t | l | e | E | l | ) |   | t | i | t | l | e | E | l | . | t | e | x | t | C | o | n | t | e | n | t |   | = |   | " | L | a | t | t | e | " | ; | 
 |   |   |   |   |   |   | i | f |   | ( | s | u | b | t | i | t | l | e | E | l | ) |   | t | y | p | e | S | u | b | t | i | t | l | e | ( | s | u | b | t | i | t | l | e | E | l | , |   | " | 记 | 录 | 与 | 分 | 享 | " | ) | ; | 
 |   |   |   |   | } | ) | ; | 
 | } | 
 | 
 | f | u | n | c | t | i | o | n |   | s | w | i | t | c | h | T | o | M | a | i | n | ( | ) |   | { | 
 |   |   | i | f |   | ( | h | a | s | E | n | t | e | r | e | d | ) |   | r | e | t | u | r | n | ; | 
 |   |   | h | a | s | E | n | t | e | r | e | d |   | = |   | t | r | u | e | ; | 
 |   |   | 
 |   |   | t | r | y |   | { |   | s | e | s | s | i | o | n | S | t | o | r | a | g | e | . | s | e | t | I | t | e | m | ( | " | l | a | t | t | e | _ | v | i | s | i | t | e | d | " | , |   | " | 1 | " | ) | ; |   | } |   | c | a | t | c | h | ( | e | ) |   | { | } | 
 |   |   | 
 |   |   | i | f |   | ( | t | y | p | e | o | f |   | s | t | o | p | P | a | r | t | i | c | l | e | s |   | = | = | = |   | " | f | u | n | c | t | i | o | n | " | ) |   | s | t | o | p | P | a | r | t | i | c | l | e | s | ( | ) | ; | 
 |   |   | 
 |   |   | i | f |   | ( | i | n | t | r | o | L | a | y | e | r | ) |   | { | 
 |   |   |   |   | i | n | t | r | o | L | a | y | e | r | . | c | l | a | s | s | L | i | s | t | . | a | d | d | ( | " | h | i | d | d | e | n | " | ) | ; | 
 |   |   |   |   | s | e | t | T | i | m | e | o | u | t | ( | f | u | n | c | t | i | o | n | ( | ) |   | { | 
 |   |   |   |   |   |   | i | f |   | ( | i | n | t | r | o | L | a | y | e | r | . | p | a | r | e | n | t | N | o | d | e | ) |   | i | n | t | r | o | L | a | y | e | r | . | s | t | y | l | e | . | d | i | s | p | l | a | y |   | = |   | " | n | o | n | e | " | ; | 
 |   |   |   |   | } | , |   | 9 | 0 | 0 | ) | ; | 
 |   |   | } | 
 |   |   | 
 |   |   | i | f |   | ( | m | a | i | n | C | o | n | t | e | n | t | ) |   | { | 
 |   |   |   |   | m | a | i | n | C | o | n | t | e | n | t | . | c | l | a | s | s | L | i | s | t | . | r | e | m | o | v | e | ( | " | i | n | t | r | o | - | a | c | t | i | v | e | " | ) | ; | 
 |   |   |   |   | s | e | t | T | i | m | e | o | u | t | ( | f | u | n | c | t | i | o | n | ( | ) |   | { | 
 |   |   |   |   |   |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | A | l | l | ( | " | . | f | a | d | e | - | i | n | " | ) | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | e | l | ) |   | { | 
 |   |   |   |   |   |   |   |   | e | l | . | c | l | a | s | s | L | i | s | t | . | a | d | d | ( | " | v | i | s | i | b | l | e | " | ) | ; | 
 |   |   |   |   |   |   | } | ) | ; | 
 |   |   |   |   | } | , |   | 3 | 0 | 0 | ) | ; | 
 |   |   | } | 
 |   |   | 
 |   |   | d | o | c | u | m | e | n | t | . | b | o | d | y | . | s | t | y | l | e | . | o | v | e | r | f | l | o | w |   | = |   | " | " | ; | 
 |   |   | d | o | c | u | m | e | n | t | . | d | o | c | u | m | e | n | t | E | l | e | m | e | n | t | . | s | t | y | l | e | . | o | v | e | r | f | l | o | w |   | = |   | " | " | ; | 
 | } | 
 | 
 | f | u | n | c | t | i | o | n |   | b | i | n | d | I | n | t | r | o | E | v | e | n | t | s | ( | ) |   | { | 
 |   |   | v | a | r |   | e | n | t | e | r | E | l |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | " | . | i | n | t | r | o | - | e | n | t | e | r | " | ) | ; | 
 |   |   | v | a | r |   | a | r | r | o | w | E | l | s |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | A | l | l | ( | " | . | i | n | t | r | o | - | a | r | r | o | w | " | ) | ; | 
 |   |   | 
 |   |   | i | f |   | ( | e | n | t | e | r | E | l | ) |   | { | 
 |   |   |   |   | e | n | t | e | r | E | l | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | " | c | l | i | c | k | " | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { | 
 |   |   |   |   |   |   | e | . | p | r | e | v | e | n | t | D | e | f | a | u | l | t | ( | ) | ; | 
 |   |   |   |   |   |   | s | w | i | t | c | h | T | o | M | a | i | n | ( | ) | ; | 
 |   |   |   |   | } | ) | ; | 
 |   |   | } | 
 |   |   | 
 |   |   | a | r | r | o | w | E | l | s | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | e | l | ) |   | { | 
 |   |   |   |   | e | l | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | " | c | l | i | c | k | " | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { | 
 |   |   |   |   |   |   | e | . | p | r | e | v | e | n | t | D | e | f | a | u | l | t | ( | ) | ; | 
 |   |   |   |   |   |   | s | w | i | t | c | h | T | o | M | a | i | n | ( | ) | ; | 
 |   |   |   |   | } | ) | ; | 
 |   |   | } | ) | ; | 
 |   |   | 
 |   |   | d | o | c | u | m | e | n | t | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | " | w | h | e | e | l | " | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { | 
 |   |   |   |   | i | f |   | ( | ! | h | a | s | E | n | t | e | r | e | d |   | & | & |   | i | n | t | r | o | L | a | y | e | r |   | & | & |   | i | n | t | r | o | L | a | y | e | r | . | s | t | y | l | e | . | d | i | s | p | l | a | y |   | ! | = | = |   | " | n | o | n | e | " | ) |   | { | 
 |   |   |   |   |   |   | i | f |   | ( | e | . | d | e | l | t | a | Y |   | > |   | 0 | ) |   | s | w | i | t | c | h | T | o | M | a | i | n | ( | ) | ; | 
 |   |   |   |   | } | 
 |   |   | } | , |   | { |   | p | a | s | s | i | v | e | : |   | t | r | u | e |   | } | ) | ; | 
 |   |   | 
 |   |   | v | a | r |   | s | t | a | r | t | Y |   | = |   | 0 | ; | 
 |   |   | d | o | c | u | m | e | n | t | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | " | t | o | u | c | h | s | t | a | r | t | " | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { | 
 |   |   |   |   | i | f |   | ( | e | . | t | o | u | c | h | e | s | . | l | e | n | g | t | h |   | = | = | = |   | 1 | ) |   | s | t | a | r | t | Y |   | = |   | e | . | t | o | u | c | h | e | s | [ | 0 | ] | . | c | l | i | e | n | t | Y | ; | 
 |   |   | } | , |   | { |   | p | a | s | s | i | v | e | : |   | t | r | u | e |   | } | ) | ; | 
 |   |   | 
 |   |   | d | o | c | u | m | e | n | t | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | " | t | o | u | c | h | e | n | d | " | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { | 
 |   |   |   |   | i | f |   | ( | ! | h | a | s | E | n | t | e | r | e | d |   | & | & |   | i | n | t | r | o | L | a | y | e | r |   | & | & |   | i | n | t | r | o | L | a | y | e | r | . | s | t | y | l | e | . | d | i | s | p | l | a | y |   | ! | = | = |   | " | n | o | n | e | " | ) |   | { | 
 |   |   |   |   |   |   | v | a | r |   | e | n | d | Y |   | = |   | e | . | c | h | a | n | g | e | d | T | o | u | c | h | e | s | [ | 0 | ] | . | c | l | i | e | n | t | Y | ; | 
 |   |   |   |   |   |   | i | f |   | ( | s | t | a | r | t | Y |   | - |   | e | n | d | Y |   | > |   | 5 | 0 | ) |   | s | w | i | t | c | h | T | o | M | a | i | n | ( | ) | ; | 
 |   |   |   |   | } | 
 |   |   | } | , |   | { |   | p | a | s | s | i | v | e | : |   | t | r | u | e |   | } | ) | ; | 
 | } | 
 | 
 | f | u | n | c | t | i | o | n |   | i | n | i | t | I | n | t | r | o | ( | ) |   | { | 
 |   |   | i | f |   | ( | ! | i | n | t | r | o | L | a | y | e | r |   | | | | |   | ! | m | a | i | n | C | o | n | t | e | n | t | ) |   | r | e | t | u | r | n | ; | 
 |   |   | 
 |   |   | v | a | r |   | v | i | s | i | t | e | d |   | = |   | f | a | l | s | e | ; | 
 |   |   | t | r | y |   | { |   | v | i | s | i | t | e | d |   | = |   | s | e | s | s | i | o | n | S | t | o | r | a | g | e | . | g | e | t | I | t | e | m | ( | " | l | a | t | t | e | _ | v | i | s | i | t | e | d | " | ) | ; |   | } |   | c | a | t | c | h | ( | e | ) |   | { | } | 
 |   |   | 
 |   |   | i | f |   | ( | v | i | s | i | t | e | d | ) |   | { | 
 |   |   |   |   | i | n | t | r | o | L | a | y | e | r | . | s | t | y | l | e | . | d | i | s | p | l | a | y |   | = |   | " | n | o | n | e | " | ; | 
 |   |   |   |   | m | a | i | n | C | o | n | t | e | n | t | . | c | l | a | s | s | L | i | s | t | . | r | e | m | o | v | e | ( | " | i | n | t | r | o | - | a | c | t | i | v | e | " | ) | ; | 
 |   |   |   |   | r | e | t | u | r | n | ; | 
 |   |   | } | 
 |   |   | 
 |   |   | m | a | i | n | C | o | n | t | e | n | t | . | c | l | a | s | s | L | i | s | t | . | a | d | d | ( | " | i | n | t | r | o | - | a | c | t | i | v | e | " | ) | ; | 
 |   |   | d | o | c | u | m | e | n | t | . | b | o | d | y | . | s | t | y | l | e | . | o | v | e | r | f | l | o | w |   | = |   | " | h | i | d | d | e | n | " | ; | 
 |   |   | d | o | c | u | m | e | n | t | . | d | o | c | u | m | e | n | t | E | l | e | m | e | n | t | . | s | t | y | l | e | . | o | v | e | r | f | l | o | w |   | = |   | " | h | i | d | d | e | n | " | ; | 
 |   |   | 
 |   |   | i | n | i | t | I | n | t | r | o | T | e | x | t | ( | ) | ; | 
 |   |   | b | i | n | d | I | n | t | r | o | E | v | e | n | t | s | ( | ) | ; | 
 | } | 
 | 
 | i | f |   | ( | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | " | i | n | t | r | o | - | l | a | y | e | r | " | ) | ) |   | { | 
 |   |   | i | n | i | t | I | n | t | r | o | ( | ) | ; | 
 | } | 
 | 
 | / | / |   | S | h | a | r | e | d |   | J | S |   | f | o | r |   | L | a | t | t | e | ' | s |   | s | i | t | e |  | 
 |  | 
 | a | s | y | n | c |   | f | u | n | c | t | i | o | n |   | l | o | a | d | J | S | O | N | ( | p | a | t | h | ) |   | { |  | 
 |   |   | c | o | n | s | t |   | r | e | s |   | = |   | a | w | a | i | t |   | f | e | t | c | h | ( | p | a | t | h |   | + |   | ' | ? | v | = | ' |   | + |   | D | a | t | e | . | n | o | w | ( | ) | ) | ; |  | 
 |   |   | r | e | t | u | r | n |   | r | e | s | . | j | s | o | n | ( | ) | ; |  | 
 | } |  | 
 |  | 
 | c | o | n | s | t |   | I | C | O | N | S |   | = |   | { |  | 
 |   |   | c | a | m | e | r | a | : |   | ' | < | s | v | g |   | v | i | e | w | B | o | x | = | " | 0 |   | 0 |   | 4 | 8 |   | 4 | 8 | " |   | f | i | l | l | = | " | n | o | n | e | " | > | < | c | i | r | c | l | e |   | c | x | = | " | 2 | 4 | " |   | c | y | = | " | 2 | 6 | " |   | r | = | " | 8 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 8 | " |   | f | i | l | l | = | " | n | o | n | e | " | / | > | < | c | i | r | c | l | e |   | c | x | = | " | 2 | 4 | " |   | c | y | = | " | 2 | 6 | " |   | r | = | " | 4 | . | 5 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | f | i | l | l | = | " | n | o | n | e | " | / | > | < | r | e | c | t |   | x | = | " | 6 | " |   | y | = | " | 1 | 4 | " |   | w | i | d | t | h | = | " | 3 | 6 | " |   | h | e | i | g | h | t | = | " | 2 | 4 | " |   | r | x | = | " | 4 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 8 | " |   | f | i | l | l | = | " | n | o | n | e | " | / | > | < | r | e | c | t |   | x | = | " | 1 | 4 | " |   | y | = | " | 1 | 0 | " |   | w | i | d | t | h | = | " | 8 | " |   | h | e | i | g | h | t | = | " | 6 | " |   | r | x | = | " | 2 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | f | i | l | l | = | " | n | o | n | e | " | / | > | < | c | i | r | c | l | e |   | c | x | = | " | 3 | 2 | " |   | c | y | = | " | 1 | 9 | " |   | r | = | " | 1 | " |   | f | i | l | l | = | " | # | 7 | a | b | 0 | d | 4 | " | / | > | < | / | s | v | g | > | ' | , |  | 
 |   |   | b | o | o | k | : |   | ' | < | s | v | g |   | v | i | e | w | B | o | x | = | " | 0 |   | 0 |   | 4 | 8 |   | 4 | 8 | " |   | f | i | l | l | = | " | n | o | n | e | " | > | < | p | a | t | h |   | d | = | " | M | 1 | 2 |   | 3 | 6 | V | 1 | 2 | l | 1 | 2 | - | 2 | v | 2 | 6 | l | - | 1 | 2 |   | 2 | z | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 8 | " |   | f | i | l | l | = | " | n | o | n | e | " |   | s | t | r | o | k | e | - | l | i | n | e | j | o | i | n | = | " | r | o | u | n | d | " | / | > | < | p | a | t | h |   | d | = | " | M | 3 | 6 |   | 3 | 6 | V | 1 | 2 | L | 2 | 4 |   | 1 | 0 | v | 2 | 6 | l | 1 | 2 | - | 2 | z | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 8 | " |   | f | i | l | l | = | " | n | o | n | e | " |   | s | t | r | o | k | e | - | l | i | n | e | j | o | i | n | = | " | r | o | u | n | d | " | / | > | < | l | i | n | e |   | x | 1 | = | " | 1 | 2 | " |   | y | 1 | = | " | 3 | 6 | " |   | x | 2 | = | " | 3 | 6 | " |   | y | 2 | = | " | 3 | 6 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 8 | " | / | > | < | / | s | v | g | > | ' | , |  | 
 |   |   | s | p | a | r | k | l | e | : |   | ' | < | s | v | g |   | v | i | e | w | B | o | x | = | " | 0 |   | 0 |   | 4 | 8 |   | 4 | 8 | " |   | f | i | l | l | = | " | n | o | n | e | " | > | < | c | i | r | c | l | e |   | c | x | = | " | 2 | 4 | " |   | c | y | = | " | 2 | 4 | " |   | r | = | " | 2 | " |   | f | i | l | l | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " | / | > | < | l | i | n | e |   | x | 1 | = | " | 2 | 4 | " |   | y | 1 | = | " | 8 | " |   | x | 2 | = | " | 2 | 4 | " |   | y | 2 | = | " | 1 | 5 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | s | t | r | o | k | e | - | l | i | n | e | c | a | p | = | " | r | o | u | n | d | " | / | > | < | l | i | n | e |   | x | 1 | = | " | 2 | 4 | " |   | y | 1 | = | " | 3 | 3 | " |   | x | 2 | = | " | 2 | 4 | " |   | y | 2 | = | " | 4 | 0 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | s | t | r | o | k | e | - | l | i | n | e | c | a | p | = | " | r | o | u | n | d | " | / | > | < | l | i | n | e |   | x | 1 | = | " | 8 | " |   | y | 1 | = | " | 2 | 4 | " |   | x | 2 | = | " | 1 | 5 | " |   | y | 2 | = | " | 2 | 4 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | s | t | r | o | k | e | - | l | i | n | e | c | a | p | = | " | r | o | u | n | d | " | / | > | < | l | i | n | e |   | x | 1 | = | " | 3 | 3 | " |   | y | 1 | = | " | 2 | 4 | " |   | x | 2 | = | " | 4 | 0 | " |   | y | 2 | = | " | 2 | 4 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | s | t | r | o | k | e | - | l | i | n | e | c | a | p | = | " | r | o | u | n | d | " | / | > | < | l | i | n | e |   | x | 1 | = | " | 1 | 2 | . | 3 | " |   | y | 1 | = | " | 1 | 2 | . | 3 | " |   | x | 2 | = | " | 1 | 7 | . | 3 | " |   | y | 2 | = | " | 1 | 7 | . | 3 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | s | t | r | o | k | e | - | l | i | n | e | c | a | p | = | " | r | o | u | n | d | " | / | > | < | l | i | n | e |   | x | 1 | = | " | 3 | 0 | . | 7 | " |   | y | 1 | = | " | 3 | 0 | . | 7 | " |   | x | 2 | = | " | 3 | 5 | . | 7 | " |   | y | 2 | = | " | 3 | 5 | . | 7 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | s | t | r | o | k | e | - | l | i | n | e | c | a | p | = | " | r | o | u | n | d | " | / | > | < | l | i | n | e |   | x | 1 | = | " | 3 | 5 | . | 7 | " |   | y | 1 | = | " | 1 | 2 | . | 3 | " |   | x | 2 | = | " | 3 | 0 | . | 7 | " |   | y | 2 | = | " | 1 | 7 | . | 3 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | s | t | r | o | k | e | - | l | i | n | e | c | a | p | = | " | r | o | u | n | d | " | / | > | < | l | i | n | e |   | x | 1 | = | " | 1 | 7 | . | 3 | " |   | y | 1 | = | " | 3 | 0 | . | 7 | " |   | x | 2 | = | " | 1 | 2 | . | 3 | " |   | y | 2 | = | " | 3 | 5 | . | 7 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | s | t | r | o | k | e | - | l | i | n | e | c | a | p | = | " | r | o | u | n | d | " | / | > | < | / | s | v | g | > | ' | , |  | 
 |   |   | m | o | u | n | t | a | i | n | : |   | ' | < | s | v | g |   | v | i | e | w | B | o | x | = | " | 0 |   | 0 |   | 4 | 8 |   | 4 | 8 | " |   | f | i | l | l | = | " | n | o | n | e | " | > | < | p | a | t | h |   | d | = | " | M | 4 |   | 3 | 8 |   | L | 1 | 6 |   | 1 | 8 |   | L | 2 | 4 |   | 2 | 6 |   | L | 3 | 2 |   | 1 | 2 |   | L | 4 | 4 |   | 3 | 8 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 8 | " |   | f | i | l | l | = | " | n | o | n | e | " |   | s | t | r | o | k | e | - | l | i | n | e | j | o | i | n | = | " | r | o | u | n | d | " | / | > | < | l | i | n | e |   | x | 1 | = | " | 4 | " |   | y | 1 | = | " | 3 | 8 | " |   | x | 2 | = | " | 4 | 4 | " |   | y | 2 | = | " | 3 | 8 | " |   | s | t | r | o | k | e | = | " | # | a | 0 | c | 8 | e | 0 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | " |   | s | t | r | o | k | e | - | d | a | s | h | a | r | r | a | y | = | " | 3 |   | 3 | " | / | > | < | c | i | r | c | l | e |   | c | x | = | " | 3 | 2 | " |   | c | y | = | " | 1 | 2 | " |   | r | = | " | 2 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 2 | " |   | f | i | l | l | = | " | n | o | n | e | " | / | > | < | / | s | v | g | > | ' |  | 
 | } | ; |  | 
 |  | 
 | / | / |   |  | € |  | € |   | R | e | n | d | e | r |   | H | o | m | e | p | a | g | e |   |  | € |  | € |  | 
 | a | s | y | n | c |   | f | u | n | c | t | i | o | n |   | r | e | n | d | e | r | H | o | m | e | ( | ) |   | { |  | 
 |   |   | t | r | y |   | { |  | 
 |   |   | c | o | n | s | t |   | d | a | t | a |   | = |   | a | w | a | i | t |   | l | o | a | d | J | S | O | N | ( | ' | d | a | t | a | / | s | i | t | e | . | j | s | o | n | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | d | a | t | a | ) |   | r | e | t | u | r | n | ; |  | 
 |  | 
 |   |   | c | o | n | s | t |   | h | e | r | o |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | h | e | r | o |   | . | c | o | n | t | a | i | n | e | r | ' | ) | ; |  | 
 |   |   | i | f |   | ( | h | e | r | o | ) |   | h | e | r | o | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | h | e | r | o | - | g | e | o |   | c | i | r | c | l | e | " | > | < | / | d | i | v | > | < | d | i | v |   | c | l | a | s | s | = | " | h | e | r | o | - | g | e | o |   | t | r | i | a | n | g | l | e | " | > | < | / | d | i | v | > | < | d | i | v |   | c | l | a | s | s | = | " | h | e | r | o | - | g | e | o |   | d | i | a | m | o | n | d | " | > | < | / | d | i | v | > | < | d | i | v |   | c | l | a | s | s | = | " | h | e | r | o | - | g | e | o |   | d | o | t | - | r | i | n | g | " | > | < | / | d | i | v | > | < | h | 1 | > | 浣 | 犲 | ソ | 锛 | 屾 | 垜 | 鏄 | ? | ' |   | + |   | d | a | t | a | . | n | a | m | e |   | + |   | ' | < | / | h | 1 | > | < | p |   | c | l | a | s | s | = | " | t | a | g | l | i | n | e | " | > | ' |   | + |   | d | a | t | a | . | t | a | g | l | i | n | e |   | + |   | ' | < | / | p | > | ' | ; |  | 
 |  | 
 |   |   | c | o | n | s | t |   | a | b | o | u | t |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | a | b | o | u | t |   | . | c | o | n | t | a | i | n | e | r | ' | ) | ; |  | 
 |   |   | i | f |   | ( | a | b | o | u | t | ) |   | a | b | o | u | t | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | g | e | o | - | a | c | c | e | n | t | " | > | < | / | d | i | v | > | < | d | i | v |   | c | l | a | s | s | = | " | s | e | c | t | i | o | n | - | l | a | b | e | l | " | > | 鍏 | 充 | 簬 | < | / | d | i | v | > | < | p | > | ' |   | + |   | d | a | t | a | . | a | b | o | u | t |   | + |   | ' | < | / | p | > | < | d | i | v |   | c | l | a | s | s | = | " | d | o | t | - | d | i | v | i | d | e | r | " | > | < | s | p | a | n | > | < | / | s | p | a | n | > | < | s | p | a | n | > | < | / | s | p | a | n | > | < | s | p | a | n | > | < | / | s | p | a | n | > | < | / | d | i | v | > | ' | ; |  | 
 |  | 
 |   |   | c | o | n | s | t |   | c | u | r | r | e | n | t | l | y | E | l |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | c | u | r | r | e | n | t | l | y |   | . | c | o | n | t | a | i | n | e | r | ' | ) | ; |  | 
 |   |   | i | f |   | ( | c | u | r | r | e | n | t | l | y | E | l |   | & | & |   | d | a | t | a | . | c | u | r | r | e | n | t | l | y | ) |   | { |  | 
 |   |   |   |   | v | a | r |   | c |   | = |   | d | a | t | a | . | c | u | r | r | e | n | t | l | y | ; |  | 
 |   |   |   |   | c | u | r | r | e | n | t | l | y | E | l | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | s | e | c | t | i | o | n | - | l | a | b | e | l | " | > | 褰 | 撲 | 笅 | < | / | d | i | v | > | < | d | i | v |   | c | l | a | s | s | = | " | c | u | r | r | e | n | t | l | y | - | g | r | i | d | " | > | ' |   | + |  | 
 |   |   |   |   |   |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | c | u | r | r | e | n | t | l | y | - | i | t | e | m | " | > | < | s | p | a | n |   | c | l | a | s | s | = | " | c | u | r | r | e | n | t | l | y | - | k | e | y | " | > | 鍦 | ㄨ |  | < | / | s | p | a | n | > | < | s | p | a | n | > | ' |   | + |   | ( | c | . | r | e | a | d | i | n | g |   | | | | |   | ' | ' | ) |   | + |   | ' | < | / | s | p | a | n | > | < | / | d | i | v | > | ' |   | + |  | 
 |   |   |   |   |   |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | c | u | r | r | e | n | t | l | y | - | i | t | e | m | " | > | < | s | p | a | n |   | c | l | a | s | s | = | " | c | u | r | r | e | n | t | l | y | - | k | e | y | " | > | 鍦 | ㄥ | 惉 | < | / | s | p | a | n | > | < | s | p | a | n | > | ' |   | + |   | ( | c | . | l | i | s | t | e | n | i | n | g |   | | | | |   | ' | ' | ) |   | + |   | ' | < | / | s | p | a | n | > | < | / | d | i | v | > | ' |   | + |  | 
 |   |   |   |   |   |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | c | u | r | r | e | n | t | l | y | - | i | t | e | m | " | > | < | s | p | a | n |   | c | l | a | s | s | = | " | c | u | r | r | e | n | t | l | y | - | k | e | y | " | > | 鍦 | ㄥ |  | < | / | s | p | a | n | > | < | s | p | a | n | > | ' |   | + |   | ( | c | . | l | e | a | r | n | i | n | g |   | | | | |   | ' | ' | ) |   | + |   | ' | < | / | s | p | a | n | > | < | / | d | i | v | > | ' |   | + |  | 
 |   |   |   |   |   |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | c | u | r | r | e | n | t | l | y | - | i | t | e | m | " | > | < | s | p | a | n |   | c | l | a | s | s | = | " | c | u | r | r | e | n | t | l | y | - | k | e | y | " | > | 鍦 | ㄥ | 仛 | < | / | s | p | a | n | > | < | s | p | a | n | > | ' |   | + |   | ( | c | . | w | o | r | k | i | n | g | O | n |   | | | | |   | ' | ' | ) |   | + |   | ' | < | / | s | p | a | n | > | < | / | d | i | v | > | ' |   | + |  | 
 |   |   |   |   |   |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |  | 
 |  | 
 |   |   | c | o | n | s | t |   | g | r | i | d |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | i | n | t | e | r | e | s | t | - | g | r | i | d | ' | ) | ; |  | 
 |   |   | i | f |   | ( | g | r | i | d | ) |   | { |  | 
 |   |   |   |   | g | r | i | d | . | i | n | n | e | r | H | T | M | L |   | = |   | d | a | t | a | . | i | n | t | e | r | e | s | t | s | . | m | a | p | ( | i |   | = | > |  | 
 |   |   |   |   |   |   | ' | < | a |   | c | l | a | s | s | = | " | i | n | t | e | r | e | s | t | - | c | a | r | d | " |   | h | r | e | f | = | " | ' |   | + |   | i | . | p | a | g | e |   | + |   | ' | " | > | < | d | i | v |   | c | l | a | s | s | = | " | i | c | o | n | " | > | ' |   | + |   | ( | I | C | O | N | S | [ | i | . | i | c | o | n | ] |   | | | | |   | ' | ' | ) |   | + |   | ' | < | / | d | i | v | > | < | s | p | a | n |   | c | l | a | s | s | = | " | l | a | b | e | l | " | > | ' |   | + |   | i | . | n | a | m | e |   | + |   | ' | < | / | s | p | a | n | > | < | s | p | a | n |   | c | l | a | s | s | = | " | c | a | r | d | - | a | r | r | o | w | " | > | 鎺 | ㈢ | 储 |   | & | r | a | r | r | ; | < | / | s | p | a | n | > | < | / | a | > | ' |  | 
 |   |   |   |   | ) | . | j | o | i | n | ( | ' | ' | ) | ; |  | 
 |   |   | } |  | 
 |  | 
 |   |   | c | o | n | s | t |   | b | o | o | k | L | i | s | t |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | b | o | o | k | - | l | i | s | t | ' | ) | ; |  | 
 |   |   | i | f |   | ( | b | o | o | k | L | i | s | t |   | & | & |   | d | a | t | a | . | b | o | o | k | s | ) |   | { |  | 
 |   |   |   |   | b | o | o | k | L | i | s | t | . | i | n | n | e | r | H | T | M | L |   | = |   | d | a | t | a | . | b | o | o | k | s | . | m | a | p | ( | b |   | = | > |  | 
 |   |   |   |   |   |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | i | t | e | m | " | > | < | i | m | g |   | c | l | a | s | s | = | " | b | o | o | k | - | c | o | v | e | r | " |   | s | r | c | = | " | ' |   | + |   | b | . | c | o | v | e | r |   | + |   | ' | " |   | a | l | t | = | " | ' |   | + |   | b | . | t | i | t | l | e |   | + |   | ' | " | > | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | i | n | f | o | " | > | ' |   | + |   | b | . | t | i | t | l | e |   | + |   | ' | < | s | p | a | n |   | c | l | a | s | s | = | " | a | u | t | h | o | r | " | > | ' |   | + |   | b | . | a | u | t | h | o | r |   | + |   | ' | < | / | s | p | a | n | > | < | / | d | i | v | > | < | / | d | i | v | > | ' |  | 
 |   |   |   |   | ) | . | j | o | i | n | ( | ' | ' | ) | ; |  | 
 |   |   | } |  | 
 |  | 
 |   |   | c | o | n | s | t |   | c | o | n | t | a | c | t | L | i | n | k | s |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | c | o | n | t | a | c | t | - | l | i | n | k | s | ' | ) | ; |  | 
 |   |   | i | f |   | ( | c | o | n | t | a | c | t | L | i | n | k | s | ) |   | c | o | n | t | a | c | t | L | i | n | k | s | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | a |   | h | r | e | f | = | " | m | a | i | l | t | o | : | ' |   | + |   | d | a | t | a | . | c | o | n | t | a | c | t | . | e | m | a | i | l |   | + |   | ' | " | > | ' |   | + |   | d | a | t | a | . | c | o | n | t | a | c | t | . | e | m | a | i | l |   | + |   | ' | < | / | a | > | ' | ; |  | 
 |  | 
 |   |   |   |   | r | e | n | d | e | r | H | o | m | e | B | l | o | g | ( | ) | ; |  | 
 |   |   |   |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | A | l | l | ( | ' | . | f | a | d | e | - | i | n | ' | ) | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | e | l | ) |   | { |   | e | l | . | c | l | a | s | s | L | i | s | t | . | a | d | d | ( | ' | v | i | s | i | b | l | e | ' | ) | ; |   | } | ) | ; |  | 
 |   |   | } |   | c | a | t | c | h | ( | e | ) |   | { |  | 
 |   |   |   |   | c | o | n | s | o | l | e | . | e | r | r | o | r | ( | ' | r | e | n | d | e | r | H | o | m | e |   | e | r | r | o | r | : | ' | , |   | e | ) | ; |  | 
 |   |   |   |   | r | e | n | d | e | r | H | o | m | e | B | l | o | g | ( | ) | ; |  | 
 |   |   |   |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | A | l | l | ( | ' | . | f | a | d | e | - | i | n | ' | ) | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | e | l | ) |   | { |   | e | l | . | c | l | a | s | s | L | i | s | t | . | a | d | d | ( | ' | v | i | s | i | b | l | e | ' | ) | ; |   | } | ) | ; |  | 
 |   |   | } |  | 
 | } |  | 
 |  | 
 | / | / |   |  | € |  | € |   | R | e | n | d | e | r |   | b | l | o | g |   | p | r | e | v | i | e | w |   | o | n |   | h | o | m | e | p | a | g | e |   |  | € |  | € |  | 
 | a | s | y | n | c |   | f | u | n | c | t | i | o | n |   | r | e | n | d | e | r | H | o | m | e | B | l | o | g | ( | ) |   | { |  | 
 |   |   | c | o | n | s | t |   | l | i | s | t |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | ' | h | o | m | e | B | l | o | g | L | i | s | t | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | l | i | s | t | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | t | r | y |   | { |  | 
 |   |   |   |   | c | o | n | s | t |   | r | e | s |   | = |   | a | w | a | i | t |   | f | e | t | c | h | ( | ' | d | a | t | a | / | b | l | o | g | . | j | s | o | n | ? | v | = | ' |   | + |   | D | a | t | e | . | n | o | w | ( | ) | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | ! | r | e | s | . | o | k | ) |   | t | h | r | o | w |   | n | e | w |   | E | r | r | o | r | ( | ' | f | e | t | c | h |   | f | a | i | l | e | d | ' | ) | ; |  | 
 |   |   |   |   | c | o | n | s | t |   | d | a | t | a |   | = |   | a | w | a | i | t |   | r | e | s | . | j | s | o | n | ( | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | ! | d | a | t | a | . | p | o | s | t | s |   | | | | |   | ! | d | a | t | a | . | p | o | s | t | s | . | l | e | n | g | t | h | ) |   | { |   | l | i | s | t | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | l | o | g | - | e | m | p | t | y | " | > | 杩 | 樻 | 病 | 鏈 | 夊 | 崥 | 瀹 | ㈡ | 枃 | 绔 | ? | / | d | i | v | > | ' | ; |   | r | e | t | u | r | n | ; |   | } |  | 
 |   |   |   |   | l | i | s | t | . | i | n | n | e | r | H | T | M | L |   | = |   | d | a | t | a | . | p | o | s | t | s | . | s | l | i | c | e | ( | - | 3 | ) | . | r | e | v | e | r | s | e | ( | ) | . | m | a | p | ( | p |   | = | > |  | 
 |   |   |   |   |   |   | ' | < | a |   | c | l | a | s | s | = | " | b | l | o | g | - | c | a | r | d | " |   | h | r | e | f | = | " | b | l | o | g | / | p | o | s | t | s | / | ' |   | + |   | p | . | f | i | l | e |   | + |   | ' | " | > | < | d | i | v |   | c | l | a | s | s | = | " | d | a | t | e | " | > | ' |   | + |   | p | . | d | a | t | e |   | + |   | ' | < | / | d | i | v | > | < | h | 3 | > | ' |   | + |   | p | . | t | i | t | l | e |   | + |   | ' | < | / | h | 3 | > | < | d | i | v |   | c | l | a | s | s | = | " | s | u | m | m | a | r | y | " | > | ' |   | + |   | p | . | s | u | m | m | a | r | y |   | + |   | ' | < | / | d | i | v | > | < | / | a | > | ' |  | 
 |   |   |   |   | ) | . | j | o | i | n | ( | ' | ' | ) | ; |  | 
 |   |   | } |   | c | a | t | c | h | ( | e | ) |   | { |   | l | i | s | t | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | l | o | g | - | e | m | p | t | y | " | > | 杩 | 樻 | 病 | 鏈 | 夊 | 崥 | 瀹 | ㈡ | 枃 | 绔 | ? | / | d | i | v | > | ' | ; |   | } |  | 
 | } |  | 
 |  | 
 | / | / |   |  | € |  | € |   | R | e | n | d | e | r |   | B | l | o | g |   | L | i | s | t | i | n | g |   |  | € |  | € |  | 
 | a | s | y | n | c |   | f | u | n | c | t | i | o | n |   | r | e | n | d | e | r | B | l | o | g | ( | ) |   | { |  | 
 |   |   | c | o | n | s | t |   | d | a | t | a |   | = |   | a | w | a | i | t |   | l | o | a | d | J | S | O | N | ( | ' | . | . | / | d | a | t | a | / | b | l | o | g | . | j | s | o | n | ' | ) | ; |  | 
 |   |   | c | o | n | s | t |   | l | i | s | t |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | b | l | o | g | - | l | i | s | t | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | l | i | s | t | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | i | f |   | ( | ! | d | a | t | a | . | p | o | s | t | s |   | | | | |   | d | a | t | a | . | p | o | s | t | s | . | l | e | n | g | t | h |   | = | = | = |   | 0 | ) |   | { |  | 
 |   |   |   |   | l | i | s | t | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | l | o | g | - | e | m | p | t | y | " | > | 杩 | 樻 | 病 | 鏈 | 夊 | 崥 | 瀹 | ㈡ | 枃 | 绔 | ? | / | d | i | v | > | ' | ; |   | r | e | t | u | r | n | ; |  | 
 |   |   | } |  | 
 |   |   | l | i | s | t | . | i | n | n | e | r | H | T | M | L |   | = |   | [ | . | . | . | d | a | t | a | . | p | o | s | t | s | ] | . | r | e | v | e | r | s | e | ( | ) | . | m | a | p | ( | p |   | = | > |  | 
 |   |   |   |   | ' | < | a |   | c | l | a | s | s | = | " | b | l | o | g | - | c | a | r | d | " |   | h | r | e | f | = | " | p | o | s | t | s | / | ' |   | + |   | p | . | f | i | l | e |   | + |   | ' | " | > | < | d | i | v |   | c | l | a | s | s | = | " | d | a | t | e | " | > | ' |   | + |   | p | . | d | a | t | e |   | + |   | ' | < | / | d | i | v | > | < | h | 3 | > | ' |   | + |   | p | . | t | i | t | l | e |   | + |   | ' | < | / | h | 3 | > | < | d | i | v |   | c | l | a | s | s | = | " | s | u | m | m | a | r | y | " | > | ' |   | + |   | p | . | s | u | m | m | a | r | y |   | + |   | ' | < | / | d | i | v | > | < | / | a | > | ' |  | 
 |   |   | ) | . | j | o | i | n | ( | ' | ' | ) | ; |  | 
 | } |  | 
 |  | 
 | / | / |   |  | € |  | € |   | R | e | n | d | e | r |   | I | n | t | e | r | e | s | t |   | S | u | b | - | p | a | g | e |   |  | € |  | € |  | 
 | a | s | y | n | c |   | f | u | n | c | t | i | o | n |   | r | e | n | d | e | r | I | n | t | e | r | e | s | t | P | a | g | e | ( | ) |   | { |  | 
 |   |   | c | o | n | s | t |   | d | a | t | a |   | = |   | a | w | a | i | t |   | l | o | a | d | J | S | O | N | ( | ' | . | . | / | d | a | t | a | / | s | i | t | e | . | j | s | o | n | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | d | a | t | a | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | c | o | n | s | t |   | p | a | g | e | N | a | m | e |   | = |   | w | i | n | d | o | w | . | l | o | c | a | t | i | o | n | . | p | a | t | h | n | a | m | e | . | s | p | l | i | t | ( | ' | / | ' | ) | . | p | o | p | ( | ) | . | r | e | p | l | a | c | e | ( | ' | . | h | t | m | l | ' | , |   | ' | ' | ) | ; |  | 
 |   |   | c | o | n | s | t |   | p | a | g | e | M | a | p |   | = |   | { |   | ' | p | h | o | t | o | g | r | a | p | h | y | ' | : |   | ' | c | a | m | e | r | a | ' | , |   | ' | b | o | o | k | s | ' | : |   | ' | b | o | o | k | ' | , |   | ' | h | o | b | b | i | e | s | ' | : |   | ' | s | p | a | r | k | l | e | ' | , |   | ' | h | i | k | i | n | g | ' | : |   | ' | m | o | u | n | t | a | i | n | ' |   | } | ; |  | 
 |   |   | c | o | n | s | t |   | i | c | o | n | K | e | y |   | = |   | p | a | g | e | M | a | p | [ | p | a | g | e | N | a | m | e | ] | ; |  | 
 |   |   | l | e | t |   | i | n | t | e | r | e | s | t |   | = |   | n | u | l | l | ; |  | 
 |   |   | f | o | r |   | ( | c | o | n | s | t |   | i |   | o | f |   | d | a | t | a | . | i | n | t | e | r | e | s | t | s | ) |   | { |  | 
 |   |   |   |   | i | f |   | ( | i | . | i | c | o | n |   | = | = | = |   | i | c | o | n | K | e | y |   | | | | |   | i | . | p | a | g | e | . | i | n | c | l | u | d | e | s | ( | p | a | g | e | N | a | m | e | ) | ) |   | { |   | i | n | t | e | r | e | s | t |   | = |   | i | ; |   | b | r | e | a | k | ; |   | } |  | 
 |   |   | } |  | 
 |   |   | i | f |   | ( | ! | i | n | t | e | r | e | s | t | ) |   | r | e | t | u | r | n | ; |  | 
 |  | 
 |   |   | c | o | n | s | t |   | h | e | a | d | e | r |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | i | n | t | e | r | e | s | t | - | p | a | g | e |   | . | c | o | n | t | a | i | n | e | r | ' | ) | ; |  | 
 |   |   | i | f |   | ( | h | e | a | d | e | r | ) |   | { |  | 
 |   |   |   |   | h | e | a | d | e | r | . | i | n | n | e | r | H | T | M | L |   | = |  | 
 |   |   |   |   |   |   | ' | < | a |   | c | l | a | s | s | = | " | b | a | c | k | - | l | i | n | k | " |   | h | r | e | f | = | " | . | . | / | i | n | d | e | x | . | h | t | m | l | " | > | < | s | v | g |   | w | i | d | t | h | = | " | 1 | 6 | " |   | h | e | i | g | h | t | = | " | 1 | 6 | " |   | v | i | e | w | B | o | x | = | " | 0 |   | 0 |   | 1 | 6 |   | 1 | 6 | " |   | f | i | l | l | = | " | n | o | n | e | " | > | < | p | a | t | h |   | d | = | " | M | 1 | 0 |   | 3 | L | 5 |   | 8 | l | 5 |   | 5 | " |   | s | t | r | o | k | e | = | " | # | 2 | 4 | 7 | 1 | a | 3 | " |   | s | t | r | o | k | e | - | w | i | d | t | h | = | " | 1 | . | 5 | " |   | s | t | r | o | k | e | - | l | i | n | e | c | a | p | = | " | r | o | u | n | d | " | / | > | < | / | s | v | g | > | 杩 | 斿 | 洖 | 棣 | 栭 | 〉 | < | / | a | > | ' |   | + |  | 
 |   |   |   |   |   |   | ' | < | h | 1 | > | ' |   | + |   | i | n | t | e | r | e | s | t | . | n | a | m | e |   | + |   | ' | < | / | h | 1 | > | ' |   | + |  | 
 |   |   |   |   |   |   | ' | < | p |   | c | l | a | s | s | = | " | s | u | b | - | d | e | s | c | " | > | ' |   | + |   | ( | i | n | t | e | r | e | s | t | . | d | e | s | c | r | i | p | t | i | o | n |   | | | | |   | ' | ' | ) |   | + |   | ' | < | / | p | > | ' | ; |  | 
 |   |   | } |  | 
 |  | 
 |   |   | c | o | n | s | t |   | c | o | n | t | e | n | t |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | i | n | t | e | r | e | s | t | - | c | o | n | t | e | n | t | - | a | r | e | a | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | c | o | n | t | e | n | t | ) |   | r | e | t | u | r | n | ; |  | 
 |  | 
 |   |   | i | f |   | ( | p | a | g | e | N | a | m | e |   | = | = | = |   | ' | p | h | o | t | o | g | r | a | p | h | y | ' | ) |   | r | e | n | d | e | r | P | h | o | t | o | g | r | a | p | h | y | P | a | g | e | ( | i | n | t | e | r | e | s | t | ) | ; |  | 
 |   |   | e | l | s | e |   | i | f |   | ( | p | a | g | e | N | a | m | e |   | = | = | = |   | ' | b | o | o | k | s | ' | ) |   | r | e | n | d | e | r | B | o | o | k | s | P | a | g | e | ( | i | n | t | e | r | e | s | t | ) | ; |  | 
 |   |   | e | l | s | e |   | i | f |   | ( | p | a | g | e | N | a | m | e |   | = | = | = |   | ' | h | o | b | b | i | e | s | ' | ) |   | r | e | n | d | e | r | H | o | b | b | i | e | s | P | a | g | e | ( | i | n | t | e | r | e | s | t | ) | ; |  | 
 |   |   | e | l | s | e |   | i | f |   | ( | p | a | g | e | N | a | m | e |   | = | = | = |   | ' | h | i | k | i | n | g | ' | ) |   | r | e | n | d | e | r | H | i | k | i | n | g | P | a | g | e | ( | i | n | t | e | r | e | s | t | ) | ; |  | 
 | } |  | 
 |  | 
 | / | / |   |  | € |  | € |   | P | h | o | t | o | g | r | a | p | h | y |   | P | a | g | e |   |  | € |  | € |  | 
 | f | u | n | c | t | i | o | n |   | r | e | n | d | e | r | P | h | o | t | o | g | r | a | p | h | y | P | a | g | e | ( | i | n | t | e | r | e | s | t | ) |   | { |  | 
 |   |   | c | o | n | s | t |   | c | o | n | t | e | n | t |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | i | n | t | e | r | e | s | t | - | c | o | n | t | e | n | t | - | a | r | e | a | ' | ) | ; |  | 
 |   |   | c | o | n | s | t |   | a | l | b | u | m | s |   | = |   | i | n | t | e | r | e | s | t | . | a | l | b | u | m | s |   | | | | |   | [ | ] | ; |  | 
 |  | 
 |   |   | i | f |   | ( | a | l | b | u | m | s | . | l | e | n | g | t | h |   | = | = | = |   | 0 | ) |   | { |  | 
 |   |   |   |   | c | o | n | t | e | n | t | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | a | l | b | u | m | - | e | m | p | t | y | " | > | 杩 | 樻 | 病 | 鏈 | 夊 | 垱 | 寤 | 哄 | 浘 | 闆 | ? | / | d | i | v | > | ' | ; |  | 
 |   |   |   |   | r | e | t | u | r | n | ; |  | 
 |   |   | } |  | 
 |  | 
 |   |   | v | a | r |   | a | l | b | u | m | I | d | x |   | = |   | 0 | ; |  | 
 |   |   | v | a | r |   | h | a | s | h |   | = |   | w | i | n | d | o | w | . | l | o | c | a | t | i | o | n | . | h | a | s | h | . | r | e | p | l | a | c | e | ( | ' | # | a | l | b | u | m | ' | , |   | ' | ' | ) | ; |  | 
 |   |   | i | f |   | ( | h | a | s | h | ) |   | { |   | v | a | r |   | i |   | = |   | p | a | r | s | e | I | n | t | ( | h | a | s | h | ) | ; |   | i | f |   | ( | i |   | > | = |   | 0 |   | & | & |   | i |   | < |   | a | l | b | u | m | s | . | l | e | n | g | t | h | ) |   | a | l | b | u | m | I | d | x |   | = |   | i | ; |   | } |  | 
 |  | 
 |   |   | v | a | r |   | a | l | b | u | m |   | = |   | a | l | b | u | m | s | [ | a | l | b | u | m | I | d | x | ] | ; |  | 
 |   |   | v | a | r |   | h | t | m | l |   | = |   | ' | ' | ; |  | 
 |   |   | i | f |   | ( | a | l | b | u | m | s | . | l | e | n | g | t | h |   | > |   | 1 | ) |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | t | a | b | s | " |   | s | t | y | l | e | = | " | m | a | r | g | i | n | - | b | o | t | t | o | m | : | 1 | . | 5 | r | e | m | " | > | ' | ; |  | 
 |   |   |   |   | a | l | b | u | m | s | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | a | , |   | i | ) |   | { |  | 
 |   |   |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | b | u | t | t | o | n |   | c | l | a | s | s | = | " | ' |   | + |   | ( | i |   | = | = | = |   | a | l | b | u | m | I | d | x |   | ? |   | ' | a | c | t | i | v | e | ' |   | : |   | ' | ' | ) |   | + |   | ' | " |   | o | n | c | l | i | c | k | = | " | l | o | c | a | t | i | o | n | . | h | a | s | h | = | \ | ' | a | l | b | u | m | ' |   | + |   | i |   | + |   | ' | \ | ' | ; | l | o | c | a | t | i | o | n | . | r | e | l | o | a | d | ( | ) | " | > | ' |   | + |   | a | . | n | a | m | e |   | + |   | ' | < | / | b | u | t | t | o | n | > | ' | ; |  | 
 |   |   |   |   | } | ) | ; |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |  | 
 |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | i | n | t | e | r | e | s | t | - | g | a | l | l | e | r | y | " | > | ' | ; |  | 
 |   |   | i | f |   | ( | a | l | b | u | m | . | i | m | a | g | e | s |   | & | & |   | a | l | b | u | m | . | i | m | a | g | e | s | . | l | e | n | g | t | h | ) |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | a | l | b | u | m | . | i | m | a | g | e | s | . | m | a | p | ( | f | u | n | c | t | i | o | n | ( | i | m | g | ) |   | { |  | 
 |   |   |   |   |   |   | r | e | t | u | r | n |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | g | a | l | l | e | r | y | - | i | t | e | m | " | > | < | i | m | g |   | s | r | c | = | " | . | . | / | ' |   | + |   | i | m | g |   | + |   | ' | " |   | a | l | t | = | " | " |   | l | o | a | d | i | n | g | = | " | l | a | z | y | " | > | < | / | d | i | v | > | ' | ; |  | 
 |   |   |   |   | } | ) | . | j | o | i | n | ( | ' | ' | ) | ; |  | 
 |   |   | } |   | e | l | s | e |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | a | l | b | u | m | - | e | m | p | t | y | " | > | 鏆 | 傛 | 棤 | 鐓 | х | 墖 | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |  | 
 |   |   | i | f |   | ( | a | l | b | u | m | . | j | o | u | r | n | a | l | ) |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | a | l | b | u | m | - | j | o | u | r | n | a | l | " | > | < | h | 3 | > | 闅 | 忕 | 瑪 | < | / | h | 3 | > | < | d | i | v |   | c | l | a | s | s | = | " | j | o | u | r | n | a | l | - | c | o | n | t | e | n | t | " | > | ' |   | + |   | a | l | b | u | m | . | j | o | u | r | n | a | l |   | + |   | ' | < | / | d | i | v | > | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |  | 
 |  | 
 |   |   | c | o | n | t | e | n | t | . | i | n | n | e | r | H | T | M | L |   | = |   | h | t | m | l | ; |  | 
 | } |  | 
 |  | 
 | / | / |   |  | € |  | € |   | B | o | o | k | s |   | P | a | g | e |   |  | € |  | € |  | 
 | f | u | n | c | t | i | o | n |   | r | e | n | d | e | r | B | o | o | k | s | P | a | g | e | ( | i | n | t | e | r | e | s | t | ) |   | { |  | 
 |   |   | c | o | n | s | t |   | c | o | n | t | e | n | t |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | i | n | t | e | r | e | s | t | - | c | o | n | t | e | n | t | - | a | r | e | a | ' | ) | ; |  | 
 |   |   | v | a | r |   | r | e | a | d |   | = |   | i | n | t | e | r | e | s | t | . | r | e | a | d |   | | | | |   | [ | ] | ; |  | 
 |   |   | v | a | r |   | r | e | a | d | i | n | g |   | = |   | i | n | t | e | r | e | s | t | . | r | e | a | d | i | n | g |   | | | | |   | [ | ] | ; |  | 
 |   |   | v | a | r |   | w | a | n | t | T | o | R | e | a | d |   | = |   | i | n | t | e | r | e | s | t | . | w | a | n | t | T | o | R | e | a | d |   | | | | |   | [ | ] | ; |  | 
 |  | 
 |   |   | v | a | r |   | h | t | m | l |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | t | a | b | s | " | > | ' | ; |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | b | u | t | t | o | n |   | c | l | a | s | s | = | " | a | c | t | i | v | e | " |   | o | n | c | l | i | c | k | = | " | s | w | i | t | c | h | B | o | o | k | T | a | b | ( | \ | ' | r | e | a | d | \ | ' | ) | " | > | 宸 | 茶 |  | < | / | b | u | t | t | o | n | > | ' | ; |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | b | u | t | t | o | n |   | o | n | c | l | i | c | k | = | " | s | w | i | t | c | h | B | o | o | k | T | a | b | ( | \ | ' | r | e | a | d | i | n | g | \ | ' | ) | " | > | 姝 | ｅ | 湪 | 闃 | 呰 |  | < | / | b | u | t | t | o | n | > | ' | ; |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | b | u | t | t | o | n |   | o | n | c | l | i | c | k | = | " | s | w | i | t | c | h | B | o | o | k | T | a | b | ( | \ | ' | w | a | n | t | \ | ' | ) | " | > | 鎯 | 宠 |  | 闃 | 呰 |  | < | / | b | u | t | t | o | n | > | ' | ; |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | t | a | b | - | c | o | n | t | e | n | t |   | a | c | t | i | v | e | " |   | i | d | = | " | t | a | b | - | r | e | a | d | " | > | ' | ; |  | 
 |   |   | i | f |   | ( | r | e | a | d | . | l | e | n | g | t | h | ) |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | l | i | s | t | " | > | ' |   | + |   | r | e | a | d | . | m | a | p | ( | f | u | n | c | t | i | o | n | ( | b | ) |   | { |  | 
 |   |   |   |   |   |   | r | e | t | u | r | n |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | i | t | e | m | " | > | < | i | m | g |   | c | l | a | s | s | = | " | b | o | o | k | - | c | o | v | e | r | " |   | s | r | c | = | " | . | . | / | ' |   | + |   | b | . | c | o | v | e | r |   | + |   | ' | " |   | a | l | t | = | " | ' |   | + |   | b | . | t | i | t | l | e |   | + |   | ' | " | > | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | i | n | f | o | " | > | ' |   | + |   | b | . | t | i | t | l | e |   | + |   | ' | < | s | p | a | n |   | c | l | a | s | s | = | " | a | u | t | h | o | r | " | > | ' |   | + |   | b | . | a | u | t | h | o | r |   | + |   | ' | < | / | s | p | a | n | > | ' |   | + |  | 
 |   |   |   |   |   |   |   |   | ( | b | . | r | e | v | i | e | w |   | ? |   | ' | < | s | p | a | n |   | c | l | a | s | s | = | " | b | o | o | k | - | r | e | v | i | e | w | - | t | r | i | g | g | e | r | " | > | 鎴 | 戠 | 殑 | 鎰 | 熸 | 兂 | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | r | e | v | i | e | w | - | p | o | p | u | p | " | > | ' |   | + |   | b | . | r | e | v | i | e | w |   | + |   | ' | < | / | d | i | v | > | < | / | s | p | a | n | > | ' |   | : |   | ' | ' | ) |   | + |  | 
 |   |   |   |   |   |   |   |   | ' | < | / | d | i | v | > | < | / | d | i | v | > | ' | ; |  | 
 |   |   |   |   | } | ) | . | j | o | i | n | ( | ' | ' | ) |   | + |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |   | e | l | s | e |   | { |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | a | l | b | u | m | - | e | m | p | t | y | " | > | 杩 | 樻 | 病 | 鏈 | 夊 | 凡 | 璇 | 讳 | 功 | 绫 | ? | / | d | i | v | > | ' | ; |   | } |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | t | a | b | - | c | o | n | t | e | n | t | " |   | i | d | = | " | t | a | b | - | r | e | a | d | i | n | g | " | > | ' | ; |  | 
 |   |   | i | f |   | ( | r | e | a | d | i | n | g | . | l | e | n | g | t | h | ) |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | l | i | s | t | " | > | ' |   | + |   | r | e | a | d | i | n | g | . | m | a | p | ( | f | u | n | c | t | i | o | n | ( | b | ) |   | { |  | 
 |   |   |   |   |   |   | r | e | t | u | r | n |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | i | t | e | m | " | > | < | i | m | g |   | c | l | a | s | s | = | " | b | o | o | k | - | c | o | v | e | r | " |   | s | r | c | = | " | . | . | / | ' |   | + |   | b | . | c | o | v | e | r |   | + |   | ' | " |   | a | l | t | = | " | ' |   | + |   | b | . | t | i | t | l | e |   | + |   | ' | " | > | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | i | n | f | o | " | > | ' |   | + |   | b | . | t | i | t | l | e |   | + |   | ' | < | s | p | a | n |   | c | l | a | s | s | = | " | a | u | t | h | o | r | " | > | ' |   | + |   | b | . | a | u | t | h | o | r |   | + |   | ' | < | / | s | p | a | n | > | ' |   | + |  | 
 |   |   |   |   |   |   |   |   | ( | b | . | r | e | v | i | e | w |   | ? |   | ' | < | s | p | a | n |   | c | l | a | s | s | = | " | b | o | o | k | - | r | e | v | i | e | w | - | t | r | i | g | g | e | r | " | > | 鎴 | 戠 | 殑 | 鎰 | 熸 | 兂 | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | r | e | v | i | e | w | - | p | o | p | u | p | " | > | ' |   | + |   | b | . | r | e | v | i | e | w |   | + |   | ' | < | / | d | i | v | > | < | / | s | p | a | n | > | ' |   | : |   | ' | ' | ) |   | + |  | 
 |   |   |   |   |   |   |   |   | ' | < | / | d | i | v | > | < | / | d | i | v | > | ' | ; |  | 
 |   |   |   |   | } | ) | . | j | o | i | n | ( | ' | ' | ) |   | + |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |   | e | l | s | e |   | { |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | a | l | b | u | m | - | e | m | p | t | y | " | > | 杩 | 樻 | 病 | 鏈 | 夋 |  | 鍦 | ㄨ |  | 鐨 | 勪 | 功 | < | / | d | i | v | > | ' | ; |   | } |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | t | a | b | - | c | o | n | t | e | n | t | " |   | i | d | = | " | t | a | b | - | w | a | n | t | " | > | ' | ; |  | 
 |   |   | i | f |   | ( | w | a | n | t | T | o | R | e | a | d | . | l | e | n | g | t | h | ) |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | l | i | s | t | " | > | ' |   | + |   | w | a | n | t | T | o | R | e | a | d | . | m | a | p | ( | f | u | n | c | t | i | o | n | ( | b | ) |   | { |  | 
 |   |   |   |   |   |   | r | e | t | u | r | n |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | i | t | e | m | " | > | < | i | m | g |   | c | l | a | s | s | = | " | b | o | o | k | - | c | o | v | e | r | " |   | s | r | c | = | " | . | . | / | ' |   | + |   | b | . | c | o | v | e | r |   | + |   | ' | " |   | a | l | t | = | " | ' |   | + |   | b | . | t | i | t | l | e |   | + |   | ' | " | > | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | i | n | f | o | " | > | ' |   | + |   | b | . | t | i | t | l | e |   | + |   | ' | < | s | p | a | n |   | c | l | a | s | s | = | " | a | u | t | h | o | r | " | > | ' |   | + |   | b | . | a | u | t | h | o | r |   | + |   | ' | < | / | s | p | a | n | > | < | / | d | i | v | > | < | / | d | i | v | > | ' | ; |  | 
 |   |   |   |   | } | ) | . | j | o | i | n | ( | ' | ' | ) |   | + |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |   | e | l | s | e |   | { |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | a | l | b | u | m | - | e | m | p | t | y | " | > | 杩 | 樻 | 病 | 鏈 | 夋 | 兂 | 璇 | 荤 | 殑 | 涔 | ? | / | d | i | v | > | ' | ; |   | } |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |  | 
 |   |   | c | o | n | t | e | n | t | . | i | n | n | e | r | H | T | M | L |   | = |   | h | t | m | l | ; |  | 
 | } |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | s | w | i | t | c | h | B | o | o | k | T | a | b | ( | t | a | b | ) |   | { |  | 
 |   |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | A | l | l | ( | ' | . | b | o | o | k | - | t | a | b | s |   | b | u | t | t | o | n | ' | ) | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | b | ) |   | { |   | b | . | c | l | a | s | s | L | i | s | t | . | r | e | m | o | v | e | ( | ' | a | c | t | i | v | e | ' | ) | ; |   | } | ) | ; |  | 
 |   |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | A | l | l | ( | ' | . | b | o | o | k | - | t | a | b | - | c | o | n | t | e | n | t | ' | ) | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | c | ) |   | { |   | c | . | c | l | a | s | s | L | i | s | t | . | r | e | m | o | v | e | ( | ' | a | c | t | i | v | e | ' | ) | ; |   | } | ) | ; |  | 
 |   |   | e | v | e | n | t | . | t | a | r | g | e | t | . | c | l | a | s | s | L | i | s | t | . | a | d | d | ( | ' | a | c | t | i | v | e | ' | ) | ; |  | 
 |   |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | ' | t | a | b | - | ' |   | + |   | t | a | b | ) | . | c | l | a | s | s | L | i | s | t | . | a | d | d | ( | ' | a | c | t | i | v | e | ' | ) | ; |  | 
 | } |  | 
 |  | 
 | / | / |   |  | € |  | € |   | H | o | b | b | i | e | s |   | P | a | g | e |   |  | € |  | € |  | 
 | f | u | n | c | t | i | o | n |   | r | e | n | d | e | r | H | o | b | b | i | e | s | P | a | g | e | ( | i | n | t | e | r | e | s | t | ) |   | { |  | 
 |   |   | c | o | n | s | t |   | c | o | n | t | e | n | t |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | i | n | t | e | r | e | s | t | - | c | o | n | t | e | n | t | - | a | r | e | a | ' | ) | ; |  | 
 |   |   | v | a | r |   | h | o | b | b | i | e | s |   | = |   | i | n | t | e | r | e | s | t | . | h | o | b | b | i | e | s |   | | | | |   | [ | ] | ; |  | 
 |   |   | i | f |   | ( | h | o | b | b | i | e | s | . | l | e | n | g | t | h |   | = | = | = |   | 0 | ) |   | { |  | 
 |   |   |   |   | c | o | n | t | e | n | t | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | a | l | b | u | m | - | e | m | p | t | y | " | > | 杩 | 樻 | 病 | 鏈 | 夋 | 坊 | 鍔 | 犵 | 埍 | 濂 | ? | / | d | i | v | > | ' | ; |  | 
 |   |   |   |   | r | e | t | u | r | n | ; |  | 
 |   |   | } |  | 
 |   |   | c | o | n | t | e | n | t | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | h | o | b | b | y | - | t | a | g | s | " | > | ' |   | + |   | h | o | b | b | i | e | s | . | m | a | p | ( | f | u | n | c | t | i | o | n | ( | h | ) |   | { |  | 
 |   |   |   |   | r | e | t | u | r | n |   | ' | < | s | p | a | n |   | c | l | a | s | s | = | " | h | o | b | b | y | - | t | a | g | " | > | ' |   | + |   | h |   | + |   | ' | < | / | s | p | a | n | > | ' | ; |  | 
 |   |   | } | ) | . | j | o | i | n | ( | ' | ' | ) |   | + |   | ' | < | / | d | i | v | > | < | p |   | s | t | y | l | e | = | " | c | o | l | o | r | : | # | a | a | a | ; | t | e | x | t | - | a | l | i | g | n | : | c | e | n | t | e | r | ; | m | a | r | g | i | n | - | t | o | p | : | 2 | r | e | m | ; | f | o | n | t | - | s | i | z | e | : | 0 | . | 9 | 2 | r | e | m | ; | " | > | 杩 | 欎 | 簺 | 閮 | 芥 | 槸 | 鎴 | 戞 | 浘 | 缁 | 忚 |  | 鐪 | 熸 | 姇 | 鍏 | ヨ | 繃 | 鐨 | 勩 | € | 屼 | 笁 | 鍒 | 嗛 | 挓 | 鐑 |  | 害 | 銆 | 嶏 | 紝 | 姣 | 忎 | 竴 | 椤 | 归 | 兘 | 鍊 | 煎 | 緱 | 绾 |  | 康 | 銆 | ? | / | p | > | ' | ; |  | 
 | } |  | 
 |  | 
 | / | / |   |  | € |  | € |   | H | i | k | i | n | g |   | P | a | g | e |   |  | € |  | € |  | 
 | f | u | n | c | t | i | o | n |   | r | e | n | d | e | r | H | i | k | i | n | g | P | a | g | e | ( | i | n | t | e | r | e | s | t | ) |   | { |  | 
 |   |   | c | o | n | s | t |   | c | o | n | t | e | n | t |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | i | n | t | e | r | e | s | t | - | c | o | n | t | e | n | t | - | a | r | e | a | ' | ) | ; |  | 
 |   |   | v | a | r |   | c | l | i | m | b | e | d |   | = |   | i | n | t | e | r | e | s | t | . | c | l | i | m | b | e | d |   | | | | |   | [ | ] | ; |  | 
 |   |   | v | a | r |   | w | a | n | t | T | o | C | l | i | m | b |   | = |   | i | n | t | e | r | e | s | t | . | w | a | n | t | T | o | C | l | i | m | b |   | | | | |   | [ | ] | ; |  | 
 |   |   | v | a | r |   | i | m | a | g | e | s |   | = |   | i | n | t | e | r | e | s | t | . | i | m | a | g | e | s |   | | | | |   | [ | ] | ; |  | 
 |   |   | v | a | r |   | j | o | u | r | n | a | l |   | = |   | i | n | t | e | r | e | s | t | . | j | o | u | r | n | a | l |   | | | | |   | ' | ' | ; |  | 
 |  | 
 |   |   | v | a | r |   | h | t | m | l |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | t | a | b | s | " | > | ' | ; |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | b | u | t | t | o | n |   | c | l | a | s | s | = | " | a | c | t | i | v | e | " |   | o | n | c | l | i | c | k | = | " | s | w | i | t | c | h | B | o | o | k | T | a | b | ( | \ | ' | c | l | i | m | b | e | d | \ | ' | ) | " | > | 宸 | 茬 | 櫥 | 灞 | 辫 | 剦 | < | / | b | u | t | t | o | n | > | ' | ; |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | b | u | t | t | o | n |   | o | n | c | l | i | c | k | = | " | s | w | i | t | c | h | B | o | o | k | T | a | b | ( | \ | ' | w | a | n | t | C | l | i | m | b | \ | ' | ) | " | > | 鎯 | 宠 |  | 寰 | 佹 | 湇 | < | / | b | u | t | t | o | n | > | ' | ; |  | 
 |   |   | i | f |   | ( | j | o | u | r | n | a | l | ) |   | h | t | m | l |   | + | = |   | ' | < | b | u | t | t | o | n |   | o | n | c | l | i | c | k | = | " | s | w | i | t | c | h | B | o | o | k | T | a | b | ( | \ | ' | j | o | u | r | n | a | l | \ | ' | ) | " | > | 闅 | 忕 | 瑪 | < | / | b | u | t | t | o | n | > | ' | ; |  | 
 |   |   | i | f |   | ( | i | m | a | g | e | s | . | l | e | n | g | t | h | ) |   | h | t | m | l |   | + | = |   | ' | < | b | u | t | t | o | n |   | o | n | c | l | i | c | k | = | " | s | w | i | t | c | h | B | o | o | k | T | a | b | ( | \ | ' | p | h | o | t | o | s | \ | ' | ) | " | > | 鐓 | х | 墖 | < | / | b | u | t | t | o | n | > | ' | ; |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | t | a | b | - | c | o | n | t | e | n | t |   | a | c | t | i | v | e | " |   | i | d | = | " | t | a | b | - | c | l | i | m | b | e | d | " | > | ' | ; |  | 
 |   |   | i | f |   | ( | c | l | i | m | b | e | d | . | l | e | n | g | t | h | ) |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | l | i | s | t | " | > | ' |   | + |   | c | l | i | m | b | e | d | . | m | a | p | ( | f | u | n | c | t | i | o | n | ( | m | ) |   | { |  | 
 |   |   |   |   |   |   | r | e | t | u | r | n |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | c | a | r | d | " | > | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | i | c | o | n | " | > | ' |   | + |   | I | C | O | N | S | . | m | o | u | n | t | a | i | n |   | + |   | ' | < | / | d | i | v | > | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | i | n | f | o | " | > | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | n | a | m | e | " | > | ' |   | + |   | m | . | n | a | m | e |   | + |   | ' | < | / | d | i | v | > | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | d | e | t | a | i | l | " | > | ' |   | + |   | ( | m | . | d | a | t | e |   | | | | |   | ' | ' | ) |   | + |   | ( | m | . | n | o | t | e |   | ? |   | ' |   | 路 |   | ' |   | + |   | m | . | n | o | t | e |   | : |   | ' | ' | ) |   | + |   | ' | < | / | d | i | v | > | < | / | d | i | v | > | < | s | p | a | n |   | c | l | a | s | s | = | " | t | a | g | - | c | l | i | m | b | e | d | " | > | 宸 | 茬 | 櫥 | 椤 | ? | / | s | p | a | n | > | < | / | d | i | v | > | ' | ; |  | 
 |   |   |   |   | } | ) | . | j | o | i | n | ( | ' | ' | ) |   | + |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |   | e | l | s | e |   | { |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | a | l | b | u | m | - | e | m | p | t | y | " | > | 杩 | 樻 | 病 | 鏈 | 夊 | 凡 | 鐧 | 诲 | 北 | 鑴 | ? | / | d | i | v | > | ' | ; |   | } |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | t | a | b | - | c | o | n | t | e | n | t | " |   | i | d | = | " | t | a | b | - | w | a | n | t | C | l | i | m | b | " | > | ' | ; |  | 
 |   |   | i | f |   | ( | w | a | n | t | T | o | C | l | i | m | b | . | l | e | n | g | t | h | ) |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | l | i | s | t | " | > | ' |   | + |   | w | a | n | t | T | o | C | l | i | m | b | . | m | a | p | ( | f | u | n | c | t | i | o | n | ( | m | ) |   | { |  | 
 |   |   |   |   |   |   | r | e | t | u | r | n |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | c | a | r | d | " | > | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | i | c | o | n | " | > | ' |   | + |   | I | C | O | N | S | . | m | o | u | n | t | a | i | n |   | + |   | ' | < | / | d | i | v | > | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | i | n | f | o | " | > | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | n | a | m | e | " | > | ' |   | + |   | m | . | n | a | m | e |   | + |   | ' | < | / | d | i | v | > | ' |   | + |   | ( | m | . | r | e | a | s | o | n |   | ? |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | m | o | u | n | t | a | i | n | - | d | e | t | a | i | l | " | > | ' |   | + |   | m | . | r | e | a | s | o | n |   | + |   | ' | < | / | d | i | v | > | ' |   | : |   | ' | ' | ) |   | + |   | ' | < | / | d | i | v | > | < | s | p | a | n |   | c | l | a | s | s | = | " | t | a | g | - | w | a | n | t | e | d | " | > | 鎯 | 宠 |  | 寰 | 佹 | 湇 | < | / | s | p | a | n | > | < | / | d | i | v | > | ' | ; |  | 
 |   |   |   |   | } | ) | . | j | o | i | n | ( | ' | ' | ) |   | + |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |   | e | l | s | e |   | { |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | a | l | b | u | m | - | e | m | p | t | y | " | > | 杩 | 樻 | 病 | 鏈 | 夋 | 兂 | 瑕 | 佸 | 緛 | 鏈 | 嶇 | 殑 | 灞 | ? | / | d | i | v | > | ' | ; |   | } |  | 
 |   |   | h | t | m | l |   | + | = |   | ' | < | / | d | i | v | > | ' | ; |  | 
 |  | 
 |   |   | i | f |   | ( | j | o | u | r | n | a | l | ) |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | t | a | b | - | c | o | n | t | e | n | t | " |   | i | d | = | " | t | a | b | - | j | o | u | r | n | a | l | " | > | < | d | i | v |   | c | l | a | s | s | = | " | a | l | b | u | m | - | j | o | u | r | n | a | l | " | > | < | d | i | v |   | c | l | a | s | s | = | " | j | o | u | r | n | a | l | - | c | o | n | t | e | n | t | " | > | ' |   | + |   | j | o | u | r | n | a | l |   | + |   | ' | < | / | d | i | v | > | < | / | d | i | v | > | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |  | 
 |  | 
 |   |   | i | f |   | ( | i | m | a | g | e | s | . | l | e | n | g | t | h | ) |   | { |  | 
 |   |   |   |   | h | t | m | l |   | + | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | b | o | o | k | - | t | a | b | - | c | o | n | t | e | n | t | " |   | i | d | = | " | t | a | b | - | p | h | o | t | o | s | " | > | < | d | i | v |   | c | l | a | s | s | = | " | i | n | t | e | r | e | s | t | - | g | a | l | l | e | r | y | " | > | ' |   | + |   | i | m | a | g | e | s | . | m | a | p | ( | f | u | n | c | t | i | o | n | ( | i | m | g | ) |   | { |   | r | e | t | u | r | n |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | g | a | l | l | e | r | y | - | i | t | e | m | " | > | < | i | m | g |   | s | r | c | = | " | . | . | / | ' |   | + |   | i | m | g |   | + |   | ' | " |   | a | l | t | = | " | " |   | l | o | a | d | i | n | g | = | " | l | a | z | y | " | > | < | / | d | i | v | > | ' | ; |   | } | ) | . | j | o | i | n | ( | ' | ' | ) |   | + |   | ' | < | / | d | i | v | > | < | / | d | i | v | > | ' | ; |  | 
 |   |   | } |  | 
 |  | 
 |   |   | c | o | n | t | e | n | t | . | i | n | n | e | r | H | T | M | L |   | = |   | h | t | m | l | ; |  | 
 | } |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | i | n | i | t | F | a | d | e | I | n | ( | ) |   | { |  | 
 |   |   | c | o | n | s | t |   | o | b | s | e | r | v | e | r |   | = |   | n | e | w |   | I | n | t | e | r | s | e | c | t | i | o | n | O | b | s | e | r | v | e | r | ( | ( | e | n | t | r | i | e | s | ) |   | = | > |   | { |  | 
 |   |   |   |   | e | n | t | r | i | e | s | . | f | o | r | E | a | c | h | ( | e | n | t | r | y |   | = | > |   | { |   | i | f |   | ( | e | n | t | r | y | . | i | s | I | n | t | e | r | s | e | c | t | i | n | g | ) |   | e | n | t | r | y | . | t | a | r | g | e | t | . | c | l | a | s | s | L | i | s | t | . | a | d | d | ( | ' | v | i | s | i | b | l | e | ' | ) | ; |   | } | ) | ; |  | 
 |   |   | } | , |   | { |   | t | h | r | e | s | h | o | l | d | : |   | 0 | . | 1 | 5 |   | } | ) | ; |  | 
 |   |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | A | l | l | ( | ' | . | f | a | d | e | - | i | n | ' | ) | . | f | o | r | E | a | c | h | ( | e | l |   | = | > |   | o | b | s | e | r | v | e | r | . | o | b | s | e | r | v | e | ( | e | l | ) | ) | ; |  | 
 | } |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | h | i | g | h | l | i | g | h | t | N | a | v | ( | ) |   | { |  | 
 |   |   | c | o | n | s | t |   | p | a | t | h |   | = |   | w | i | n | d | o | w | . | l | o | c | a | t | i | o | n | . | p | a | t | h | n | a | m | e | ; |  | 
 |   |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | A | l | l | ( | ' | . | n | a | v | - | l | i | n | k | s |   | a | ' | ) | . | f | o | r | E | a | c | h | ( | a |   | = | > |   | { |  | 
 |   |   |   |   | c | o | n | s | t |   | h | r | e | f |   | = |   | a | . | g | e | t | A | t | t | r | i | b | u | t | e | ( | ' | h | r | e | f | ' | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | p | a | t | h | . | e | n | d | s | W | i | t | h | ( | h | r | e | f | ) |   | | | | |   | ( | h | r | e | f |   | = | = | = |   | ' | i | n | d | e | x | . | h | t | m | l | ' |   | & | & |   | ( | p | a | t | h | . | e | n | d | s | W | i | t | h | ( | ' | / | ' | ) |   | | | | |   | p | a | t | h | . | e | n | d | s | W | i | t | h | ( | ' | / | s | i | t | e | / | ' | ) | ) | ) | ) |   | { |  | 
 |   |   |   |   |   |   | a | . | c | l | a | s | s | L | i | s | t | . | a | d | d | ( | ' | a | c | t | i | v | e | ' | ) | ; |  | 
 |   |   |   |   | } |  | 
 |   |   | } | ) | ; |  | 
 | } |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | i | n | i | t | B | a | c | k | T | o | T | o | p | ( | ) |   | { |  | 
 |   |   | v | a | r |   | b | t | n |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | ' | b | a | c | k | T | o | T | o | p | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | b | t | n | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | w | i | n | d | o | w | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | ' | s | c | r | o | l | l | ' | , |   | f | u | n | c | t | i | o | n | ( | ) |   | { |  | 
 |   |   |   |   | b | t | n | . | c | l | a | s | s | L | i | s | t | . | t | o | g | g | l | e | ( | ' | v | i | s | i | b | l | e | ' | , |   | w | i | n | d | o | w | . | s | c | r | o | l | l | Y |   | > |   | 4 | 0 | 0 | ) | ; |  | 
 |   |   | } | ) | ; |  | 
 |   |   | b | t | n | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | ' | c | l | i | c | k | ' | , |   | f | u | n | c | t | i | o | n | ( | ) |   | { |  | 
 |   |   |   |   | w | i | n | d | o | w | . | s | c | r | o | l | l | T | o | ( | { |   | t | o | p | : |   | 0 | , |   | b | e | h | a | v | i | o | r | : |   | ' | s | m | o | o | t | h | ' |   | } | ) | ; |  | 
 |   |   | } | ) | ; |  | 
 | } |  | 
 | v | a | r |   | g | b | C | o | m | m | e | n | t | s |   | = |   | [ | ] | ; |  | 
 | v | a | r |   | G | B | _ | T | O | K | E | N |   | = |   | [ | " | g | " | , | " | h | " | , | " | p | " | , | " | _ | " | , | " | S | " | , | " | U | " | , | " | Q | " | , | " | x | " | , | " | m | " | , | " | s | " | , | " | W | " | , | " | L | " | , | " | D | " | , | " | v | " | , | " | 6 | " | , | " | X | " | , | " | k | " | , | " | U | " | , | " | n | " | , | " | e | " | , | " | Z | " | , | " | 5 | " | , | " | b | " | , | " | Y | " | , | " | H | " | , | " | G | " | , | " | j | " | , | " | s | " | , | " | k | " | , | " | e | " | , | " | x | " | , | " | 4 | " | , | " | b | " | , | " | f | " | , | " | 3 | " | , | " | 3 | " | , | " | 3 | " | , | " | a | " | , | " | f | " | , | " | O | " | ] | . | j | o | i | n | ( | " | " | ) | ; |  | 
 | v | a | r |   | g | e | o | S | h | a | p | e | s |   | = |   | [ | ] | ; |  | 
 | v | a | r |   | g | e | o | R | i | b | b | o | n | s |   | = |   | [ | ] | ; |  | 
 | v | a | r |   | g | e | o | A | n | i | m | I | d |   | = |   | n | u | l | l | ; |  | 
 | v | a | r |   | g | e | o | M | o | u | s | e |   | = |   | { |   | x | : |   | 0 | , |   | y | : |   | 0 | , |   | d | o | w | n | : |   | f | a | l | s | e | , |   | d | r | a | g | : |   | n | u | l | l | , |   | o | x | : |   | 0 | , |   | o | y | : |   | 0 | , |   | i | s | R | i | b | b | o | n | : |   | f | a | l | s | e |   | } | ; |  | 
 | v | a | r |   | g | e | o | I | n | f | o |   | = |   | n | u | l | l | ; |  | 
 | v | a | r |   | g | e | o | N | e | w | I | d | x |   | = |   | - | 1 | ; |  | 
 | v | a | r |   | g | e | o | C | o | n | t | a | i | n | e | r | W |   | = |   | 6 | 8 | 0 | ; |  | 
 | v | a | r |   | g | e | o | C | o | n | t | a | i | n | e | r | H |   | = |   | 4 | 2 | 0 | ; |  | 
 |  | 
 | / | / |   | P | a | s | t | e | l |   | p | a | l | e | t | t | e |   | f | o | r |   | s | h | a | p | e | s |  | 
 | v | a | r |   | G | E | O | _ | C | O | L | O | R | S |   | = |   | [ |  | 
 |   |   | " | # | 5 | b | 9 | b | d | 5 | " | , | " | # | e | 8 | 9 | 1 | 5 | c | " | , | " | # | 6 | c | b | e | 8 | a | " | , | " | # | d | 4 | 7 | a | 8 | c | " | , | " | # | 5 | d | a | 8 | c | 4 | " | , |  | 
 |   |   | " | # | e | 0 | a | 5 | 6 | b | " | , | " | # | 7 | f | b | 8 | c | 8 | " | , | " | # | c | 4 | 7 | a | 9 | e | " | , | " | # | 6 | 8 | a | 8 | b | 4 | " | , | " | # | d | 8 | 9 | c | 7 | 8 | " | , |  | 
 |   |   | " | # | 8 | c | b | 8 | c | 0 | " | , | " | # | c | 8 | 8 | c | 7 | c | " | , | " | # | 7 | 4 | b | 0 | c | 8 | " | , | " | # | d | 4 | 9 | 0 | 8 | a | " | , | " | # | 8 | 0 | a | 8 | c | 0 | " | , |  | 
 |   |   | " | # | c | 0 | 9 | 8 | a | 8 | " | , | " | # | 9 | 0 | b | 0 | c | 4 | " | , | " | # | b | 0 | 9 | 0 | a | 0 | " | , | " | # | 7 | c | a | 8 | c | 8 | " | , | " | # | c | 4 | a | 0 | 9 | 0 | " |  | 
 | ] | ; |  | 
 | v | a | r |   | R | I | B | B | O | N | _ | C | O | L | O | R | S |   | = |   | [ |  | 
 |   |   | " | # | d | 4 | c | 8 | c | 0 | " | , | " | # | c | 8 | d | 0 | d | 4 | " | , | " | # | d | 0 | c | c | c | 8 | " | , | " | # | c | c | d | 0 | c | c | " | , | " | # | d | 8 | d | 0 | c | c | " | , |  | 
 |   |   | " | # | c | 4 | c | c | d | 0 | " | , | " | # | d | 0 | c | 4 | c | 8 | " | , | " | # | c | c | d | 4 | d | 0 | " | , | " | # | c | 8 | c | 8 | d | 0 | " | , | " | # | d | 4 | c | c | c | 8 | " | , |  | 
 |   |   | " | # | c | c | d | 0 | c | 8 | " | , | " | # | c | 8 | c | c | d | 0 | " | , | " | # | d | 0 | c | 8 | d | 0 | " | , | " | # | c | 4 | d | 0 | c | c | " | , | " | # | d | 8 | c | c | c | 4 | " |  | 
 | ] | ; |  | 
 | v | a | r |   | S | H | A | P | E | _ | T | Y | P | E | S |   | = |   | [ | " | c | i | r | c | l | e | " | , | " | t | r | i | a | n | g | l | e | " | , | " | s | q | u | a | r | e | " | , | " | p | e | n | t | a | g | o | n | " | , | " | h | e | x | a | g | o | n | " | ] | ; |  | 
 |  | 
 | a | s | y | n | c |   | f | u | n | c | t | i | o | n |   | l | o | a | d | G | u | e | s | t | b | o | o | k | ( | ) |   | { |  | 
 |   |   | t | r | y |   | { |  | 
 |   |   |   |   | v | a | r |   | r | e | s |   | = |   | a | w | a | i | t |   | f | e | t | c | h | ( | " | d | a | t | a | / | c | o | m | m | e | n | t | s | . | j | s | o | n | ? | v | = | " |   | + |   | D | a | t | e | . | n | o | w | ( | ) | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | ! | r | e | s | . | o | k | ) |   | { |   | g | b | C | o | m | m | e | n | t | s |   | = |   | [ | ] | ; |   | r | e | n | d | e | r | G | e | o | G | u | e | s | t | b | o | o | k | ( | ) | ; |   | r | e | t | u | r | n | ; |   | } |  | 
 |   |   |   |   | g | b | C | o | m | m | e | n | t | s |   | = |   | a | w | a | i | t |   | r | e | s | . | j | s | o | n | ( | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | ! | A | r | r | a | y | . | i | s | A | r | r | a | y | ( | g | b | C | o | m | m | e | n | t | s | ) | ) |   | g | b | C | o | m | m | e | n | t | s |   | = |   | [ | ] | ; |  | 
 |   |   | } |   | c | a | t | c | h | ( | e | ) |   | { |   | g | b | C | o | m | m | e | n | t | s |   | = |   | [ | ] | ; |   | } |  | 
 |   |   | t | r | y |   | { |  | 
 |   |   |   |   | v | a | r |   | l | o | c | a | l |   | = |   | J | S | O | N | . | p | a | r | s | e | ( | l | o | c | a | l | S | t | o | r | a | g | e | . | g | e | t | I | t | e | m | ( | " | g | b | _ | l | o | c | a | l | " | ) |   | | | | |   | " | [ | ] | " | ) | ; |  | 
 |   |   |   |   | l | o | c | a | l | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | c | ) |   | { |  | 
 |   |   |   |   |   |   | i | f |   | ( | ! | g | b | C | o | m | m | e | n | t | s | . | s | o | m | e | ( | f | u | n | c | t | i | o | n | ( | x | ) |   | { |   | r | e | t | u | r | n |   | x | . | t | e | x | t |   | = | = | = |   | c | . | t | e | x | t |   | & | & |   | x | . | n | a | m | e |   | = | = | = |   | c | . | n | a | m | e |   | & | & |   | x | . | d | a | t | e |   | = | = | = |   | c | . | d | a | t | e | ; |   | } | ) | ) |   | { |  | 
 |   |   |   |   |   |   |   |   | g | b | C | o | m | m | e | n | t | s | . | u | n | s | h | i | f | t | ( | c | ) | ; |  | 
 |   |   |   |   |   |   | } |  | 
 |   |   |   |   | } | ) | ; |  | 
 |   |   | } |   | c | a | t | c | h | ( | e | ) |   | { | } |  | 
 |   |   | r | e | n | d | e | r | G | e | o | G | u | e | s | t | b | o | o | k | ( | ) | ; |  | 
 | } |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | r | o | u | n | d | e | d | P | o | l | y | P | a | t | h | ( | s | i | d | e | s | , |   | r | , |   | c | r | ) |   | { |  | 
 |   |   | v | a | r |   | c | x |   | = |   | 5 | 0 | , |   | c | y |   | = |   | 5 | 0 | ; |  | 
 |   |   | v | a | r |   | p | t | s |   | = |   | [ | ] | ; |  | 
 |   |   | f | o | r |   | ( | v | a | r |   | i |   | = |   | 0 | ; |   | i |   | < |   | s | i | d | e | s | ; |   | i | + | + | ) |   | { |  | 
 |   |   |   |   | v | a | r |   | a |   | = |   | ( | M | a | t | h | . | P | I | * | 2 | * | i | ) | / | s | i | d | e | s |   | - |   | M | a | t | h | . | P | I | / | 2 | ; |  | 
 |   |   |   |   | p | t | s | . | p | u | s | h | ( | { | x | : |   | c | x |   | + |   | r | * | M | a | t | h | . | c | o | s | ( | a | ) | , |   | y | : |   | c | y |   | + |   | r | * | M | a | t | h | . | s | i | n | ( | a | ) | } | ) | ; |  | 
 |   |   | } |  | 
 |   |   | v | a | r |   | d |   | = |   | ' | ' | ; |  | 
 |   |   | f | o | r |   | ( | v | a | r |   | i |   | = |   | 0 | ; |   | i |   | < |   | s | i | d | e | s | ; |   | i | + | + | ) |   | { |  | 
 |   |   |   |   | v | a | r |   | p | 0 |   | = |   | p | t | s | [ | ( | i | + | s | i | d | e | s | - | 1 | ) | % | s | i | d | e | s | ] | , |   | p | 1 |   | = |   | p | t | s | [ | i | ] | , |   | p | 2 |   | = |   | p | t | s | [ | ( | i | + | 1 | ) | % | s | i | d | e | s | ] | ; |  | 
 |   |   |   |   | v | a | r |   | d | x | 1 |   | = |   | p | 0 | . | x |   | - |   | p | 1 | . | x | , |   | d | y | 1 |   | = |   | p | 0 | . | y |   | - |   | p | 1 | . | y | , |   | l | e | n | 1 |   | = |   | M | a | t | h | . | s | q | r | t | ( | d | x | 1 | * | d | x | 1 | + | d | y | 1 | * | d | y | 1 | ) |   | | | | |   | 1 | ; |  | 
 |   |   |   |   | v | a | r |   | d | x | 2 |   | = |   | p | 2 | . | x |   | - |   | p | 1 | . | x | , |   | d | y | 2 |   | = |   | p | 2 | . | y |   | - |   | p | 1 | . | y | , |   | l | e | n | 2 |   | = |   | M | a | t | h | . | s | q | r | t | ( | d | x | 2 | * | d | x | 2 | + | d | y | 2 | * | d | y | 2 | ) |   | | | | |   | 1 | ; |  | 
 |   |   |   |   | v | a | r |   | t | 1 |   | = |   | M | a | t | h | . | m | i | n | ( | c | r | / | l | e | n | 1 | , |   | 0 | . | 4 | 5 | ) | , |   | t | 2 |   | = |   | M | a | t | h | . | m | i | n | ( | c | r | / | l | e | n | 2 | , |   | 0 | . | 4 | 5 | ) | ; |  | 
 |   |   |   |   | v | a | r |   | a | 1 | x |   | = |   | p | 1 | . | x |   | + |   | d | x | 1 | * | t | 1 | , |   | a | 1 | y |   | = |   | p | 1 | . | y |   | + |   | d | y | 1 | * | t | 1 | ; |  | 
 |   |   |   |   | v | a | r |   | a | 2 | x |   | = |   | p | 1 | . | x |   | + |   | d | x | 2 | * | t | 2 | , |   | a | 2 | y |   | = |   | p | 1 | . | y |   | + |   | d | y | 2 | * | t | 2 | ; |  | 
 |   |   |   |   | i | f |   | ( | i |   | = | = | = |   | 0 | ) |   | d |   | + | = |   | ' | M | ' | + | a | 1 | x | . | t | o | F | i | x | e | d | ( | 1 | ) | + | ' |   | ' | + | a | 1 | y | . | t | o | F | i | x | e | d | ( | 1 | ) | ; |  | 
 |   |   |   |   | d |   | + | = |   | ' |   | L | ' | + | a | 1 | x | . | t | o | F | i | x | e | d | ( | 1 | ) | + | ' |   | ' | + | a | 1 | y | . | t | o | F | i | x | e | d | ( | 1 | ) | ; |  | 
 |   |   |   |   | d |   | + | = |   | ' |   | Q | ' | + | p | 1 | . | x | . | t | o | F | i | x | e | d | ( | 1 | ) | + | ' |   | ' | + | p | 1 | . | y | . | t | o | F | i | x | e | d | ( | 1 | ) | + | ' |   | ' | + | a | 2 | x | . | t | o | F | i | x | e | d | ( | 1 | ) | + | ' |   | ' | + | a | 2 | y | . | t | o | F | i | x | e | d | ( | 1 | ) | ; |  | 
 |   |   | } |  | 
 |   |   | d |   | + | = |   | ' |   | Z | ' | ; |  | 
 |   |   | r | e | t | u | r | n |   | d | ; |  | 
 | } |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | r | e | n | d | e | r | G | e | o | G | u | e | s | t | b | o | o | k | ( | ) |   | { |  | 
 |   |   | v | a | r |   | c | o | n | t | a | i | n | e | r |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | " | g | u | e | s | t | b | o | o | k | L | i | s | t | " | ) | ; |  | 
 |   |   | i | f |   | ( | ! | c | o | n | t | a | i | n | e | r | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | i | f |   | ( | g | e | o | A | n | i | m | I | d | ) |   | { |   | c | a | n | c | e | l | A | n | i | m | a | t | i | o | n | F | r | a | m | e | ( | g | e | o | A | n | i | m | I | d | ) | ; |   | g | e | o | A | n | i | m | I | d |   | = |   | n | u | l | l | ; |   | } |  | 
 |   |   |  | 
 |   |   | i | f |   | ( | ! | g | b | C | o | m | m | e | n | t | s |   | | | | |   | ! | g | b | C | o | m | m | e | n | t | s | . | l | e | n | g | t | h | ) |   | { |  | 
 |   |   |   |   | c | o | n | t | a | i | n | e | r | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | s | t | y | l | e | = | " | c | o | l | o | r | : | # | b | b | b | ; | f | o | n | t | - | s | i | z | e | : | 0 | . | 9 | 2 | r | e | m | ; | t | e | x | t | - | a | l | i | g | n | : | c | e | n | t | e | r | ; | p | a | d | d | i | n | g | : | 3 | r | e | m |   | 0 | " | > | 杩 | 樻 | 病 | 鏈 | 夌 | 暀 | 瑷 | € | 锛 | 屾 | 潵 | 璇 | 寸 | 偣 | 浠 | € | 涔 | 堝 | 惂 |   | 鉁 | ? | / | d | i | v | > | ' | ; |  | 
 |   |   |   |   | g | e | o | S | h | a | p | e | s |   | = |   | [ | ] | ; |   | g | e | o | R | i | b | b | o | n | s |   | = |   | [ | ] | ; |  | 
 |   |   |   |   | r | e | t | u | r | n | ; |  | 
 |   |   | } |  | 
 |   |   |  | 
 |   |   | / | / |   | D | o | u | b | l | e |   | c | o | n | t | a | i | n | e | r | : |   | o | u | t | e | r |   | v | i | s | u | a | l |   | f | r | a | m | e |   | + |   | i | n | n | e | r |   | p | h | y | s | i | c | s |   | a | r | e | a |  | 
 |   |   | c | o | n | t | a | i | n | e | r | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | ' | ; |  | 
 |   |   | c | o | n | t | a | i | n | e | r | . | s | t | y | l | e | . | c | s | s | T | e | x | t |   | = |   | ' | p | o | s | i | t | i | o | n | : | r | e | l | a | t | i | v | e | ; | p | a | d | d | i | n | g | : | 1 | 2 | p | x | ; | b | a | c | k | g | r | o | u | n | d | : | # | e | 8 | e | 8 | e | 8 | ; | b | o | r | d | e | r | - | r | a | d | i | u | s | : | 2 | 4 | p | x | ; | b | o | x | - | s | h | a | d | o | w | : | 0 |   | 4 | p | x |   | 3 | 0 | p | x |   | r | g | b | a | ( | 0 | , | 0 | , | 0 | , | 0 | . | 0 | 4 | ) | ' | ; |  | 
 |   |   | c | o | n | t | a | i | n | e | r | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | d | a | t | a | - | g | e | o | ' | , |   | ' | 1 | ' | ) | ; |  | 
 |   |   |  | 
 |   |   | v | a | r |   | i | n | n | e | r |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | ( | ' | d | i | v | ' | ) | ; |  | 
 |   |   | i | n | n | e | r | . | c | l | a | s | s | N | a | m | e |   | = |   | ' | g | e | o | - | i | n | n | e | r | ' | ; |  | 
 |   |   | i | n | n | e | r | . | s | t | y | l | e | . | c | s | s | T | e | x | t |   | = |   | ' | p | o | s | i | t | i | o | n | : | r | e | l | a | t | i | v | e | ; | h | e | i | g | h | t | : | 4 | 2 | 0 | p | x | ; | o | v | e | r | f | l | o | w | : | h | i | d | d | e | n | ; | b | a | c | k | g | r | o | u | n | d | : | l | i | n | e | a | r | - | g | r | a | d | i | e | n | t | ( | 1 | 8 | 0 | d | e | g | , | # | f | 8 | f | 8 | f | 8 |   | 0 | % | , | # | f | 0 | f | 0 | f | 0 |   | 4 | 0 | % | , | # | e | c | e | c | e | c |   | 1 | 0 | 0 | % | ) | ; | b | o | r | d | e | r | - | r | a | d | i | u | s | : | 1 | 6 | p | x | ; | c | u | r | s | o | r | : | g | r | a | b | ; | u | s | e | r | - | s | e | l | e | c | t | : | n | o | n | e | ; | b | o | x | - | s | h | a | d | o | w | : | i | n | s | e | t |   | 0 |   | 0 |   | 4 | 0 | p | x |   | r | g | b | a | ( | 0 | , | 0 | , | 0 | , | 0 | . | 0 | 3 | ) | ' | ; |  | 
 |   |   | c | o | n | t | a | i | n | e | r | . | a | p | p | e | n | d | C | h | i | l | d | ( | i | n | n | e | r | ) | ; |  | 
 |   |   |  | 
 |   |   | g | e | o | I | n | f | o |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | ( | ' | d | i | v | ' | ) | ; |  | 
 |   |   | g | e | o | I | n | f | o | . | c | l | a | s | s | N | a | m | e |   | = |   | ' | g | e | o | - | i | n | f | o | ' | ; |  | 
 |   |   | g | e | o | I | n | f | o | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | d | i | v |   | c | l | a | s | s | = | " | g | e | o | - | i | n | f | o | - | i | n | n | e | r | " | > | < | / | d | i | v | > | ' | ; |  | 
 |   |   | i | n | n | e | r | . | a | p | p | e | n | d | C | h | i | l | d | ( | g | e | o | I | n | f | o | ) | ; |  | 
 |   |   |  | 
 |   |   | / | / |   | S | V | G |   | c | l | i | p |   | p | a | t | h | s |   | f | o | r |   | r | o | u | n | d | e | d |   | s | h | a | p | e | s |  | 
 |   |   | v | a | r |   | s | v | g | N | S |   | = |   | ' | h | t | t | p | : | / | / | w | w | w | . | w | 3 | . | o | r | g | / | 2 | 0 | 0 | 0 | / | s | v | g | ' | ; |  | 
 |   |   | v | a | r |   | s | v | g | E | l |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | N | S | ( | s | v | g | N | S | , |   | ' | s | v | g | ' | ) | ; |  | 
 |   |   | s | v | g | E | l | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | w | i | d | t | h | ' | , |   | ' | 0 | ' | ) | ; |   | s | v | g | E | l | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | h | e | i | g | h | t | ' | , |   | ' | 0 | ' | ) | ; |  | 
 |   |   | s | v | g | E | l | . | s | t | y | l | e | . | c | s | s | T | e | x | t |   | = |   | ' | p | o | s | i | t | i | o | n | : | a | b | s | o | l | u | t | e | ; | p | o | i | n | t | e | r | - | e | v | e | n | t | s | : | n | o | n | e | ' | ; |  | 
 |   |   | v | a | r |   | d | e | f | s |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | N | S | ( | s | v | g | N | S | , |   | ' | d | e | f | s | ' | ) | ; |  | 
 |   |   |  | 
 |   |   | v | a | r |   | c | l | i | p | D | e | f | s |   | = |   | { | } | ; |  | 
 |   |   | S | H | A | P | E | _ | T | Y | P | E | S | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | t | y | p | e | ) |   | { |  | 
 |   |   |   |   | v | a | r |   | s | i | d | e | s |   | = |   | t | y | p | e |   | = | = | = |   | ' | c | i | r | c | l | e | ' |   | ? |   | 5 | 0 |   | : |   | t | y | p | e |   | = | = | = |   | ' | t | r | i | a | n | g | l | e | ' |   | ? |   | 3 |   | : |   | t | y | p | e |   | = | = | = |   | ' | s | q | u | a | r | e | ' |   | ? |   | 4 |   | : |   | t | y | p | e |   | = | = | = |   | ' | p | e | n | t | a | g | o | n | ' |   | ? |   | 5 |   | : |   | 6 | ; |  | 
 |   |   |   |   | v | a | r |   | c | l | i | p | I | d |   | = |   | ' | r | p | _ | ' |   | + |   | t | y | p | e | ; |  | 
 |   |   |   |   | c | l | i | p | D | e | f | s | [ | t | y | p | e | ] |   | = |   | c | l | i | p | I | d | ; |  | 
 |   |   |   |   | v | a | r |   | c | l | i | p |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | N | S | ( | s | v | g | N | S | , |   | ' | c | l | i | p | P | a | t | h | ' | ) | ; |  | 
 |   |   |   |   | c | l | i | p | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | i | d | ' | , |   | c | l | i | p | I | d | ) | ; |  | 
 |   |   |   |   | c | l | i | p | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | c | l | i | p | P | a | t | h | U | n | i | t | s | ' | , |   | ' | o | b | j | e | c | t | B | o | u | n | d | i | n | g | B | o | x | ' | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | t | y | p | e |   | = | = | = |   | ' | c | i | r | c | l | e | ' | ) |   | { |  | 
 |   |   |   |   |   |   | v | a | r |   | c | i | r | c |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | N | S | ( | s | v | g | N | S | , |   | ' | c | i | r | c | l | e | ' | ) | ; |  | 
 |   |   |   |   |   |   | c | i | r | c | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | c | x | ' | , |   | ' | 0 | . | 5 | ' | ) | ; |   | c | i | r | c | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | c | y | ' | , |   | ' | 0 | . | 5 | ' | ) | ; |   | c | i | r | c | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | r | ' | , |   | ' | 0 | . | 5 | ' | ) | ; |  | 
 |   |   |   |   |   |   | c | l | i | p | . | a | p | p | e | n | d | C | h | i | l | d | ( | c | i | r | c | ) | ; |  | 
 |   |   |   |   | } |   | e | l | s | e |   | { |  | 
 |   |   |   |   |   |   | v | a | r |   | p | a | t | h |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | N | S | ( | s | v | g | N | S | , |   | ' | p | a | t | h | ' | ) | ; |  | 
 |   |   |   |   |   |   | p | a | t | h | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | d | ' | , |   | r | o | u | n | d | e | d | P | o | l | y | P | a | t | h | ( | s | i | d | e | s | , |   | 4 | 8 | , |   | 8 | ) | ) | ; |  | 
 |   |   |   |   |   |   | p | a | t | h | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | t | r | a | n | s | f | o | r | m | ' | , |   | ' | s | c | a | l | e | ( | 0 | . | 0 | 1 | ) | ' | ) | ; |  | 
 |   |   |   |   |   |   | c | l | i | p | . | a | p | p | e | n | d | C | h | i | l | d | ( | p | a | t | h | ) | ; |  | 
 |   |   |   |   | } |  | 
 |   |   |   |   | d | e | f | s | . | a | p | p | e | n | d | C | h | i | l | d | ( | c | l | i | p | ) | ; |  | 
 |   |   | } | ) | ; |  | 
 |   |   | s | v | g | E | l | . | a | p | p | e | n | d | C | h | i | l | d | ( | d | e | f | s | ) | ; |  | 
 |   |   | i | n | n | e | r | . | a | p | p | e | n | d | C | h | i | l | d | ( | s | v | g | E | l | ) | ; |  | 
 |   |   |  | 
 |   |   | v | a | r |   | W |   | = |   | i | n | n | e | r | . | c | l | i | e | n | t | W | i | d | t | h |   | | | | |   | g | e | o | C | o | n | t | a | i | n | e | r | W | ; |  | 
 |   |   | v | a | r |   | H |   | = |   | 4 | 2 | 0 | ; |  | 
 |   |   | v | a | r |   | c | o | l | s |   | = |   | M | a | t | h | . | m | i | n | ( | g | b | C | o | m | m | e | n | t | s | . | l | e | n | g | t | h | , |   | 5 | ) | ; |  | 
 |   |   |  | 
 |   |   | / | / |   | C | r | e | a | t | e |   | s | h | a | p | e | s |  | 
 |   |   | g | e | o | S | h | a | p | e | s |   | = |   | [ | ] | ; |  | 
 |   |   | g | b | C | o | m | m | e | n | t | s | . | s | l | i | c | e | ( | 0 | , |   | 3 | 0 | ) | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | c | , |   | i | ) |   | { |  | 
 |   |   |   |   | v | a | r |   | s | h | a | p | e | T | y | p | e |   | = |   | S | H | A | P | E | _ | T | Y | P | E | S | [ | i |   | % |   | S | H | A | P | E | _ | T | Y | P | E | S | . | l | e | n | g | t | h | ] | ; |  | 
 |   |   |   |   | v | a | r |   | c | o | l | o | r |   | = |   | G | E | O | _ | C | O | L | O | R | S | [ | i |   | % |   | G | E | O | _ | C | O | L | O | R | S | . | l | e | n | g | t | h | ] | ; |  | 
 |   |   |   |   | v | a | r |   | s | i | z | e |   | = |   | 5 | 0 |   | + |   | M | a | t | h | . | f | l | o | o | r | ( | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | 6 | ) | ; |  | 
 |   |   |   |   | v | a | r |   | e | l |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | ( | ' | d | i | v | ' | ) | ; |  | 
 |   |   |   |   | e | l | . | c | l | a | s | s | N | a | m | e |   | = |   | ' | g | e | o | - | s | h | a | p | e |   | g | e | o | - | ' |   | + |   | s | h | a | p | e | T | y | p | e | ; |  | 
 |   |   |   |   | v | a | r |   | c | l | i | p | I | d |   | = |   | c | l | i | p | D | e | f | s | [ | s | h | a | p | e | T | y | p | e | ] | ; |  | 
 |   |   |   |   | v | a | r |   | b | g |   | = |   | ' | r | a | d | i | a | l | - | g | r | a | d | i | e | n | t | ( | c | i | r | c | l | e |   | a | t |   | 3 | 5 | % |   | 3 | 5 | % | , |   | r | g | b | a | ( | 2 | 5 | 5 | , | 2 | 5 | 5 | , | 2 | 5 | 5 | , | 0 | . | 5 | ) |   | 0 | % | , |   | ' |   | + |   | c | o | l | o | r |   | + |   | ' | 9 | 9 |   | 6 | 0 | % | , |   | ' |   | + |   | c | o | l | o | r |   | + |   | ' | c | c |   | 1 | 0 | 0 | % | ) | ' | ; |  | 
 |   |   |   |   | e | l | . | s | t | y | l | e | . | c | s | s | T | e | x | t |   | = |   | ' | p | o | s | i | t | i | o | n | : | a | b | s | o | l | u | t | e | ; | w | i | d | t | h | : | ' |   | + |   | s | i | z | e |   | + |   | ' | p | x | ; | h | e | i | g | h | t | : | ' |   | + |   | s | i | z | e |   | + |   | ' | p | x | ; | c | l | i | p | - | p | a | t | h | : | u | r | l | ( | # | ' |   | + |   | c | l | i | p | I | d |   | + |   | ' | ) | ; | - | w | e | b | k | i | t | - | c | l | i | p | - | p | a | t | h | : | u | r | l | ( | # | ' |   | + |   | c | l | i | p | I | d |   | + |   | ' | ) | ; | b | a | c | k | g | r | o | u | n | d | : | ' |   | + |   | b | g |   | + |   | ' | ; | o | p | a | c | i | t | y | : | 0 | . | 8 | 8 | ; | b | o | x | - | s | h | a | d | o | w | : | 0 |   | 3 | p | x |   | 1 | 2 | p | x |   | r | g | b | a | ( | 0 | , | 0 | , | 0 | , | 0 | . | 0 | 7 | ) | , | i | n | s | e | t |   | 0 |   | 1 | p | x |   | 0 |   | r | g | b | a | ( | 2 | 5 | 5 | , | 2 | 5 | 5 | , | 2 | 5 | 5 | , | 0 | . | 3 | ) | ; | t | r | a | n | s | i | t | i | o | n | : | t | r | a | n | s | f | o | r | m |   | 0 | . | 1 | s | , | o | p | a | c | i | t | y |   | 0 | . | 5 | s | ; | z | - | i | n | d | e | x | : | 1 | ' | ; |  | 
 |   |   |   |   | e | l | . | s | e | t | A | t | t | r | i | b | u | t | e | ( | ' | d | a | t | a | - | i | d | x | ' | , |   | i | ) | ; |  | 
 |   |   |   |   | e | l | . | t | i | t | l | e |   | = |   | ( | c | . | n | a | m | e |   | | | | |   | ' | 匿 | 名 | ' | ) |   | + |   | ' |  | ? |   | + |   | ( | c | . | t | e | x | t |   | | | | |   | ' | ' | ) | . | s | u | b | s | t | r | i | n | g | ( | 0 | , |   | 6 | 0 | ) | ; |  | 
 |   |   |   |   | i | n | n | e | r | . | a | p | p | e | n | d | C | h | i | l | d | ( | e | l | ) | ; |  | 
 |   |   |   |   |  | 
 |   |   |   |   | v | a | r |   | i | s | N | e | w |   | = |   | ( | i |   | = | = | = |   | 0 |   | & | & |   | g | e | o | N | e | w | I | d | x |   | = | = | = |   | 0 | ) | ; |  | 
 |   |   |   |   | v | a | r |   | s | t | a | r | t | Y |   | = |   | i | s | N | e | w |   | ? |   | - | s | i | z | e |   | - |   | 1 | 0 |   | : |   | 3 | 0 |   | + |   | M | a | t | h | . | f | l | o | o | r | ( | i |   | / |   | c | o | l | s | ) |   | * |   | 9 | 0 |   | + |   | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | 3 | 0 | ; |  | 
 |   |   |   |   | / | / |   | D | i | r | e | c | t |   | c | l | i | c | k |   | h | a | n | d | l | e | r |   | - |   | r | e | l | i | a | b | l | e |   | f | a | l | l | b | a | c | k |  | 
 |   |   |   |   | e | l | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | ' | c | l | i | c | k | ' | , |   | f | u | n | c | t | i | o | n | ( | e | v | ) |   | { |  | 
 |   |   |   |   |   |   | e | v | . | s | t | o | p | P | r | o | p | a | g | a | t | i | o | n | ( | ) | ; |  | 
 |   |   |   |   |   |   | v | a | r |   | s |   | = |   | g | e | o | S | h | a | p | e | s | [ | i | ] | ; |  | 
 |   |   |   |   |   |   | i | f |   | ( | ! | s | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   |   |   |   |   | v | a | r |   | i | n | n |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | [ | d | a | t | a | - | g | e | o | ] |   | . | g | e | o | - | i | n | n | e | r | ' | ) | ; |  | 
 |   |   |   |   |   |   | i | f |   | ( | ! | i | n | n | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   |   |   |   |   | s | h | o | w | G | e | o | I | n | f | o | ( | s | , |   | i | n | n | ) | ; |  | 
 |   |   |   |   | } | ) | ; |  | 
 |   |   |   |   | g | e | o | S | h | a | p | e | s | . | p | u | s | h | ( | { |  | 
 |   |   |   |   |   |   | e | l | : |   | e | l | , |   | t | y | p | e | : |   | s | h | a | p | e | T | y | p | e | , |   | c | o | l | o | r | : |   | c | o | l | o | r | , |  | 
 |   |   |   |   |   |   | x | : |   | 3 | 0 |   | + |   | ( | i |   | % |   | c | o | l | s | ) |   | * |   | ( | W |   | / |   | c | o | l | s | ) |   | + |   | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | 2 | 0 | , |  | 
 |   |   |   |   |   |   | y | : |   | s | t | a | r | t | Y | , |   | v | x | : |   | ( | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | - |   | 0 | . | 5 | ) |   | * |   | 2 | , |   | v | y | : |   | i | s | N | e | w |   | ? |   | 0 |   | : |   | 0 | , |  | 
 |   |   |   |   |   |   | s | i | z | e | : |   | s | i | z | e | , |   | m | a | s | s | : |   | s | i | z | e |   | / |   | 5 | 0 | , |  | 
 |   |   |   |   |   |   | c | o | m | m | e | n | t | : |   | c | , |   | a | n | g | l | e | : |   | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | M | a | t | h | . | P | I |   | * |   | 2 | , |   | a | v | : |   | ( | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | - |   | 0 | . | 5 | ) |   | * |   | 3 |  | 
 |   |   |   |   | } | ) | ; |  | 
 |   |   | } | ) | ; |  | 
 |   |   |  | 
 |   |   | / | / |   | C | r | e | a | t | e |   | r | i | b | b | o | n |   | d | e | c | o | r | a | t | i | o | n | s |  | 
 |   |   | g | e | o | R | i | b | b | o | n | s |   | = |   | [ | ] | ; |  | 
 |   |   | v | a | r |   | r | i | b | b | o | n | C | o | u | n | t |   | = |   | M | a | t | h | . | m | i | n | ( | 1 | 2 | , |   | 6 |   | + |   | g | b | C | o | m | m | e | n | t | s | . | l | e | n | g | t | h | ) | ; |  | 
 |   |   | f | o | r |   | ( | v | a | r |   | r |   | = |   | 0 | ; |   | r |   | < |   | r | i | b | b | o | n | C | o | u | n | t | ; |   | r | + | + | ) |   | { |  | 
 |   |   |   |   | v | a | r |   | r | E | l |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | ( | ' | d | i | v | ' | ) | ; |  | 
 |   |   |   |   | r | E | l | . | c | l | a | s | s | N | a | m | e |   | = |   | ' | g | e | o | - | r | i | b | b | o | n | ' | ; |  | 
 |   |   |   |   | v | a | r |   | r | C | o | l | o | r |   | = |   | R | I | B | B | O | N | _ | C | O | L | O | R | S | [ | r |   | % |   | R | I | B | B | O | N | _ | C | O | L | O | R | S | . | l | e | n | g | t | h | ] | ; |  | 
 |   |   |   |   | v | a | r |   | r | w |   | = |   | 8 |   | + |   | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | 1 | 2 | ; |  | 
 |   |   |   |   | v | a | r |   | r | h |   | = |   | 4 |   | + |   | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | 8 | ; |  | 
 |   |   |   |   | v | a | r |   | r | x |   | = |   | M | a | t | h | . | f | l | o | o | r | ( | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | 1 | 0 | 0 | ) | ; |  | 
 |   |   |   |   | v | a | r |   | r | y |   | = |   | M | a | t | h | . | f | l | o | o | r | ( | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | 6 | 0 | ) | ; |  | 
 |   |   |   |   | / | / |   | C | r | e | a | t | e |   | w | a | v | y |   | r | i | b | b | o | n |   | e | f | f | e | c | t |   | w | i | t | h |   | b | o | r | d | e | r | - | r | a | d | i | u | s |  | 
 |   |   |   |   | r | E | l | . | s | t | y | l | e | . | c | s | s | T | e | x | t |   | = |   | ' | p | o | s | i | t | i | o | n | : | a | b | s | o | l | u | t | e | ; | w | i | d | t | h | : | ' |   | + |   | r | w |   | + |   | ' | p | x | ; | h | e | i | g | h | t | : | ' |   | + |   | r | h |   | + |   | ' | p | x | ; | b | a | c | k | g | r | o | u | n | d | : | ' |   | + |   | r | C | o | l | o | r |   | + |   | ' | a | a | ; | b | o | r | d | e | r | - | r | a | d | i | u | s | : | ' |   | + |   | r | x |   | + |   | ' | % |   | ' |   | + |   | ( | 1 | 0 | 0 | - | r | x | ) |   | + |   | ' | % |   | ' |   | + |   | r | y |   | + |   | ' | % |   | ' |   | + |   | ( | 1 | 0 | 0 | - | r | y | ) |   | + |   | ' | % |   | / |   | ' |   | + |   | ( | 1 | 0 | 0 | - | r | y | ) |   | + |   | ' | % |   | ' |   | + |   | r | y |   | + |   | ' | % |   | ' |   | + |   | r | x |   | + |   | ' | % |   | ' |   | + |   | ( | 1 | 0 | 0 | - | r | x | ) |   | + |   | ' | % | ; | o | p | a | c | i | t | y | : | 0 | . | 5 | 5 | ; | b | o | x | - | s | h | a | d | o | w | : | 0 |   | 2 | p | x |   | 6 | p | x |   | r | g | b | a | ( | 0 | , | 0 | , | 0 | , | 0 | . | 0 | 4 | ) | , | i | n | s | e | t |   | 0 |   | 1 | p | x |   | 0 |   | r | g | b | a | ( | 2 | 5 | 5 | , | 2 | 5 | 5 | , | 2 | 5 | 5 | , | 0 | . | 2 | ) | ; | z | - | i | n | d | e | x | : | 0 | ; | p | o | i | n | t | e | r | - | e | v | e | n | t | s | : | n | o | n | e | ' | ; |  | 
 |   |   |   |   | i | n | n | e | r | . | a | p | p | e | n | d | C | h | i | l | d | ( | r | E | l | ) | ; |  | 
 |   |   |   |   | g | e | o | R | i | b | b | o | n | s | . | p | u | s | h | ( | { |  | 
 |   |   |   |   |   |   | e | l | : |   | r | E | l | , |  | 
 |   |   |   |   |   |   | x | : |   | 4 | 0 |   | + |   | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | ( | W |   | - |   | 8 | 0 | ) | , |  | 
 |   |   |   |   |   |   | y | : |   | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | H |   | * |   | 0 | . | 7 | , |  | 
 |   |   |   |   |   |   | v | x | : |   | ( | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | - |   | 0 | . | 5 | ) |   | * |   | 1 | . | 5 | , |  | 
 |   |   |   |   |   |   | v | y | : |   | 0 | , |  | 
 |   |   |   |   |   |   | s | i | z | e | : |   | M | a | t | h | . | m | a | x | ( | r | w | , |   | r | h | ) | , |  | 
 |   |   |   |   |   |   | m | a | s | s | : |   | 0 | . | 3 | , |  | 
 |   |   |   |   |   |   | a | n | g | l | e | : |   | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | * |   | M | a | t | h | . | P | I |   | * |   | 2 | , |  | 
 |   |   |   |   |   |   | a | v | : |   | ( | M | a | t | h | . | r | a | n | d | o | m | ( | ) |   | - |   | 0 | . | 5 | ) |   | * |   | 2 |  | 
 |   |   |   |   | } | ) | ; |  | 
 |   |   | } |  | 
 |   |   |  | 
 |   |   | / | / |   | S | e | t |   | p | o | s | i | t | i | o | n | s |  | 
 |   |   | f | u | n | c | t | i | o | n |   | p | l | a | c | e | A | l | l | ( | ) |   | { |  | 
 |   |   |   |   | g | e | o | S | h | a | p | e | s | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | s | ) |   | { |  | 
 |   |   |   |   |   |   | s | . | x |   | = |   | M | a | t | h | . | m | a | x | ( | s | . | s | i | z | e | / | 2 | , |   | M | a | t | h | . | m | i | n | ( | W |   | - |   | s | . | s | i | z | e | / | 2 | , |   | s | . | x | ) | ) | ; |  | 
 |   |   |   |   |   |   | s | . | y |   | = |   | M | a | t | h | . | m | a | x | ( | s | . | s | i | z | e | / | 2 | , |   | M | a | t | h | . | m | i | n | ( | H |   | - |   | s | . | s | i | z | e | / | 2 | , |   | s | . | y | ) | ) | ; |  | 
 |   |   |   |   |   |   | u | p | d | a | t | e | S | h | a | p | e | P | o | s | ( | s | ) | ; |  | 
 |   |   |   |   | } | ) | ; |  | 
 |   |   |   |   | g | e | o | R | i | b | b | o | n | s | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | r | ) |   | { |  | 
 |   |   |   |   |   |   | r | . | x |   | = |   | M | a | t | h | . | m | a | x | ( | r | . | s | i | z | e | / | 2 | , |   | M | a | t | h | . | m | i | n | ( | W |   | - |   | r | . | s | i | z | e | / | 2 | , |   | r | . | x | ) | ) | ; |  | 
 |   |   |   |   |   |   | r | . | y |   | = |   | M | a | t | h | . | m | a | x | ( | r | . | s | i | z | e | / | 2 | , |   | M | a | t | h | . | m | i | n | ( | H |   | - |   | r | . | s | i | z | e | / | 2 | , |   | r | . | y | ) | ) | ; |  | 
 |   |   |   |   |   |   | u | p | d | a | t | e | R | i | b | b | o | n | P | o | s | ( | r | ) | ; |  | 
 |   |   |   |   | } | ) | ; |  | 
 |   |   | } |  | 
 |   |   | p | l | a | c | e | A | l | l | ( | ) | ; |  | 
 |   |   |  | 
 |   |   | g | e | o | L | o | o | p | ( | W | , |   | H | ) | ; |  | 
 | } |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | u | p | d | a | t | e | S | h | a | p | e | P | o | s | ( | s | ) |   | { |  | 
 |   |   | s | . | e | l | . | s | t | y | l | e | . | l | e | f | t |   | = |   | ( | s | . | x |   | - |   | s | . | s | i | z | e | / | 2 | ) |   | + |   | ' | p | x | ' | ; |  | 
 |   |   | s | . | e | l | . | s | t | y | l | e | . | t | o | p |   | = |   | ( | s | . | y |   | - |   | s | . | s | i | z | e | / | 2 | ) |   | + |   | ' | p | x | ' | ; |  | 
 |   |   | s | . | e | l | . | s | t | y | l | e | . | t | r | a | n | s | f | o | r | m |   | = |   | ' | r | o | t | a | t | e | ( | ' |   | + |   | s | . | a | n | g | l | e |   | + |   | ' | r | a | d | ) | ' | ; |  | 
 | } |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | u | p | d | a | t | e | R | i | b | b | o | n | P | o | s | ( | r | ) |   | { |  | 
 |   |   | r | . | e | l | . | s | t | y | l | e | . | l | e | f | t |   | = |   | ( | r | . | x |   | - |   | r | . | s | i | z | e | / | 2 | ) |   | + |   | ' | p | x | ' | ; |  | 
 |   |   | r | . | e | l | . | s | t | y | l | e | . | t | o | p |   | = |   | ( | r | . | y |   | - |   | r | . | s | i | z | e | / | 2 | ) |   | + |   | ' | p | x | ' | ; |  | 
 |   |   | r | . | e | l | . | s | t | y | l | e | . | t | r | a | n | s | f | o | r | m |   | = |   | ' | r | o | t | a | t | e | ( | ' |   | + |   | r | . | a | n | g | l | e |   | + |   | ' | r | a | d | ) | ' | ; |  | 
 | } |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | g | e | o | L | o | o | p | ( | W | , |   | H | ) |   | { |  | 
 |   |   | v | a | r |   | a | l | l | O | b | j | e | c | t | s |   | = |   | g | e | o | S | h | a | p | e | s | . | c | o | n | c | a | t | ( | g | e | o | R | i | b | b | o | n | s | ) | ; |  | 
 |   |   |  | 
 |   |   | / | / |   | P | h | y | s | i | c | s |   | u | p | d | a | t | e |  | 
 |   |   | a | l | l | O | b | j | e | c | t | s | . | f | o | r | E | a | c | h | ( | f | u | n | c | t | i | o | n | ( | s | ) |   | { |  | 
 |   |   |   |   | i | f |   | ( | g | e | o | M | o | u | s | e | . | d | r | a | g |   | = | = | = |   | s | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   |   |   | s | . | v | y |   | + | = |   | 0 | . | 2 | 5 | ; |  | 
 |   |   |   |   | s | . | v | x |   | * | = |   | 0 | . | 9 | 9 | 7 | ; |  | 
 |   |   |   |   | s | . | v | y |   | * | = |   | 0 | . | 9 | 9 | 7 | ; |  | 
 |   |   |   |   | s | . | a | v |   | * | = |   | 0 | . | 9 | 8 | ; |  | 
 |   |   |   |   | s | . | x |   | + | = |   | s | . | v | x | ; |  | 
 |   |   |   |   | s | . | y |   | + | = |   | s | . | v | y | ; |  | 
 |   |   |   |   | s | . | a | n | g | l | e |   | + | = |   | s | . | a | v | ; |  | 
 |   |   |   |   |  | 
 |   |   |   |   | v | a | r |   | r |   | = |   | s | . | s | i | z | e |   | / |   | 2 | ; |  | 
 |   |   |   |   | i | f |   | ( | s | . | x |   | - |   | r |   | < |   | 0 | ) |   | { |   | s | . | x |   | = |   | r | ; |   | s | . | v | x |   | = |   | M | a | t | h | . | a | b | s | ( | s | . | v | x | ) |   | * |   | 0 | . | 5 | ; |   | s | . | a | v |   | + | = |   | s | . | v | y |   | * |   | 0 | . | 0 | 2 | ; |   | } |  | 
 |   |   |   |   | i | f |   | ( | s | . | x |   | + |   | r |   | > |   | W | ) |   | { |   | s | . | x |   | = |   | W |   | - |   | r | ; |   | s | . | v | x |   | = |   | - | M | a | t | h | . | a | b | s | ( | s | . | v | x | ) |   | * |   | 0 | . | 5 | ; |   | s | . | a | v |   | - | = |   | s | . | v | y |   | * |   | 0 | . | 0 | 2 | ; |   | } |  | 
 |   |   |   |   | i | f |   | ( | s | . | y |   | - |   | r |   | < |   | 0 | ) |   | { |   | s | . | y |   | = |   | r | ; |   | s | . | v | y |   | = |   | M | a | t | h | . | a | b | s | ( | s | . | v | y | ) |   | * |   | 0 | . | 5 | ; |   | s | . | a | v |   | + | = |   | s | . | v | x |   | * |   | 0 | . | 0 | 2 | ; |   | } |  | 
 |   |   |   |   | i | f |   | ( | s | . | y |   | + |   | r |   | > |   | H | ) |   | { |   | s | . | y |   | = |   | H |   | - |   | r | ; |   | s | . | v | y |   | = |   | - | M | a | t | h | . | a | b | s | ( | s | . | v | y | ) |   | * |   | 0 | . | 3 | 5 | ; |   | s | . | v | x |   | * | = |   | 0 | . | 8 | 5 | ; |   | s | . | a | v |   | - | = |   | s | . | v | x |   | * |   | 0 | . | 0 | 2 | ; |   | } |  | 
 |   |   |   |   |  | 
 |   |   |   |   | i | f |   | ( | s | . | e | l | . | c | l | a | s | s | L | i | s | t | . | c | o | n | t | a | i | n | s | ( | ' | g | e | o | - | s | h | a | p | e | ' | ) | ) |   | u | p | d | a | t | e | S | h | a | p | e | P | o | s | ( | s | ) | ; |  | 
 |   |   |   |   | e | l | s | e |   | u | p | d | a | t | e | R | i | b | b | o | n | P | o | s | ( | s | ) | ; |  | 
 |   |   | } | ) | ; |  | 
 |   |   |  | 
 |   |   | / | / |   | C | o | l | l | i | s | i | o | n |   | b | e | t | w | e | e | n |   | a | l | l |   | o | b | j | e | c | t | s |  | 
 |   |   | f | o | r |   | ( | v | a | r |   | i |   | = |   | 0 | ; |   | i |   | < |   | a | l | l | O | b | j | e | c | t | s | . | l | e | n | g | t | h | ; |   | i | + | + | ) |   | { |  | 
 |   |   |   |   | f | o | r |   | ( | v | a | r |   | j |   | = |   | i |   | + |   | 1 | ; |   | j |   | < |   | a | l | l | O | b | j | e | c | t | s | . | l | e | n | g | t | h | ; |   | j | + | + | ) |   | { |  | 
 |   |   |   |   |   |   | v | a | r |   | a |   | = |   | a | l | l | O | b | j | e | c | t | s | [ | i | ] | , |   | b |   | = |   | a | l | l | O | b | j | e | c | t | s | [ | j | ] | ; |  | 
 |   |   |   |   |   |   | i | f |   | ( | g | e | o | M | o | u | s | e | . | d | r | a | g |   | = | = | = |   | a |   | | | | |   | g | e | o | M | o | u | s | e | . | d | r | a | g |   | = | = | = |   | b | ) |   | c | o | n | t | i | n | u | e | ; |  | 
 |   |   |   |   |   |   | v | a | r |   | d | x |   | = |   | b | . | x |   | - |   | a | . | x | , |   | d | y |   | = |   | b | . | y |   | - |   | a | . | y | ; |  | 
 |   |   |   |   |   |   | v | a | r |   | d | i | s | t |   | = |   | M | a | t | h | . | s | q | r | t | ( | d | x | * | d | x |   | + |   | d | y | * | d | y | ) | ; |  | 
 |   |   |   |   |   |   | v | a | r |   | m | i | n | D | i | s | t |   | = |   | ( | a | . | s | i | z | e |   | + |   | b | . | s | i | z | e | ) |   | / |   | 2 | ; |  | 
 |   |   |   |   |   |   | i | f |   | ( | d | i | s | t |   | < |   | m | i | n | D | i | s | t |   | & | & |   | d | i | s | t |   | > |   | 0 | . | 0 | 1 | ) |   | { |  | 
 |   |   |   |   |   |   |   |   | v | a | r |   | n | x |   | = |   | d | x |   | / |   | d | i | s | t | , |   | n | y |   | = |   | d | y |   | / |   | d | i | s | t | ; |  | 
 |   |   |   |   |   |   |   |   | v | a | r |   | o | v | e | r | l | a | p |   | = |   | m | i | n | D | i | s | t |   | - |   | d | i | s | t | ; |  | 
 |   |   |   |   |   |   |   |   | v | a | r |   | t | o | t | a | l | M | a | s | s |   | = |   | a | . | m | a | s | s |   | + |   | b | . | m | a | s | s | ; |  | 
 |   |   |   |   |   |   |   |   | a | . | x |   | - | = |   | n | x |   | * |   | o | v | e | r | l | a | p |   | * |   | ( | b | . | m | a | s | s |   | / |   | t | o | t | a | l | M | a | s | s | ) | ; |  | 
 |   |   |   |   |   |   |   |   | a | . | y |   | - | = |   | n | y |   | * |   | o | v | e | r | l | a | p |   | * |   | ( | b | . | m | a | s | s |   | / |   | t | o | t | a | l | M | a | s | s | ) | ; |  | 
 |   |   |   |   |   |   |   |   | b | . | x |   | + | = |   | n | x |   | * |   | o | v | e | r | l | a | p |   | * |   | ( | a | . | m | a | s | s |   | / |   | t | o | t | a | l | M | a | s | s | ) | ; |  | 
 |   |   |   |   |   |   |   |   | b | . | y |   | + | = |   | n | y |   | * |   | o | v | e | r | l | a | p |   | * |   | ( | a | . | m | a | s | s |   | / |   | t | o | t | a | l | M | a | s | s | ) | ; |  | 
 |   |   |   |   |   |   |   |   | v | a | r |   | d | v | x |   | = |   | a | . | v | x |   | - |   | b | . | v | x | , |   | d | v | y |   | = |   | a | . | v | y |   | - |   | b | . | v | y | ; |  | 
 |   |   |   |   |   |   |   |   | v | a | r |   | d | v | n |   | = |   | d | v | x |   | * |   | n | x |   | + |   | d | v | y |   | * |   | n | y | ; |  | 
 |   |   |   |   |   |   |   |   | i | f |   | ( | d | v | n |   | > |   | 0 | ) |   | { |  | 
 |   |   |   |   |   |   |   |   |   |   | v | a | r |   | i | m | p |   | = |   | 1 | . | 8 |   | * |   | d | v | n |   | / |   | t | o | t | a | l | M | a | s | s | ; |  | 
 |   |   |   |   |   |   |   |   |   |   | a | . | v | x |   | - | = |   | i | m | p |   | * |   | b | . | m | a | s | s |   | * |   | n | x | ; |   | a | . | v | y |   | - | = |   | i | m | p |   | * |   | b | . | m | a | s | s |   | * |   | n | y | ; |  | 
 |   |   |   |   |   |   |   |   |   |   | b | . | v | x |   | + | = |   | i | m | p |   | * |   | a | . | m | a | s | s |   | * |   | n | x | ; |   | b | . | v | y |   | + | = |   | i | m | p |   | * |   | a | . | m | a | s | s |   | * |   | n | y | ; |  | 
 |   |   |   |   |   |   |   |   |   |   | a | . | a | v |   | + | = |   | ( | b | . | v | y |   | - |   | a | . | v | y | ) |   | * |   | 0 | . | 0 | 2 | ; |   | b | . | a | v |   | + | = |   | ( | a | . | v | y |   | - |   | b | . | v | y | ) |   | * |   | 0 | . | 0 | 2 | ; |  | 
 |   |   |   |   |   |   |   |   | } |  | 
 |   |   |   |   |   |   |   |   | i | f |   | ( | a | . | e | l | . | c | l | a | s | s | L | i | s | t | . | c | o | n | t | a | i | n | s | ( | ' | g | e | o | - | s | h | a | p | e | ' | ) | ) |   | u | p | d | a | t | e | S | h | a | p | e | P | o | s | ( | a | ) | ; |  | 
 |   |   |   |   |   |   |   |   | e | l | s | e |   | u | p | d | a | t | e | R | i | b | b | o | n | P | o | s | ( | a | ) | ; |  | 
 |   |   |   |   |   |   |   |   | i | f |   | ( | b | . | e | l | . | c | l | a | s | s | L | i | s | t | . | c | o | n | t | a | i | n | s | ( | ' | g | e | o | - | s | h | a | p | e | ' | ) | ) |   | u | p | d | a | t | e | S | h | a | p | e | P | o | s | ( | b | ) | ; |  | 
 |   |   |   |   |   |   |   |   | e | l | s | e |   | u | p | d | a | t | e | R | i | b | b | o | n | P | o | s | ( | b | ) | ; |  | 
 |   |   |   |   |   |   | } |  | 
 |   |   |   |   | } |  | 
 |   |   | } |  | 
 |   |   |  | 
 |   |   | g | e | o | A | n | i | m | I | d |   | = |   | r | e | q | u | e | s | t | A | n | i | m | a | t | i | o | n | F | r | a | m | e | ( | f | u | n | c | t | i | o | n | ( | ) |   | { |   | g | e | o | L | o | o | p | ( | W | , |   | H | ) | ; |   | } | ) | ; |  | 
 | } |  | 
 |  | 
 | / | / |   | M | o | u | s | e |   | e | v | e | n | t | s |   | f | o | r |   | d | r | a | g |  | 
 | d | o | c | u | m | e | n | t | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | ' | m | o | u | s | e | d | o | w | n | ' | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { |  | 
 |   |   | v | a | r |   | c | o | n | t | a | i | n | e | r |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | [ | d | a | t | a | - | g | e | o | ] |   | . | g | e | o | - | i | n | n | e | r | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | c | o | n | t | a | i | n | e | r | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | v | a | r |   | t | a | r | g | e | t |   | = |   | e | . | t | a | r | g | e | t | . | c | l | o | s | e | s | t | ( | ' | . | g | e | o | - | s | h | a | p | e | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | t | a | r | g | e | t | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | e | . | p | r | e | v | e | n | t | D | e | f | a | u | l | t | ( | ) | ; |  | 
 |   |   | v | a | r |   | i | d | x |   | = |   | p | a | r | s | e | I | n | t | ( | t | a | r | g | e | t | . | g | e | t | A | t | t | r | i | b | u | t | e | ( | ' | d | a | t | a | - | i | d | x | ' | ) | ) | ; |  | 
 |   |   | v | a | r |   | s | h | a | p | e |   | = |   | g | e | o | S | h | a | p | e | s | [ | i | d | x | ] | ; |  | 
 |   |   | i | f |   | ( | ! | s | h | a | p | e | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | v | a | r |   | r | e | c | t |   | = |   | c | o | n | t | a | i | n | e | r | . | g | e | t | B | o | u | n | d | i | n | g | C | l | i | e | n | t | R | e | c | t | ( | ) | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | d | o | w | n |   | = |   | t | r | u | e | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | d | r | a | g |   | = |   | s | h | a | p | e | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | i | s | R | i | b | b | o | n |   | = |   | f | a | l | s | e | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | o | x |   | = |   | e | . | c | l | i | e | n | t | X |   | - |   | r | e | c | t | . | l | e | f | t |   | - |   | s | h | a | p | e | . | x | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | o | y |   | = |   | e | . | c | l | i | e | n | t | Y |   | - |   | r | e | c | t | . | t | o | p |   | - |   | s | h | a | p | e | . | y | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | s | t | a | r | t | X |   | = |   | s | h | a | p | e | . | x | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | s | t | a | r | t | Y |   | = |   | s | h | a | p | e | . | y | ; |  | 
 |   |   | s | h | a | p | e | . | e | l | . | s | t | y | l | e | . | z | I | n | d | e | x |   | = |   | 1 | 0 | ; |  | 
 |   |   | s | h | a | p | e | . | e | l | . | s | t | y | l | e | . | t | r | a | n | s | i | t | i | o | n |   | = |   | ' | n | o | n | e | ' | ; |  | 
 |   |   | c | o | n | t | a | i | n | e | r | . | s | t | y | l | e | . | c | u | r | s | o | r |   | = |   | ' | g | r | a | b | b | i | n | g | ' | ; |  | 
 | } | ) | ; |  | 
 |  | 
 | d | o | c | u | m | e | n | t | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | ' | m | o | u | s | e | m | o | v | e | ' | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { |  | 
 |   |   | v | a | r |   | i | n | n | e | r |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | [ | d | a | t | a | - | g | e | o | ] |   | . | g | e | o | - | i | n | n | e | r | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | i | n | n | e | r | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | v | a | r |   | r | e | c | t |   | = |   | i | n | n | e | r | . | g | e | t | B | o | u | n | d | i | n | g | C | l | i | e | n | t | R | e | c | t | ( | ) | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | x |   | = |   | e | . | c | l | i | e | n | t | X |   | - |   | r | e | c | t | . | l | e | f | t | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | y |   | = |   | e | . | c | l | i | e | n | t | Y |   | - |   | r | e | c | t | . | t | o | p | ; |  | 
 |   |   | i | f |   | ( | g | e | o | M | o | u | s | e | . | d | r | a | g |   | & | & |   | g | e | o | M | o | u | s | e | . | d | o | w | n | ) |   | { |  | 
 |   |   |   |   | v | a | r |   | s | h | a | p | e |   | = |   | g | e | o | M | o | u | s | e | . | d | r | a | g | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | v | x |   | = |   | ( | g | e | o | M | o | u | s | e | . | x |   | - |   | s | h | a | p | e | . | x |   | - |   | g | e | o | M | o | u | s | e | . | o | x | ) |   | * |   | 0 | . | 8 | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | v | y |   | = |   | ( | g | e | o | M | o | u | s | e | . | y |   | - |   | s | h | a | p | e | . | y |   | - |   | g | e | o | M | o | u | s | e | . | o | y | ) |   | * |   | 0 | . | 8 | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | x |   | = |   | g | e | o | M | o | u | s | e | . | x |   | - |   | g | e | o | M | o | u | s | e | . | o | x | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | y |   | = |   | g | e | o | M | o | u | s | e | . | y |   | - |   | g | e | o | M | o | u | s | e | . | o | y | ; |  | 
 |   |   |   |   | u | p | d | a | t | e | S | h | a | p | e | P | o | s | ( | s | h | a | p | e | ) | ; |  | 
 |   |   | } |  | 
 | } | ) | ; |  | 
 |  | 
 | d | o | c | u | m | e | n | t | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | ' | m | o | u | s | e | u | p | ' | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { |  | 
 |   |   | v | a | r |   | i | n | n | e | r |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | [ | d | a | t | a | - | g | e | o | ] |   | . | g | e | o | - | i | n | n | e | r | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | i | n | n | e | r | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | i | f |   | ( | g | e | o | M | o | u | s | e | . | d | r | a | g |   | & | & |   | g | e | o | M | o | u | s | e | . | d | o | w | n | ) |   | { |  | 
 |   |   |   |   | v | a | r |   | s | h | a | p | e |   | = |   | g | e | o | M | o | u | s | e | . | d | r | a | g | ; |  | 
 |   |   |   |   | s | h | o | w | G | e | o | I | n | f | o | ( | s | h | a | p | e | , |   | i | n | n | e | r | ) | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | e | l | . | s | t | y | l | e | . | z | I | n | d | e | x |   | = |   | 1 | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | e | l | . | s | t | y | l | e | . | t | r | a | n | s | i | t | i | o | n |   | = |   | ' | t | r | a | n | s | f | o | r | m |   | 0 | . | 1 | s | ' | ; |  | 
 |   |   |   |   | i | n | n | e | r | . | s | t | y | l | e | . | c | u | r | s | o | r |   | = |   | ' | g | r | a | b | ' | ; |  | 
 |   |   | } |  | 
 |   |   | g | e | o | M | o | u | s | e | . | d | o | w | n |   | = |   | f | a | l | s | e | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | d | r | a | g |   | = |   | n | u | l | l | ; |  | 
 | } | ) | ; |  | 
 |  | 
 | / | / |   | T | o | u | c | h |   | e | v | e | n | t | s |  | 
 | d | o | c | u | m | e | n | t | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | ' | t | o | u | c | h | s | t | a | r | t | ' | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { |  | 
 |   |   | v | a | r |   | i | n | n | e | r |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | [ | d | a | t | a | - | g | e | o | ] |   | . | g | e | o | - | i | n | n | e | r | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | i | n | n | e | r | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | v | a | r |   | t | a | r | g | e | t |   | = |   | e | . | t | a | r | g | e | t | . | c | l | o | s | e | s | t | ( | ' | . | g | e | o | - | s | h | a | p | e | ' | ) | ; |  | 
 |   |   | i | f |   | ( | ! | t | a | r | g | e | t | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | e | . | p | r | e | v | e | n | t | D | e | f | a | u | l | t | ( | ) | ; |  | 
 |   |   | v | a | r |   | i | d | x |   | = |   | p | a | r | s | e | I | n | t | ( | t | a | r | g | e | t | . | g | e | t | A | t | t | r | i | b | u | t | e | ( | ' | d | a | t | a | - | i | d | x | ' | ) | ) | ; |  | 
 |   |   | v | a | r |   | s | h | a | p | e |   | = |   | g | e | o | S | h | a | p | e | s | [ | i | d | x | ] | ; |  | 
 |   |   | i | f |   | ( | ! | s | h | a | p | e | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | v | a | r |   | r | e | c | t |   | = |   | i | n | n | e | r | . | g | e | t | B | o | u | n | d | i | n | g | C | l | i | e | n | t | R | e | c | t | ( | ) | ; |  | 
 |   |   | v | a | r |   | t | o | u | c | h |   | = |   | e | . | t | o | u | c | h | e | s | [ | 0 | ] | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | d | o | w | n |   | = |   | t | r | u | e | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | d | r | a | g |   | = |   | s | h | a | p | e | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | i | s | R | i | b | b | o | n |   | = |   | f | a | l | s | e | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | o | x |   | = |   | t | o | u | c | h | . | c | l | i | e | n | t | X |   | - |   | r | e | c | t | . | l | e | f | t |   | - |   | s | h | a | p | e | . | x | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | o | y |   | = |   | t | o | u | c | h | . | c | l | i | e | n | t | Y |   | - |   | r | e | c | t | . | t | o | p |   | - |   | s | h | a | p | e | . | y | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | s | t | a | r | t | X |   | = |   | s | h | a | p | e | . | x | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | s | t | a | r | t | Y |   | = |   | s | h | a | p | e | . | y | ; |  | 
 |   |   | s | h | a | p | e | . | e | l | . | s | t | y | l | e | . | z | I | n | d | e | x |   | = |   | 1 | 0 | ; |  | 
 |   |   | s | h | a | p | e | . | e | l | . | s | t | y | l | e | . | t | r | a | n | s | i | t | i | o | n |   | = |   | ' | n | o | n | e | ' | ; |  | 
 | } | , |   | { |   | p | a | s | s | i | v | e | : |   | f | a | l | s | e |   | } | ) | ; |  | 
 |  | 
 | d | o | c | u | m | e | n | t | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | ' | t | o | u | c | h | m | o | v | e | ' | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { |  | 
 |   |   | i | f |   | ( | g | e | o | M | o | u | s | e | . | d | r | a | g |   | & | & |   | g | e | o | M | o | u | s | e | . | d | o | w | n | ) |   | { |  | 
 |   |   |   |   | e | . | p | r | e | v | e | n | t | D | e | f | a | u | l | t | ( | ) | ; |  | 
 |   |   |   |   | v | a | r |   | i | n | n | e | r |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | [ | d | a | t | a | - | g | e | o | ] |   | . | g | e | o | - | i | n | n | e | r | ' | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | ! | i | n | n | e | r | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   |   |   | v | a | r |   | r | e | c | t |   | = |   | i | n | n | e | r | . | g | e | t | B | o | u | n | d | i | n | g | C | l | i | e | n | t | R | e | c | t | ( | ) | ; |  | 
 |   |   |   |   | v | a | r |   | t | o | u | c | h |   | = |   | e | . | t | o | u | c | h | e | s | [ | 0 | ] | ; |  | 
 |   |   |   |   | v | a | r |   | s | h | a | p | e |   | = |   | g | e | o | M | o | u | s | e | . | d | r | a | g | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | v | x |   | = |   | ( | t | o | u | c | h | . | c | l | i | e | n | t | X |   | - |   | r | e | c | t | . | l | e | f | t |   | - |   | s | h | a | p | e | . | x |   | - |   | g | e | o | M | o | u | s | e | . | o | x | ) |   | * |   | 0 | . | 8 | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | v | y |   | = |   | ( | t | o | u | c | h | . | c | l | i | e | n | t | Y |   | - |   | r | e | c | t | . | t | o | p |   | - |   | s | h | a | p | e | . | y |   | - |   | g | e | o | M | o | u | s | e | . | o | y | ) |   | * |   | 0 | . | 8 | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | x |   | = |   | t | o | u | c | h | . | c | l | i | e | n | t | X |   | - |   | r | e | c | t | . | l | e | f | t |   | - |   | g | e | o | M | o | u | s | e | . | o | x | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | y |   | = |   | t | o | u | c | h | . | c | l | i | e | n | t | Y |   | - |   | r | e | c | t | . | t | o | p |   | - |   | g | e | o | M | o | u | s | e | . | o | y | ; |  | 
 |   |   |   |   | u | p | d | a | t | e | S | h | a | p | e | P | o | s | ( | s | h | a | p | e | ) | ; |  | 
 |   |   | } |  | 
 | } | , |   | { |   | p | a | s | s | i | v | e | : |   | f | a | l | s | e |   | } | ) | ; |  | 
 |  | 
 | d | o | c | u | m | e | n | t | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | ' | t | o | u | c | h | e | n | d | ' | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { |  | 
 |   |   | i | f |   | ( | g | e | o | M | o | u | s | e | . | d | r | a | g |   | & | & |   | g | e | o | M | o | u | s | e | . | d | o | w | n | ) |   | { |  | 
 |   |   |   |   | v | a | r |   | s | h | a | p | e |   | = |   | g | e | o | M | o | u | s | e | . | d | r | a | g | ; |  | 
 |   |   |   |   | v | a | r |   | i | n | n | e | r |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | [ | d | a | t | a | - | g | e | o | ] |   | . | g | e | o | - | i | n | n | e | r | ' | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | i | n | n | e | r | ) |   | s | h | o | w | G | e | o | I | n | f | o | ( | s | h | a | p | e | , |   | i | n | n | e | r | ) | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | e | l | . | s | t | y | l | e | . | z | I | n | d | e | x |   | = |   | 1 | ; |  | 
 |   |   |   |   | s | h | a | p | e | . | e | l | . | s | t | y | l | e | . | t | r | a | n | s | i | t | i | o | n |   | = |   | ' | t | r | a | n | s | f | o | r | m |   | 0 | . | 1 | s | ' | ; |  | 
 |   |   | } |  | 
 |   |   | g | e | o | M | o | u | s | e | . | d | o | w | n |   | = |   | f | a | l | s | e | ; |  | 
 |   |   | g | e | o | M | o | u | s | e | . | d | r | a | g |   | = |   | n | u | l | l | ; |  | 
 | } | ) | ; |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | s | h | o | w | G | e | o | I | n | f | o | ( | s | h | a | p | e | , |   | i | n | n | e | r | ) |   | { |  | 
 |   |   | / | / |   | R | e | m | o | v | e |   | a | n | y |   | e | x | i | s | t | i | n | g |   | p | o | p | u | p |  | 
 |   |   | v | a | r |   | e | x | i | s | t | i | n | g |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | g | e | o | - | p | o | p | u | p | - | o | n | ' | ) | ; |  | 
 |   |   | i | f |   | ( | e | x | i | s | t | i | n | g | ) |   | e | x | i | s | t | i | n | g | . | p | a | r | e | n | t | E | l | e | m | e | n | t | . | r | e | m | o | v | e | C | h | i | l | d | ( | e | x | i | s | t | i | n | g | ) | ; |  | 
 |   |   |  | 
 |   |   | v | a | r |   | c |   | = |   | s | h | a | p | e | . | c | o | m | m | e | n | t | ; |  | 
 |   |   | v | a | r |   | p | o | p | u | p |   | = |   | d | o | c | u | m | e | n | t | . | c | r | e | a | t | e | E | l | e | m | e | n | t | ( | ' | d | i | v | ' | ) | ; |  | 
 |   |   | p | o | p | u | p | . | c | l | a | s | s | N | a | m | e |   | = |   | ' | g | e | o | - | p | o | p | u | p | - | o | n | ' | ; |  | 
 |   |   | p | o | p | u | p | . | i | n | n | e | r | H | T | M | L |   | = |   | ' | < | b | u | t | t | o | n |   | c | l | a | s | s | = | " | g | e | o | - | p | o | p | u | p | - | c | l | o | s | e | " |   | o | n | c | l | i | c | k | = | " | t | h | i | s | . | p | a | r | e | n | t | E | l | e | m | e | n | t | . | r | e | m | o | v | e | ( | ) | " | > | 脳 | < | / | b | u | t | t | o | n | > | < | s | t | r | o | n | g |   | s | t | y | l | e | = | " | c | o | l | o | r | : | ' |   | + |   | s | h | a | p | e | . | c | o | l | o | r |   | + |   | ' | " | > | ' |   | + |   | ( | c | . | n | a | m | e |   | | | | |   | ' | 匿 | 名 | ' | ) |   | + |   | ' | < | / | s | t | r | o | n | g | > | < | s | p | a | n |   | s | t | y | l | e | = | " | f | o | n | t | - | s | i | z | e | : | 0 | . | 7 | r | e | m | ; | c | o | l | o | r | : | # | a | a | a | ; | m | a | r | g | i | n | - | l | e | f | t | : | 0 | . | 5 | r | e | m | " | > | ' |   | + |   | ( | c | . | d | a | t | e |   | | | | |   | ' | ' | ) |   | + |   | ' | < | / | s | p | a | n | > | < | p |   | s | t | y | l | e | = | " | m | a | r | g | i | n | - | t | o | p | : | 0 | . | 6 | r | e | m | ; | l | i | n | e | - | h | e | i | g | h | t | : | 1 | . | 7 | " | > | ' |   | + |   | ( | c | . | t | e | x | t |   | | | | |   | ' | ' | ) | . | r | e | p | l | a | c | e | ( | / | < | / | g | , |   | ' | & | l | t | ; | ' | ) | . | r | e | p | l | a | c | e | ( | / | \ | n | / | g | , |   | ' | < | b | r | > | ' | ) |   | + |   | ' | < | / | p | > | ' | ; |  | 
 |   |   | p | o | p | u | p | . | s | t | y | l | e | . | c | s | s | T | e | x | t |   | = |   | ' | p | o | s | i | t | i | o | n | : | a | b | s | o | l | u | t | e | ; | w | i | d | t | h | : | 2 | 4 | 0 | p | x | ; | b | a | c | k | g | r | o | u | n | d | : | r | g | b | a | ( | 3 | 0 | , | 3 | 5 | , | 5 | 0 | , | 0 | . | 9 | 4 | ) | ; | b | a | c | k | d | r | o | p | - | f | i | l | t | e | r | : | b | l | u | r | ( | 1 | 6 | p | x | ) | ; | - | w | e | b | k | i | t | - | b | a | c | k | d | r | o | p | - | f | i | l | t | e | r | : | b | l | u | r | ( | 1 | 6 | p | x | ) | ; | b | o | r | d | e | r | - | r | a | d | i | u | s | : | 1 | 4 | p | x | ; | b | o | r | d | e | r | : | 1 | p | x |   | s | o | l | i | d |   | r | g | b | a | ( | 2 | 5 | 5 | , | 2 | 5 | 5 | , | 2 | 5 | 5 | , | 0 | . | 1 | 2 | ) | ; | b | o | x | - | s | h | a | d | o | w | : | 0 |   | 1 | 2 | p | x |   | 4 | 0 | p | x |   | r | g | b | a | ( | 0 | , | 0 | , | 0 | , | 0 | . | 3 | ) | ; | p | a | d | d | i | n | g | : | 1 | . | 2 | r | e | m | ; | z | - | i | n | d | e | x | : | 9 | 9 | 9 | 9 | ; | f | o | n | t | - | s | i | z | e | : | 0 | . | 8 | 5 | r | e | m | ; | c | o | l | o | r | : | # | e | 0 | e | 4 | e | c | ; | p | o | i | n | t | e | r | - | e | v | e | n | t | s | : | a | u | t | o | ' | ; |  | 
 |   |   |  | 
 |   |   | v | a | r |   | r | e | c | t |   | = |   | i | n | n | e | r | . | g | e | t | B | o | u | n | d | i | n | g | C | l | i | e | n | t | R | e | c | t | ( | ) | ; |  | 
 |   |   | v | a | r |   | t | o | p |   | = |   | s | h | a | p | e | . | y |   | + |   | s | h | a | p | e | . | s | i | z | e | / | 2 |   | + |   | 5 | ; |  | 
 |   |   | v | a | r |   | l | e | f | t |   | = |   | M | a | t | h | . | m | a | x | ( | 1 | 0 | , |   | M | a | t | h | . | m | i | n | ( | r | e | c | t | . | w | i | d | t | h |   | - |   | 2 | 6 | 0 | , |   | s | h | a | p | e | . | x |   | - |   | 1 | 2 | 0 | ) | ) | ; |  | 
 |   |   | v | a | r |   | m | a | x | H |   | = |   | i | n | n | e | r | . | c | l | i | e | n | t | H | e | i | g | h | t |   | | | | |   | 4 | 2 | 0 | ; |  | 
 |   |   | i | f |   | ( | t | o | p |   | + |   | 1 | 5 | 0 |   | > |   | m | a | x | H | ) |   | t | o | p |   | = |   | s | h | a | p | e | . | y |   | - |   | 1 | 5 | 0 | ; |  | 
 |   |   | i | f |   | ( | t | o | p |   | < |   | 0 | ) |   | t | o | p |   | = |   | 1 | 0 | ; |  | 
 |   |   | p | o | p | u | p | . | s | t | y | l | e | . | t | o | p |   | = |   | t | o | p |   | + |   | ' | p | x | ' | ; |  | 
 |   |   | p | o | p | u | p | . | s | t | y | l | e | . | l | e | f | t |   | = |   | l | e | f | t |   | + |   | ' | p | x | ' | ; |  | 
 |   |   |  | 
 |   |   | i | n | n | e | r | . | a | p | p | e | n | d | C | h | i | l | d | ( | p | o | p | u | p | ) | ; |  | 
 |   |   | / | / |   | A | u | t | o | - | r | e | m | o | v | e |   | a | f | t | e | r |   | 8 |   | s | e | c | o | n | d | s |  | 
 |   |   | s | e | t | T | i | m | e | o | u | t | ( | f | u | n | c | t | i | o | n | ( | ) |   | { |   | i | f |   | ( | p | o | p | u | p | . | p | a | r | e | n | t | E | l | e | m | e | n | t | ) |   | p | o | p | u | p | . | r | e | m | o | v | e | ( | ) | ; |   | } | , |   | 8 | 0 | 0 | 0 | ) | ; |  | 
 | } | a | s | y | n | c |   | f | u | n | c | t | i | o | n |   | s | u | b | m | i | t | G | u | e | s | t | b | o | o | k | ( | n | a | m | e | , |   | t | e | x | t | ) |   | { |  | 
 |   |   | v | a | r |   | c | o | m | m | e | n | t |   | = |   | { |   | n | a | m | e | : |   | n | a | m | e | , |   | t | e | x | t | : |   | t | e | x | t | , |   | d | a | t | e | : |   | n | e | w |   | D | a | t | e | ( | ) | . | t | o | I | S | O | S | t | r | i | n | g | ( | ) | . | s | l | i | c | e | ( | 0 | , |   | 1 | 0 | ) |   | } | ; |  | 
 |   |   | g | b | C | o | m | m | e | n | t | s | . | u | n | s | h | i | f | t | ( | c | o | m | m | e | n | t | ) | ; |  | 
 |   |   | g | e | o | N | e | w | I | d | x |   | = |   | 0 | ; |  | 
 |   |   | r | e | n | d | e | r | G | e | o | G | u | e | s | t | b | o | o | k | ( | ) | ; |  | 
 |   |   | g | e | o | N | e | w | I | d | x |   | = |   | - | 1 | ; |  | 
 |   |   |  | 
 |   |   | t | r | y |   | { |  | 
 |   |   |   |   | v | a | r |   | g | e | t | R | e | s | p |   | = |   | a | w | a | i | t |   | f | e | t | c | h | ( | " | h | t | t | p | s | : | / | / | a | p | i | . | g | i | t | h | u | b | . | c | o | m | / | r | e | p | o | s | / | L | a | t | t | e | 7 | - | 9 | / | l | a | t | t | e | - | s | i | t | e | / | c | o | n | t | e | n | t | s | / | d | a | t | a | / | c | o | m | m | e | n | t | s | . | j | s | o | n | " | , |   | { |  | 
 |   |   |   |   |   |   | h | e | a | d | e | r | s | : |   | { |   | A | u | t | h | o | r | i | z | a | t | i | o | n | : |   | " | B | e | a | r | e | r |   | " |   | + |   | G | B | _ | T | O | K | E | N |   | } |  | 
 |   |   |   |   | } | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | ! | g | e | t | R | e | s | p | . | o | k | ) |   | t | h | r | o | w |   | n | e | w |   | E | r | r | o | r | ( | " | f | e | t | c | h |   | f | a | i | l | e | d | " | ) | ; |  | 
 |   |   |   |   | v | a | r |   | g | e | t | J | s | o | n |   | = |   | a | w | a | i | t |   | g | e | t | R | e | s | p | . | j | s | o | n | ( | ) | ; |  | 
 |   |   |   |   | v | a | r |   | e | x | i | s | t | i | n | g |   | = |   | J | S | O | N | . | p | a | r | s | e | ( | d | e | c | o | d | e | U | R | I | C | o | m | p | o | n | e | n | t | ( | e | s | c | a | p | e | ( | a | t | o | b | ( | g | e | t | J | s | o | n | . | c | o | n | t | e | n | t | . | r | e | p | l | a | c | e | ( | / | \ | s | / | g | , |   | " | " | ) | ) | ) | ) | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | ! | A | r | r | a | y | . | i | s | A | r | r | a | y | ( | e | x | i | s | t | i | n | g | ) | ) |   | e | x | i | s | t | i | n | g |   | = |   | [ | ] | ; |  | 
 |   |   |   |   | e | x | i | s | t | i | n | g | . | u | n | s | h | i | f | t | ( | c | o | m | m | e | n | t | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | e | x | i | s | t | i | n | g | . | l | e | n | g | t | h |   | > |   | 1 | 0 | 0 | ) |   | e | x | i | s | t | i | n | g |   | = |   | e | x | i | s | t | i | n | g | . | s | l | i | c | e | ( | 0 | , |   | 1 | 0 | 0 | ) | ; |  | 
 |   |   |   |   | v | a | r |   | c | o | n | t | e | n | t |   | = |   | b | t | o | a | ( | u | n | e | s | c | a | p | e | ( | e | n | c | o | d | e | U | R | I | C | o | m | p | o | n | e | n | t | ( | J | S | O | N | . | s | t | r | i | n | g | i | f | y | ( | e | x | i | s | t | i | n | g | , |   | n | u | l | l | , |   | 2 | ) | ) | ) | ) | ; |  | 
 |   |   |   |   | a | w | a | i | t |   | f | e | t | c | h | ( | " | h | t | t | p | s | : | / | / | a | p | i | . | g | i | t | h | u | b | . | c | o | m | / | r | e | p | o | s | / | L | a | t | t | e | 7 | - | 9 | / | l | a | t | t | e | - | s | i | t | e | / | c | o | n | t | e | n | t | s | / | d | a | t | a | / | c | o | m | m | e | n | t | s | . | j | s | o | n | " | , |   | { |  | 
 |   |   |   |   |   |   | m | e | t | h | o | d | : |   | " | P | U | T | " | , |  | 
 |   |   |   |   |   |   | h | e | a | d | e | r | s | : |   | { |   | A | u | t | h | o | r | i | z | a | t | i | o | n | : |   | " | B | e | a | r | e | r |   | " |   | + |   | G | B | _ | T | O | K | E | N |   | } | , |  | 
 |   |   |   |   |   |   | b | o | d | y | : |   | J | S | O | N | . | s | t | r | i | n | g | i | f | y | ( | { |   | m | e | s | s | a | g | e | : |   | " | N | e | w |   | g | u | e | s | t | b | o | o | k |   | c | o | m | m | e | n | t | " | , |   | c | o | n | t | e | n | t | : |   | c | o | n | t | e | n | t | , |   | s | h | a | : |   | g | e | t | J | s | o | n | . | s | h | a |   | } | ) |  | 
 |   |   |   |   | } | ) | ; |  | 
 |   |   | } |   | c | a | t | c | h | ( | e | ) |   | { |  | 
 |   |   |   |   | v | a | r |   | l | o | c | a | l |   | = |   | J | S | O | N | . | p | a | r | s | e | ( | l | o | c | a | l | S | t | o | r | a | g | e | . | g | e | t | I | t | e | m | ( | " | g | b | _ | l | o | c | a | l | " | ) |   | | | | |   | " | [ | ] | " | ) | ; |  | 
 |   |   |   |   | l | o | c | a | l | . | u | n | s | h | i | f | t | ( | c | o | m | m | e | n | t | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | l | o | c | a | l | . | l | e | n | g | t | h |   | > |   | 5 | 0 | ) |   | l | o | c | a | l |   | = |   | l | o | c | a | l | . | s | l | i | c | e | ( | 0 | , |   | 5 | 0 | ) | ; |  | 
 |   |   |   |   | l | o | c | a | l | S | t | o | r | a | g | e | . | s | e | t | I | t | e | m | ( | " | g | b | _ | l | o | c | a | l | " | , |   | J | S | O | N | . | s | t | r | i | n | g | i | f | y | ( | l | o | c | a | l | ) | ) | ; |  | 
 |   |   | } |  | 
 | } |  | 
 |  | 
 | f | u | n | c | t | i | o | n |   | i | n | i | t | G | u | e | s | t | b | o | o | k | ( | ) |   | { |  | 
 |   |   | l | o | a | d | G | u | e | s | t | b | o | o | k | ( | ) | ; |  | 
 |   |   | v | a | r |   | f | o | r | m |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | " | g | u | e | s | t | b | o | o | k | F | o | r | m | " | ) | ; |  | 
 |   |   | i | f |   | ( | ! | f | o | r | m | ) |   | r | e | t | u | r | n | ; |  | 
 |   |   | f | o | r | m | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | " | s | u | b | m | i | t | " | , |   | f | u | n | c | t | i | o | n | ( | e | ) |   | { |  | 
 |   |   |   |   | e | . | p | r | e | v | e | n | t | D | e | f | a | u | l | t | ( | ) | ; |  | 
 |   |   |   |   | v | a | r |   | n | a | m | e |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | " | g | b | N | a | m | e | " | ) | . | v | a | l | u | e | . | t | r | i | m | ( | ) |   | | | | |   | " | 鍖 | 垮 | 悕 | " | ; |  | 
 |   |   |   |   | v | a | r |   | t | e | x | t |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | " | g | b | T | e | x | t | " | ) | . | v | a | l | u | e | . | t | r | i | m | ( | ) | ; |  | 
 |   |   |   |   | v | a | r |   | m | s | g |   | = |   | d | o | c | u | m | e | n | t | . | g | e | t | E | l | e | m | e | n | t | B | y | I | d | ( | " | g | b | M | s | g | " | ) | ; |  | 
 |   |   |   |   | i | f |   | ( | ! | t | e | x | t | ) |   | { |   | m | s | g | . | t | e | x | t | C | o | n | t | e | n | t |   | = |   | " | 璇 | 疯 | 緭 | 鍏 | ョ | 暀 | 瑷 | € | 鍐 | 呭 |  | " | ; |   | m | s | g | . | s | t | y | l | e | . | c | o | l | o | r |   | = |   | " | # | c | 6 | 2 | 8 | 2 | 8 | " | ; |   | r | e | t | u | r | n | ; |   | } |  | 
 |   |   |   |   | s | u | b | m | i | t | G | u | e | s | t | b | o | o | k | ( | n | a | m | e | , |   | t | e | x | t | ) | ; |  | 
 |   |   |   |   | m | s | g | . | t | e | x | t | C | o | n | t | e | n | t |   | = |   | " | 鐣 | 欒 | █ | 鎴 | 愬 | 姛 | 锛 | 佲 | 湪 | " | ; |  | 
 |   |   |   |   | m | s | g | . | s | t | y | l | e | . | c | o | l | o | r |   | = |   | " | # | 2 | e | 7 | d | 3 | 2 | " | ; |  | 
 |   |   |   |   | f | o | r | m | . | r | e | s | e | t | ( | ) | ; |  | 
 |   |   |   |   | s | e | t | T | i | m | e | o | u | t | ( | f | u | n | c | t | i | o | n | ( | ) |   | { |   | m | s | g | . | t | e | x | t | C | o | n | t | e | n | t |   | = |   | " | " | ; |   | } | , |   | 3 | 0 | 0 | 0 | ) | ; |  | 
 |   |   | } | ) | ; |  | 
 | } |  | 
 |  | 
 |  | 
 |  | 
 | d | o | c | u | m | e | n | t | . | a | d | d | E | v | e | n | t | L | i | s | t | e | n | e | r | ( | ' | D | O | M | C | o | n | t | e | n | t | L | o | a | d | e | d | ' | , |   | ( | ) |   | = | > |   | { |   | i | n | i | t | B | a | c | k | T | o | T | o | p | ( | ) | ; |  | 
 |   |   | h | i | g | h | l | i | g | h | t | N | a | v | ( | ) | ; |  | 
 |   |   | i | n | i | t | G | u | e | s | t | b | o | o | k | ( | ) | ; |  | 
 |   |   | v | a | r |   | h | o | m | e | P | r | o | m | i | s | e |   | = |   | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | h | e | r | o | ' | ) |   | ? |   | r | e | n | d | e | r | H | o | m | e | ( | ) |   | : |   | P | r | o | m | i | s | e | . | r | e | s | o | l | v | e | ( | ) | ; |  | 
 |   |   | h | o | m | e | P | r | o | m | i | s | e | . | t | h | e | n | ( | f | u | n | c | t | i | o | n | ( | ) |   | { |   | i | n | i | t | F | a | d | e | I | n | ( | ) | ; |   | } | ) | ; |  | 
 |   |   | i | f |   | ( | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | b | l | o | g | - | l | i | s | t | ' | ) | ) |   | r | e | n | d | e | r | B | l | o | g | ( | ) | ; |  | 
 |   |   | i | f |   | ( | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | i | n | t | e | r | e | s | t | - | p | a | g | e | ' | ) | ) |   | r | e | n | d | e | r | I | n | t | e | r | e | s | t | P | a | g | e | ( | ) | ; |  | 
 |   |   | i | f |   | ( | ! | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | h | e | r | o | ' | ) |   | & | & |   | ! | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | b | l | o | g | - | l | i | s | t | ' | ) |   | & | & |   | ! | d | o | c | u | m | e | n | t | . | q | u | e | r | y | S | e | l | e | c | t | o | r | ( | ' | . | i | n | t | e | r | e | s | t | - | p | a | g | e | ' | ) | ) |   | i | n | i | t | F | a | d | e | I | n | ( | ) | ; |  | 
 | } | ) | ; |  | 
 |  | 
 | 
