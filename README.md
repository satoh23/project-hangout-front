<div>なんかいろいろどうでも良くなったからあげる</div>
<div>コードは汚いです</div>

自作のサーバー叩くための奴
認証はJWT
保存場所はCookie
CookieはXSS対策でHttpOnly属性付き
本番環境ではセキュアも付ける(予定だった)
SAME SITEはデフォルトのまま
基本ページによってSSRとSSG使い分けてる(多分)
課金周りはstripe

非同期通信でリアルタイムに更新できるようにしてた
一部WebSocket
初めからWebSocket使えばよかった