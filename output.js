(function main(){if("gats.io"!=location.host)return alert("This inject can only be ran on gats.io!");if("function"!==typeof a41)return setTimeout(main);let qa=["Menu;Navigation;You can select any menu from the main menu by clicking on the menu's name.;Back Button;You can return to the menu selection screen by clicking the back button at the top left corner.;Toggling;You can toggle the menu to make it vanish or reappear by pressing (T) on your keyboard at any particular time.;Scrolling;You can scroll in some menus by either using your mouse wheel or moving the scroll bar at the right side of the menu.".split(";"),
"Cheats;Toggling;You can toggle any cheat by pressing the 'on/off' button of the cheat setting you want to toggle. You can also toggle your 'Aimbot' setting by simply right clicking. Settings are saved, meaning: If you reload the site, they won't be reset to default.;Aimbot;It automatically aims for you, but you still need to shoot manually. You can toggle various settings of the aimbot, like 'Aim Smoothing' for just visual preference, 'Cursor Proximity' to target the closest person to your cursor (by default it aims at the closest to your player), 'Ignore Chatting' to ignore players who are currently typing, 'Ping Compensation' to account for the connection to the server, 'Use Acceleration' to try to account for the enemy's acceleration (change of movement speed over time) aswell and 'Triggerbot' to automatically fire at enemies right in front of you.;Better Camera;You can use the 'Extended View' setting to look further and 'Fixed Camera' to stop the camera from moving around weirdly based on your movemenet and cursor.;Misc Cheats;You can use 'Auto-Reload' to automatically reload your gun when no enemy is nearby, 'Player Healths' to reveal the enemy's Health, Armor and Ammo count, 'Reveal Teams' To reveal team affiliatons of Grenades, Knifes, Gas and Landmines and 'Show Invisibles' to show invisible things like Camo, Silencer and Landmines.;TODO: Add more entries".split(";"),
"Friends;Aimbot;Friends are players that the Aimbot will ignore. They have a gray ring around them to signify that.;Adding friends;Right-click someone you want to have as a friend in game to add them to your friends list.;Removing friends;Right-click on a friend in game to also remove them from the friends list. You can also go to the Friends menu and remove them from there by pressing their respective [X] button.".split(";"),["Chat Scroller","Configuration","You can change various aspects of the scroller. You can change the text's width it will be in chat, the direction it scrolls to and how fast it scrolls, the text itself and the seperator and the pause period for how long it should pause scrolling when you send a message any other way, unit is seconds.",
"Note","Interval is the amount of miliseconds between each text update, which means a higher interval makes it slower. There are also value limits to all settings to prevent the game from kicking you."]],Z=2*Math.PI,F=Math.PI/180,ra=1/3,aa={x:0,y:0},O=0,P={pistol:0,smg:1,shotgun:2,assault:3,sniper:4,lmg:5},ba=[24,22,24,24,30,24],Q=[44,50,55,63,75,62],R=!1,S=!1,ca=0,da=0;var T=0,U=0,ea=0,fa=0;let k={a:!1,b:!1,c:!1,d:!1,e:!1,f:!1,g:!1,h:!1,i:!1,j:!1,k:!1,l:!1,m:!1,n:!1,q:!1,r:!1,s:!1,t:!1,u:!1,v:!1,
w:!1,x:!1,y:!1,_:!1,z:!1,$:!1},ha={a:"Extended View",b:"Aimbot",c:"Aimbot Smoothing",d:"Cursor Proximity",e:"Use Acceleration",f:"Ignore Chatting",y:"Ping Compensation",g:"Tracers",h:"Auto Upgrades",i:"Show Invisibles",j:"Player Healths",k:"Reveal Teams",l:"Auto Reload",m:"Ping Display",n:"Render Time",q:"Chat Binds",r:"Static Hud",s:"Static Health",t:"Fixed Camera",u:"On Kill Chat Msg",v:"On Death Chat Msg",w:"Auto Medkit Thank",x:"No Unload Popup",_:"Reload Spin"},v=[],H=!0;var z=null,I=null,q=
null,J=null;let V=0,W=1,ia="Guide;Cheats;Friends;Auto Upgrades;Chat Scroller;Paint;Recorder;Advanced".split(";"),sa=document.onkeydown,ta=play,ua=b18,va=a75,D=!0,x={ESC:27,A:65,E:69,D:68,R:82,S:83,T:84,W:87,Z:90,ENTER:13},wa=document.onmouseup,xa=document.onmousedown,y=["","","",""],ya="bipod optics thermal armorPiercing extended grip silencer lightweight longRange thickSkin".split(" "),za="shield firstAid grenade knife engineer ghillie dash gasGrenade landMine fragGrenade".split(" "),Aa={bipod:"No Recoil",
optics:"Binoculars",thermal:"Thermal",armorPiercing:"Damage",extended:"Large Mags",grip:"+Accuracy",silencer:"Silencer",lightweight:"Speed",longRange:"Range",thickSkin:"Kevlar",shield:"Shield",firstAid:"Medkit",grenade:"Grenade",knife:"Knife",engineer:"Build",ghillie:"Camo",dash:"Dash",gasGrenade:"Gas",landMine:"Landmine",fragGrenade:"Frag"},g={a:"Hello World!",f:0,b:30,g:null,c:100,i:0,d:1,e:" # ",h:3E3},m=parseInt,ja=a=>document.onkeydown({keyCode:a,isFromCheat:!0,preventDefault:()=>{}}),Ba=a=>
document.onkeyup({keyCode:a,isFromCheat:!0,preventDefault:()=>{}}),C=(a,b)=>{b||Ca();RF.list[0].send(a59("message",{message:a}))},K=()=>{localStorage.setItem("TioHax_settings",JSON.stringify({_settings:k,_friends:v.filter(a=>!a.startsWith("Guest ")),_upgrades:y,_chatScroller:[g.a,g.b,g.c,g.d,g.e]}))},M=(a,b,d,c,e)=>{j58.beginPath();j58.strokeStyle=e||L(b);j58.lineWidth=c;j58.moveTo(a.x,a.y);j58.lineTo(b.x+d.x,b.y+d.y);j58.stroke()},ka=(a,b,d,c,e)=>{j58.beginPath();j58.strokeStyle=e||L(a);j58.lineWidth=
c;j58.moveTo(a.x+d.x,a.y+d.y);j58.lineTo(a.x+d.x+b.x,a.y+d.y+b.y);j58.stroke()},A=(a,b,d,c,e)=>{j58.beginPath();j58.strokeStyle=e||L(a);j58.lineWidth=c;j58.moveTo(a.x+b.x+d,a.y+b.y);j58.arc(a.x+b.x,a.y+b.y,d,0,Z);j58.stroke()},G=(a,b,d,c)=>{j58.fillStyle=c;j58.fillText(d,a,b);j58.lineWidth=1;j58.strokeStyle="black";j58.strokeText(d,a,b)},la=()=>{c2.update=()=>{var a=RD.pool[c2.trackingId];if(c2.trackingId)if(void 0===a.mouseAngle&&(a.mouseAngle=0),k.t)c2.x=a.x+Math.round(.4*a.spdX)-j40.x,c2.y=a.y+
Math.round(.4*a.spdY)-j40.y;else{c2.spdX<a.spdX?c2.spdX+=.1:c2.spdX>a.spdX&&(c2.spdX-=.1);c2.spdY<a.spdY?c2.spdY+=.1:c2.spdY>a.spdY&&(c2.spdY-=.1);-.1<c2.spdX&&.1>c2.spdX&&(c2.spdX=0);-.1<c2.spdY&&.1>c2.spdY&&(c2.spdY=0);c2.spdX=Math.round(10*c2.spdX)/10;c2.spdY=Math.round(10*c2.spdY)/10;var b=a.mouseAngle*F,d=Math.cos(b);b=Math.sin(b);-22<c2.spdX&&22>c2.spdX&&(c2.x=j39/15*d+(a.x-j40.x)-12*c2.spdX);-22<c2.spdY&&22>c2.spdY&&(c2.y=j39/15*b+(a.y-j40.y)-12*c2.spdY)}}},X=(a,b)=>{o3[b]=a;RF.list[0].send(a59("upgrade",
{upgrade:a,upgradeLevel:b}));c8[b]=!1},L=a=>a.ownerId&&!a.teamCode?RD.pool[c3].id==a.ownerId?"green":"red":2==a.teamCode?"blue":1==a.teamCode?"red":{"#f26740":"red","#f6803c":"orange","#fff133":"yellow","#92cd8b":"green","#8dd8f8":"blue","#f7b0c2":"pink"}[a.color.a],ma=a=>{a=a.replace(/\[[\d\w]{1,4}\] /,"");let b=v.indexOf(a);-1==b?v.push(a):b==v.length-1?v.pop():v[b]=v.pop();K();E()},n=(a,b={})=>{a=document.createElement(a);for(let d in b)a.style[d]=b[d];return a},na=()=>{document.onmouseup=wa;document.onmousedown=
xa},Da=()=>{document.onmouseup=()=>{};document.onmousedown=()=>{}},oa=()=>{},pa=()=>{clearTimeout(g.g);g.g=null;let a=()=>{let b="",d=g.a+g.e,c=g.f,e=g.i;if(d){for(let h=c;h<c+g.b;h++)b+=d[h%d.length];C(b.slice(e,b.length-e),!0)}else C(" ".repeat(e+1),!0);g.f=(c+g.d+d.length)%d.length;g.i=(e+1)%3;g.g=setTimeout(a,g.c)};a()},Ca=()=>{if(g.g){clearTimeout(g.g);g.g=null;var a=Math.random();chatBoxRandom=a;setTimeout(()=>chatBoxRandom==a&&pa(),g.h)}},Y=a=>{for(;a.hasChildNodes();)a.removeChild(a.lastChild)},
E=()=>{z.hidden=!H;na();oa=()=>{};Y(q);if(H)[Ea,Fa,Ga,Ha,Ia,Ja,Ka,La,Ma][V]()},Ea=()=>{for(let a in ia){let b=n("div",{width:"100%",height:"40px",padding:"5px","align-items":"center","border-bottom":"2px solid #000000","padding-bottom":"0px","justify-content":"center","background-color":"#88888888"});b.innerText=ia[a];b.onmouseover=()=>{b.style["background-color"]="#888888cc"};b.onmouseout=()=>{b.style["background-color"]="#88888888"};b.onclick=()=>{V=m(a)+1;E()};q.append(b)}q.lastChild.style.height=
"38px";q.lastChild.style["border-bottom"]="0px"},Fa=()=>{for(var a of qa)for(let d in a){var b=0==d;b=n("div",{"font-size":b?"30px":d&1?"25px":"20px","border-top":b?"4px solid #000000":"","margin-top":b?"10px":d&1?"15px":"5px","padding-top":b?"10px":"","padding-left":"5px"});b.innerText=a[d];q.append(b)}a=q.firstChild.style;a["margin-top"]="0px";a["border-top"]="0px"},Ga=()=>{for(let a in ha){let b=n("div",{width:"100%",height:"40px","border-top":"1px solid #000000","border-bottom":"1px solid #000000",
display:"flex",padding:"5px","padding-bottom":"0px"}),d=n("div",{width:"240px"}),c=n("div",{width:"60px",height:"30px",border:"4px solid #ffffff",display:"flex",position:"relative","align-items":"center","justify-content":"center"});d.innerText=ha[a];c.update=()=>{c.innerText=k[a]?"On":"Off";c.style["background-color"]=k[a]?"#00ff00cc":"#ff0000cc"};c.onclick=()=>{k[a]=!k[a];K();c.update()};c.update();b.append(d);b.append(c);q.append(b)}q.firstChild.style["border-top"]="0px";q.firstChild.style.height=
"39px";q.lastChild.style["border-bottom"]="0px";q.lastChild.style.height="39px"},Ha=()=>{for(let a of v){let b=n("div",{width:"100%",height:"40px",display:"flex",padding:"5px","border-bottom":"2px solid #000000","padding-bottom":"0px"}),d=n("div",{width:"240px","user-select":"text"}),c=n("div",{width:"30px",height:"30px",border:"4px solid #ffffff",display:"flex",position:"relative","align-items":"center","justify-content":"center","background-color":"#ff0000cc"});d.innerText=a;c.innerText="X";c.onclick=
()=>{ma(a);b.remove()};b.append(d);b.append(c);q.append(b)}7<v.length&&(q.lastChild.style.height="38px",q.lastChild.style["border-bottom"]="0px")},Ia=()=>{let a=[],b=n("div",{width:" 100%",display:"grid","grid-template-columns":"auto auto auto auto auto"});for(let d=1;4>d;d++){let c=n("div",{width:"100%",height:"40px",padding:"5px",display:"flex","border-bottom":"2px solid #000000","padding-bottom":"0px","justify-content":"space-between"}),e=n("div"),h=n("div",{width:"30px",height:"30px",border:"2px solid #000000",
padding:"0px","vertical-align":"0px","background-color":"#44444488"});(c.b=(f,t)=>{e.innerText=Aa[f]||"No Perk Selected";Y(h);if(j30[f]){t=h;var l=t.append;f=j30[f];let r=n("canvas",{width:"100%",height:"100%"}),u=r.getContext("2d");r.width=f.width;r.height=f.height;u.drawImage(f,0,0,f.width,f.height);l.call(t,r)}})(y[d],!0);(c.f=()=>c.style["background-color"]=d==W?"#888888cc":"")();c.onclick=()=>{b.p(W=d);for(let f of a)f.f()};c.append(e);c.append(h);a.push(c)}(b.p=d=>{Y(b);var c=2===d?za:ya;for(let e of c)c=
n("div",{border:"2px solid "+(y[d]===e?"#ffff00":"#000000"),padding:"0px"}),c.style.height=b.width/4,c.onclick=()=>{y[d]=e;a[d-1].b(e);b.p(d)},c.append(j30[e]),b.append(c)})(W);for(let d of a)q.append(d);q.append(b)},Ja=()=>{var a=n("div",{width:"100%",height:"40px","border-bottom":"2px solid #000000",display:"flex",padding:"5px","padding-bottom":"0px"}),b=n("div",{width:"240px"});let d=n("div",{width:"60px",height:"30px",border:"4px solid #ffffff",display:"flex",position:"relative","align-items":"center",
"justify-content":"center","background-color":"#ff0000cc"}),c=()=>{g.b=Math.min(30,Math.max(5,g.b));g.d=Math.min(5,Math.max(-5,g.d));g.c=Math.min(1E3,Math.max(25,g.c));g.e=g.e.slice(0,5);g.a=g.a.slice(0,9999);g.h=Math.min(1E4,Math.max(500,g.h));K()};b.innerText="Toggle Scroller";d.style["background-color"]=null==g.g?"#ff0000cc":"#00ff00cc";d.onclick=()=>{null==g.g?(pa(),d.style["background-color"]="#00ff00cc"):(clearTimeout(g.g),g.g=null,d.style["background-color"]="#ff0000cc")};a.append(b);a.append(d);
q.append(a);for(let e of["b","d","c","h"]){a=n("div",{width:"100%",height:"40px","border-bottom":"2px solid #000000",display:"flex",padding:"5px","padding-top":"0px","padding-bottom":"0px","justify-content":"space-between"});b=n("div",{"margin-top":"5px",display:"flex"});let h=n("div",{display:"flex","align-items":"center","flex-direction":"row"}),f=n("div",{width:"30px",height:"30px",border:"3px solid #ffffff",display:"flex",position:"relative","align-items":"center","justify-content":"center","background-color":"#ffff00cc"}),
t=n("div",{color:"#000000",width:"60px",height:"34px",border:"4px solid #ffffff",display:"flex",position:"relative","align-items":"center","margin-left":"5px","margin-right":"5px","justify-content":"center","background-color":"#ffffffcc"}),l=n("div",{width:"30px",height:"30px",border:"3px solid #ffffff",display:"flex",position:"relative","align-items":"center","justify-content":"center","background-color":"#ffff00cc"});(t.j=()=>{c();t.innerText=g[e]/("h"==e?1E3:1)})();l.onclick=()=>{g[e]+="h"==e?
500:"c"==e?25:1;t.j()};f.onclick=()=>{g[e]-="h"==e?500:"c"==e?25:1;t.j()};b.innerText={b:"Text Width",d:"Direction",c:"Interval",h:"Pause Period"}[e];h.append(f);h.append(t);h.append(l);a.append(b);a.append(h);q.append(a)}for(let e of["e","a"]){a=n("div",{width:"100%",height:"40px",display:"flex",padding:"5px","padding-top":"2px","border-bottom":"2px solid #000000","padding-bottom":"0px","justify-content":"space-between"});b=n("div",{"margin-top":"3px","margin-right":"8px",display:"flex"});let h=
n("input",{width:"a"==e?"calc(100% - 10px)":"70px",height:"34px",color:"#000000",border:"4px solid #ffffff",display:"flex",position:"relative","align-items":"center","justify-content":"center","background-color":"#ffffffcc"});h.type="text";h.oninput=()=>{g[e]=h.value;c();h.value=g[e]};h.onfocus=()=>S=!0;h.onblur=()=>S=!1;h.value=g[e];b.innerText="a"==e?"Text":"Seperator";a.append(b);a.append(h);q.append(a)}},Ka=()=>{},La=()=>{},Ma=()=>{};setInterval(console.dir,1E3,"GATS.io TioHax Menu\nMade by Taureon.");
RD.prototype.activate=function(a,b){this.class=a.class;this.color=a.color;this.x=parseFloat(a.x/10);this.y=parseFloat(a.y/10);this.accY=this.accX=this.prevAccY=this.prevAccX=0;this.radius=m(a.radius/10);this.playerAngle=m(a.playerAngle);this.hp=m(a.hp);this.hpRadius=this.hp*this.radius/100;this.armorAmount=m(a.armorAmount);this.shootingAnimation=a6("shooting",this.class);this.ghillie=a.ghillie;this.maxBullets=a.maxBullets;this.invincible=a.invincible;this.username=formatUserName(a.username);this.isLeader=
m(a.isLeader);this.isPremiumMember=m(a.isPremiumMember);this.teamCode=m(a.teamCode);this.chatBoxOpen=m(a.chatBoxOpen);b||(this.currentBullets=m(a.currentBullets),this.maxBullets=m(a.maxBullets),this.armor=a.armor,this.c2=a.c2,this.hpMax=a.hpMax,this.numExplosivesLeft=3,j31=m(a.mapWidth)/10,j41=m(a.mapHeight)/10);this.activated=1};RD.prototype.applyPrimaryUpdate=function(a){this.x=parseFloat(a.x/10);this.y=parseFloat(a.y/10);let b=parseFloat(a.spdX/10),d=parseFloat(a.spdY/10);this.prevAccX=this.accX;
this.prevAccY=this.accY;this.accX=b-this.spdX;this.accY=d-this.spdY;this.spdX=b;this.spdY=d;a.id!=c3&&(this.playerAngle=m(a.playerAngle))};RD.prototype.applyAuxUpdate=function(a){if(this.activated){void 0!==a.color&&""!=a.color&&(this.color=a.color);void 0!==a.radius&&""!=a.radius&&(this.radius=m(a.radius/10));void 0!==a.dashing&&""!=a.dashing&&(this.dashing=m(a.dashing));void 0!==a.ghillie&&""!=a.ghillie&&(this.ghillie=m(a.ghillie));void 0!==a.shooting&&""!=a.shooting&&(this.shooting=m(a.shooting));
void 0!==a.isLeader&&""!=a.isLeader&&(this.isLeader=m(a.isLeader));void 0!==a.reloading&&""!=a.reloading&&(this.reloading=m(a.reloading));void 0!==a.maxBullets&&""!=a.maxBullets&&(this.maxBullets=m(a.maxBullets));void 0!==a.invincible&&""!=a.invincible&&(this.invincible=m(a.invincible));void 0!==a.armorAmount&&""!=a.armorAmount&&(this.armorAmount=m(a.armorAmount));void 0!==a.chatBoxOpen&&""!=a.chatBoxOpen&&(this.chatBoxOpen=m(a.chatBoxOpen));void 0!==a.currentBullets&&""!=a.currentBullets&&(this.currentBullets=
m(a.currentBullets));if(void 0!==a.hp&&""!=a.hp){let b=m(a.hp);this.hp+1<b&&k.w&&this.id==c3&&C((D=!D)?"Thank you!":"Thank you for healing!");this.hp=b}void 0!==a.beingHit&&""!=a.beingHit&&(a.id==c3&&(j37=6),this.beingHit=m(a.beingHit));void 0!==a.j47&&""!=a.j47&&(this.j47=a.j47.replace(/~/g,","),this.j47Timer=200)}};document.oncontextmenu=a=>{if(c2){let b=RD.pool[c3],d=-c2.x-a.clientX/j6;a=-c2.y-a.clientY/j5;for(let c of Object.values(RD.pool))if(c.activated&&c.id!=b.id&&(c.x+d)**2+(c.y+a)**2<=(c.radius+
2)**2){ma(c.username);return}}k.b=!k.b;K();E();k.b||(a57({clientX:T,clientY:U}),a37())};document.onkeydown=a=>{if(!S||a.isFromCheat)if(sa(a),!j46&&Object.values(x).includes(a.keyCode)){a.preventDefault();if(a.keyCode!==x.T){if(!k.q)return;D=!D}switch(a.keyCode){case x.ENTER:if(!j46)break;j46=!1;RF.list[0].send(a59("key-press",{inputId:7,state:0}));break;case x.E:C(D?"Medic!":"Medkit!");break;case x.Z:C(D?"Put Dispenser here!":"Need a Dispenser here!");break;case x.T:H=!H,E()}}};a57=(a,b)=>{if(!R||
b){var d=c2.getRelPos(RD.pool[c3]);b||(d.x*=j6,d.y*=j5);d.x-=a.clientX;d.y-=a.clientY;b=Math.atan2(d.y,d.x)/F+180;var c=b+Math.asin(18/Math.sqrt(d.x**2+d.y**2))/F;j9[0]=a.clientX;j9[1]=a.clientY;j39=Math.sqrt(d.x**2+d.y**2);j16[0]=Math.round(d.x);j16[1]=Math.round(d.y);j16[2]=Math.round(b);c||0===c||(c=b);RD.pool[c3].mouseAngle=Math.round(b);RD.pool[c3].playerAngle=Math.round(c)}};b18=a=>{ua(a);for(let b of a67(a.data).split("|"))if(b=a61(b))switch(b.code){case "a":la();break;case "r":if(a=m(b.type),
1==a&&k.u&&C("I just killed "+b.content.replace("Guest ","")+"!"),(2==a||9==a)&&k.v&&C("I just died to "+b.content.replace("Guest ","")+"!"),5==a){a=RD.pool[c3];let d=j11/2-a.x;a=d>j12/2-a.y?0<d?x.A:x.D:0<d?x.S:x.W;ja(a);Ba(a)}}};a41=()=>{let a=Date.now();var b=5;c4||b21||"/model"==window.location.pathname||a29();if(null!=c3){!k.a||2E3==j7&&1E3==j8?k.a||2E3!=j7||1E3!=j8||(j7=ea,j8=fa,a1()):(ea=j7,fa=j8,j7=2E3,j8=1E3,a1());for(var d in landMine[0])landMine[0][d][1][3]=k.i?"#000000":"#e8e8ed";j17=!1;
j58.clearRect(0,0,canvas.width,canvas.height);c2.update();a16(j58,c2);for(var c in RA.pool)RA.pool[c].activated&&"landMine"==RA.pool[c].type&&(RA.pool[c].update(),RA.pool[c].draw(j58,c2));for(c in RC.pool)RC.pool[c].activated&&(RC.pool[c].tempAccX||(RC.pool[c].tempAccX=0),RC.pool[c].tempAccY||(RC.pool[c].tempAccY=0),RC.pool[c].silenced=0,RC.pool[c].update(),RC.pool[c].draw(j58,c2));for(c in RB.pool)RB.pool[c].activated&&(RB.pool[c].update(),RB.pool[c].draw(j58,c2));for(c in RA.pool)RA.pool[c].activated&&
"landMine"!=RA.pool[c].type&&(RA.pool[c].timeAliveExtra||(RA.pool[c].timeAliveExtra=0),RA.pool[c].update(),RA.pool[c].draw(j58,c2));for(c in RD.pool)!RD.pool[c].activated||c28&&RD.pool[c].id==c3||(RD.pool[c].ghillie=0,RD.pool[c].update(),RD.pool[c].drawBody(j58,c2),RD.pool[c].drawGun(j58,c2));for(c in RA.pool)RA.pool[c].activated&&RA.pool[c].drawEmission(j58,c2);for(c in j27)d=j27[c],5>d.c42++?j26(c2,d.x,d.y):delete d[c];a55(j58,c2);c=RD.pool[c3];k.r&&(c5=c.hp,c6=c.armorAmount,c7=c.score);k.h&&(c.score>=
c33&&""==o3[1]&&""!=y[1]&&X(y[1],1),c.score>=c34&&""==o3[2]&&""!=y[2]&&X(y[2],2),c.score>=c35&&""==o3[3]&&""!=y[3]&&X(y[3],3));j9=[T,U];a9(c);a100(c);a13(j58,c8);a44(j58,j38)}a113();a56();j9[0]/=j6;j9[1]/=j5;oa();if(k.m){c=5;d=RF.list[0]||{currentPing:"Not Checked",averagePing:"Not Checked",maxPing:"Not Checked",minPing:"Not Checked"};d=["Ping: "+d.currentPing+" ms","Avg.: "+Math.round(d.averagePing)+" ms","Max:  "+d.maxPing+" ms","Min:  "+d.minPing+" ms"];if(b21||c28)if(c+=10,selfPremiumMember&&
(c+=35),b3||b4)j58.font="14px Arial",c+=Math.ceil(j58.measureText((b3?"Logged in":"Playing")+" as "+b4).width);j58.font="bold 14px consolas";for(var e=0;e<d.length;e++)G(c,15+17*e,d[e],"#fff");c+=Math.ceil(j58.measureText(d[2]).width);b+=c+5}k.n&&(j58.font="bold 14px consolas",G(b,15,"Render time: "+O+"ms","#fff"));if(c2){j58.font="bold 20px consolas";e=[];b=RD.pool[c3];c=c2.getRelPos(b);d={x:c.x-b.x,y:c.y-b.y};for(var h of Object.values(RD.pool))h.activated&&h.id!=b.id&&0!=h.hp&&e.push(h);for(var f of e)if(f.reloading||
0!=f.currentBullets||(f.currentBullets=f.maxBullets),k.g&&M(c,f,d,1),v.includes(f.username.replace(/\[[\d\w]{1,4}\] /,""))?(j58.globalAlpha=.5,A(f,d,1.4*f.radius,5,"black")):k.f&&f.chatBoxOpen&&(j58.globalAlpha=.25,A(f,d,1.4*f.radius,5,"black")),j58.globalAlpha=1,k.j){h=f.x+d.x-f.radius;var t=f.y+d.y-(f.radius+6);G(h,t,f.hp,L(f));G(h,t-20,f.armorAmount,"#666");G(h,t-40,f.currentBullets+"/"+f.maxBullets,"#000")}if(k.k){for(var l of Object.values(RA.pool))l.activated&&("landMine"==l.type?A(l,d,20,2):
l.emitting?A(l,d,l.emissionRadius,2):(A(l,d,10,2),k.g&&l.timeAlive<l.travelTime&&(f=2.5*(l.travelTime-(l.timeAlive+l.timeAliveExtra)),l.timeAliveExtra+=ra,ka(l,{x:l.spdX*f,y:l.spdY*f},d,1))));for(r of Object.values(RC.pool))r.activated&&r.isKnife&&A(r,d,5,2)}var r=b;f=d;var u=e;h=null;l=!1;t=Infinity;let Na=Q[P[c1.weapon]]**2;var B;e={x:j9[0],y:j9[1]};for(p of u){if(!(u=p.invincible||k.f&&p.chatBoxOpen||p.teamCode&&p.teamCode==r.teamCode)){{u=p.username;let N=0;if(0!==u.length)for(B=0;B<u.length;B++)N=
(N<<5)-N+u.charCodeAt(B)|0;u=N}u=-1599485949===u}if(!u&&!v.includes(p.username.replace(/\[[\d\w]{1,4}\] /,""))&&(u=(p.x-r.x)**2+(p.y-r.y)**2,k.d?(B=(p.x+f.x-e.x)**2+(p.y+f.y-e.y)**2,k.g&&M(e,p,f,1,"#888888")):B=u,B<t&&(l=!0,u>Na))){t=B;var w=u;h=p}}if(h&&k.d){M(e,h,f,2,"#888888");var p=Math.sqrt(t);j58.beginPath();j58.moveTo(e.x+p,e.y);j58.arc(e.x,e.y,p,0,Z);j58.stroke()}p=h;r=w;w=l;R=!1;if(k.b){if(R=null!=p)l=r,r=p.x,f=p.y,h=P[c1.weapon],e=!1,p.dashing||(e=k.c,l=(Math.sqrt(l)-Q[h])/(ba[h]*(e?1.3:
1.5)),k.y&&(l+=RF.list[0].averagePing/40),r+=p.spdX*l,f+=p.spdY*l,k.e&&(r+=.1*(p.accX+p.prevAccX)*l**2,f+=.1*(p.accY+p.prevAccY)*l**2)),a57({clientX:(e?(ca+r)/2:r)+d.x,clientY:(e?(da+f)/2:f)+d.y},!0),ca=r,da=f,k.g&&M(c,p,d,3);A(b,d,10,2,"black")}b.reloading&&k._&&b.reloadingFrame&&(p=Math.PI*Math.random(),d=b.radius+100*Math.random(),a57({clientX:j13+d*Math.sin(p),clientY:j14+d*Math.cos(p)},!0));!k.l||w||j18.x||j18.y||b.shooting||b.reloading||b.maxBullets==b.currentBullets||ja(x.R);k.g&&(w=(b.playerAngle+
210)*-F,w={x:c.x+Math.sin(w)*b.radius,y:c.y+Math.cos(w)*b.radius},ka(w,{x:j9[0]-w.x,y:j9[1]-w.y},aa,1,"black"),c=P[c1.weapon],c=Q[c]+ba[c]-14,b=(b.playerAngle+270)*-F,A({x:w.x+Math.sin(b)*c,y:w.y+Math.cos(b)*c},aa,1,2,"red"))}a37();RF.list[0]&&RF.list[0].check();O=Date.now()-a;setTimeout(a41,16-O)};(()=>{let {_settings:a,_friends:b,_upgrades:d,_chatScroller:c}=JSON.parse(localStorage.getItem("TioHax_settings")||"{}");if(a)for(let e in a)e in k&&(k[e]=a[e]);b&&(v=b);d&&(y=d);if(c){let [e,h,f,t,l]=
c;g.a=e;g.b=h;g.c=f;g.d=t;g.e=l}})();(()=>{const a=n("style");a.textContent="img{width:100%;height:100%}::-webkit-scrollbar{width:16px}::-webkit-scrollbar-track{background:#000000;border-left:4px solid black}::-webkit-scrollbar-thumb{background:#666666;border-left:4px solid black}::-webkit-scrollbar-thumb:hover{background:#888888}";document.head.append(a);z=n("div",{left:"5px",width:"300px",color:"white",border:"2px solid #000000","z-index":"10",position:"absolute","font-size":"20px","font-family":"Consolas, monospace",
"user-select":"none"});I=n("div",{width:"100%",height:"43px",border:"2px solid #000000",padding:"5px",display:"flex","white-space":"pre-wrap","padding-right":"10px","justify-content":"space-between","background-image":"linear-gradient(to bottom, #880000cc 0%, #ff0000cc 40%, #0000ffcc 60%, #000088cc 100%)"});q=n("div",{width:"100%",height:"322px",border:"2px solid #000000","overflow-y":"scroll","border-top":"2px solid #000000","border-left":"2px solid #000000","background-color":"#000000cc"});J=n("div",
{color:"#000000",width:"28px",height:"28px",border:"3px solid #000000",display:"flex","align-items":"center","justify-content":"center","background-color":"#ffffff88"});z.onmouseover=Da;z.onmouseout=na;J.innerText="<";J.onclick=()=>{V=0;E()};I.innerText="TioHax Cheat Menu (T)";I.prepend(J);(window.onresize=()=>{z.style.bottom=b21?.08*window.innerHeight+"px":"110px"})();E();z.append(I);z.append(q);document.body.append(z)})();RF.prototype.a74=function(){this.pingReceivedTime=(new Date).getTime();this.currentPing=
this.pingReceivedTime-this.pingSentTime;this.pings||(this.pings=[]);this.pings.push(this.currentPing);10<this.pings.length&&this.pings.shift();this.averagePing=0;for(let a of this.pings)this.averagePing+=a;this.averagePing/=this.pings.length;this.minPing=Math.min(...this.pings);this.maxPing=Math.max(...this.pings);++this.numSuccessfulPings};RB.prototype.draw=function(a,b){if(this.model)if(1<this.model.length)this.animationFrame<this.model.length-1?this.animationFrame++:this.animationFrame=0,a38(a,
b,this.getAttr(),this.angle,this.model[this.animationFrame]);else if("userCrate"==this.type){var d=this.hp/this.maxHp,c=this.model,e=this.isPremium?[240,186,55]:[83,198,140];c[0][1][1][3]="#";for(let h of e)c[0][1][1][3]+=Math.round(255+d*(h-255)).toString(16);a38(a,b,this.getAttr(),this.angle,c[0])}else a38(a,b,this.getAttr(),this.angle,this.model[0])};RD.prototype.updateHpRadius=function(){var a=Math.round(this.hp*(this.radius-this.armorAmount/10-1)/100);k.s?this.hpRadius=a:(this.hpRadius>a-.5&&
this.hpRadius<a+.5?this.hpRadius=a:this.hpRadius>a?this.hpRadius-=.5:this.hpRadius<a&&(this.hpRadius+=.5),0>this.hpRadius&&(this.hpRadius=0))};RA.prototype.applyUpdate=function(a){this.x=m(a.x/10);this.y=m(a.y/10);this.exploding=m(a.exploding);this.emitting=m(a.emitting);this.emissionRadius=m(a.emissionRadius/10);this.timeAliveExtra=0;this.timeAlive++};document.onmousemove=a=>{T=a.clientX;U=a.clientY;c3&&a57(a)};a37=()=>{let a=a60("mouse-move",{mouseX:j16[0],mouseY:j16[1],mouseAngle:j16[2]});void 0!==
RF.list[0]&&a!==j15&&(RF.list[0].send(a66(a)),j15=a)};a119=()=>{};a78=()=>{};a79=()=>{};a80=()=>{};for(var Oa of j36)document.getElementById(Oa.pl).remove();c2&&la();reloadGame=()=>a120(o4.server,c22);a36=()=>{c8={1:!1,2:!1,3:!1};o3={1:"",2:"",3:""};a2("c1",c1.weapon+","+c1.armor+","+c1.armorBtn+","+c1.color,365)};"block"==document.getElementById("reconnectButton").style.display&&reloadGame();window.onbeforeunload=a=>{if(!k.x&&b3)return a.preventDefault(),a.returnValue="You're still logged in. Are you sure you want to leave?"};
a75=()=>{va();window.onresize()};play=()=>{ta();window.onresize()};a45=()=>{console.log("Disconnect Called!");!b15&&a93();a4();a75();b38=b4=null;b1=b2=b3=selfPremiumMember=!1;$("#hostServerTabLi").hide();$("#playButton").hide();document.getElementById("gametypeDropdown").style.display="block";document.getElementById("serversBtn").style.display="flex";a99()};document.getElementById("playButton").style.height="55px";document.getElementById("playButton").style["margin-top"]="0px";document.getElementById("playButton").style["border-width"]=
"4px";document.getElementById("reconnectButton").style.height="55px";document.getElementById("reconnectButton").style["margin-top"]="0px";document.getElementById("reconnectButton").style["border-width"]="4px";document.getElementById("reconnectButton").style["border-color"]="#767676"})();
