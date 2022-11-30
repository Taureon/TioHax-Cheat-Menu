/* jshint esversion: 8*/

/*
 * TODO:
 * + fix auto upgrades cheat UI elements
 * + make silencer reveal, camo reveal and landmine reveal toggleable
 * + configurable distance limit at which cursorproximity aims for you
 * + better acceleration for aimbot (https://math.stackexchange.com/a/4538831/1099868)
 * + finish guide
 * + add line of sight for aimbot
 * + onauxclick & targetting priority
 * + try to guess mid perk timeout and also perks in general. suggested by ravgo
 */
(function main() {

    //now, this cheat obviously wouldn't work on sites that aren't gats.io
    if (location.host != 'gats.io') return alert('This inject can only be ran on gats.io!');

    //if the game hasn't loaded yet, wait until it is loaded
    //it is checked if the game has loaded by checking if the game tick function exists
    if (typeof a41 !== 'function') return setTimeout(main);

    //these get computed and replaced by the closure compiler
    //heavily increases obfuscation while decreasing code size and code complexity
    let enums = {
        SETTINGS_ZOOM: "a",
        SETTINGS_AIMBOT: "b",
        SETTINGS_AIMSMOOTHING: "c",
        SETTINGS_CURSORPROXIMITY: "d",
        SETTINGS_USEACCELERATION: "e",
        SETTINGS_IGNORECHATTING: "f",
        SETTINGS_TRACERS: "g",
        SETTINGS_AUTOUPGRADE: "h",
        SETTINGS_SHOWINVIS: "i",
        SETTINGS_SHOWHEALTH: "j",
        SETTINGS_REVEALTEAMS: "k",
        SETTINGS_AUTORELOAD: "l",
        SETTINGS_PINGDISPLAY: "m",
        SETTINGS_RENDERDISPLAY: "n",
        SETTINGS_CHATBINDS: "q",
        SETTINGS_STATICHUD: "r",
        SETTINGS_STATICHEALTH: "s",
        SETTINGS_FIXCAMERA: "t",
        SETTINGS_ONKILL: "u",
        SETTINGS_ONDEATH: "v",
        SETTINGS_AUTOTHANK: "w",
        SETTINGS_DISABLECLOSEPOPUP: "x",
        SETTINGS_PINGCOMPENSATION: "y",
        SETTINGS_TRIGGERBOT: "z",
        SETTINGS_RELOADSPIN: "_",
        SETTINGS_WALLCHECK: "$",
        CHATSCROLLER_TEXT: "a",
        CHATSCROLLER_WIDTH: "b",
        CHATSCROLLER_INTERVAL: "c",
        CHATSCROLLER_DIRECTION: "d",
        CHATSCROLLER_SEPERATOR: "e",
        CHATSCROLLER_INDEX: "f",
        CHATSCROLLER_TIMEOUT: "g",
        CHATSCROLLER_PAUSEPERIOD: "h",
        CHATSCROLLER_VARIATION: "i"
    },

        //database of guide entries
        //very incomplete, missing a lot of information
        guide = [
            [
                'Menu',

                'Navigation',
                "You can select any menu from the main menu by clicking on the menu's name.",

                'Back Button',
                "You can return to the menu selection screen by clicking the back button at the top left corner.",

                'Toggling',
                "You can toggle the menu to make it vanish or reappear by pressing (T) on your keyboard at any particular time.",

                'Scrolling',
                "You can scroll in some menus by either using your mouse wheel or moving the scroll bar at the right side of the menu."
            ], [
                'Cheats',

                'Toggling',
                "You can toggle any cheat by pressing the 'on/off' button of the cheat setting you want to toggle. "
                +"You can also toggle your 'Aimbot' setting by simply right clicking. "
                +"Settings are saved, meaning: If you reload the site, they won't be reset to default.",

                'Aimbot',
                "It automatically aims for you, but you still need to shoot manually. "
                +"You can toggle various settings of the aimbot, like 'Aim Smoothing' for just visual preference, "
                +"'Cursor Proximity' to target the closest person to your cursor (by default it aims at the closest to your player), "
                +"'Ignore Chatting' to ignore players who are currently typing, "
                +"'Ping Compensation' to account for the connection to the server, "
                +"'Use Acceleration' to try to account for the enemy's acceleration (change of movement speed over time) aswell and "
                +"'Triggerbot' to automatically fire at enemies right in front of you.",

                'Better Camera',
                "You can use the 'Extended View' setting to look further and 'Fixed Camera' to stop the camera from moving around weirdly based on your movemenet and cursor.",

                'Misc Cheats',
                "You can use 'Auto-Reload' to automatically reload your gun when no enemy is nearby, "
                +"'Player Healths' to reveal the enemy's Health, Armor and Ammo count, "
                +"'Reveal Teams' To reveal team affiliatons of Grenades, Knifes, Gas and Landmines and "
                +"'Show Invisibles' to show invisible things like Camo, Silencer and Landmines.",
                'TODO: Add more entries'
            ], [
                'Friends',

                'Aimbot',
                "Friends are players that the Aimbot will ignore. They have a gray ring around them to signify that.",

                'Adding friends',
                "Right-click someone you want to have as a friend in game to add them to your friends list.",

                'Removing friends',
                "Right-click on a friend in game to also remove them from the friends list. "
                +"You can also go to the Friends menu and remove them from there by pressing their respective [X] button."
            ], [
                'Chat Scroller',

                'Configuration',
                "You can change various aspects of the scroller. "
                +"You can change the text's width it will be in chat, "
                +"the direction it scrolls to and how fast it scrolls, "
                +"the text itself and the seperator and "
                +"the pause period for how long it should pause scrolling when you send a message any other way, unit is seconds.",

                'Note',
                "Interval is the amount of miliseconds between each text update, which means a higher interval makes it slower. "
                +"There are also value limits to all settings to prevent the game from kicking you."
            ]
        ],

        //used to make math easier to read
        doublePI = Math.PI * 2,
        aimConstant = 1.5,
        aimConstantSmoothed = 1.3, //this needs to be smaller so the aimbot aims more ahead because its to compensate for taking in the position it aimed previously
        degToRad = Math.PI / 180,
        third = 1 / 3,
        nullPos = {x: 0, y: 0},

        //whoever I am giving this cheat to so I know who leaked it if it ever gets leaked
        //clear = dev testing
        DRMuser = "",

        //hash of the developer's ign
        //this is 'TheS3xHaver' but hashed with hashString() function
        developerHash = -1599485949,

        //time it took to render a frame
        renderTime = 0,

        //turning gun names to indexes
        gunMap = {
            pistol: 0,
            smg: 1,
            shotgun: 2,
            assault: 3,
            sniper: 4,
            lmg: 5
        },

        //bullet velocities of guns
        velocities = [24, 22, 24, 24, 30, 24],

        //bullet spawn offsets based on gun lengths
        offsets = [44, 50, 55, 63, 75, 62],
        
        //if the aimbot is aiming at anything at the moment
        //used to lock player's ability to aim when the aimbot is taking control
        aimbotFocused = false,

        //stupidness
        textBoxFocused = false,

        //when aim amoothing is enabled, those get used
        prevAimX = 0,
        prevAimY = 0,

        //cursor position that is independent of the game
        cursor = {x: 0, y: 0},

        //used for toggling zoom on and off
        normalCameraScale = {width: 0, height: 0},

        settings = {
            [enums.SETTINGS_ZOOM]: false,
            [enums.SETTINGS_AIMBOT]: false,
            [enums.SETTINGS_AIMSMOOTHING]: false,
            [enums.SETTINGS_CURSORPROXIMITY]: false,
            [enums.SETTINGS_USEACCELERATION]: false,
            [enums.SETTINGS_IGNORECHATTING]: false,
            [enums.SETTINGS_TRACERS]: false,
            [enums.SETTINGS_AUTOUPGRADE]: false,
            [enums.SETTINGS_SHOWINVIS]: false,
            [enums.SETTINGS_SHOWHEALTH]: false,
            [enums.SETTINGS_REVEALTEAMS]: false,
            [enums.SETTINGS_AUTORELOAD]: false,
            [enums.SETTINGS_PINGDISPLAY]: false,
            [enums.SETTINGS_RENDERDISPLAY]: false,
            [enums.SETTINGS_CHATBINDS]: false,
            [enums.SETTINGS_STATICHUD]: false,
            [enums.SETTINGS_STATICHEALTH]: false,
            [enums.SETTINGS_FIXCAMERA]: false,
            [enums.SETTINGS_ONKILL]: false,
            [enums.SETTINGS_ONDEATH]: false,
            [enums.SETTINGS_AUTOTHANK]: false,
            [enums.SETTINGS_DISABLECLOSEPOPUP]: false,
            [enums.SETTINGS_PINGCOMPENSATION]: false,
            [enums.SETTINGS_RELOADSPIN]: false,
            [enums.SETTINGS_TRIGGERBOT]: false,
            [enums.SETTINGS_WALLCHECK]: false
        },

        //the labels of each cheat setting
        controls = {
            [enums.SETTINGS_ZOOM]: 'Extended View',
            [enums.SETTINGS_AIMBOT]: 'Aimbot',
            [enums.SETTINGS_AIMSMOOTHING]: 'Aimbot Smoothing',
            [enums.SETTINGS_CURSORPROXIMITY]: 'Cursor Proximity',
            [enums.SETTINGS_USEACCELERATION]: 'Use Acceleration',
            [enums.SETTINGS_IGNORECHATTING]: 'Ignore Chatting',
            [enums.SETTINGS_PINGCOMPENSATION]: 'Ping Compensation',
            [enums.SETTINGS_TRACERS]: 'Tracers',
            [enums.SETTINGS_AUTOUPGRADE]: 'Auto Upgrades',
            [enums.SETTINGS_SHOWINVIS]: 'Show Invisibles',
            [enums.SETTINGS_SHOWHEALTH]: 'Player Healths',
            [enums.SETTINGS_REVEALTEAMS]: 'Reveal Teams',
            [enums.SETTINGS_AUTORELOAD]: 'Auto Reload',
            [enums.SETTINGS_PINGDISPLAY]: 'Ping Display',
            [enums.SETTINGS_RENDERDISPLAY]: 'Render Time',
            [enums.SETTINGS_CHATBINDS]: 'Chat Binds',
            [enums.SETTINGS_STATICHUD]: 'Static Hud',
            [enums.SETTINGS_STATICHEALTH]: 'Static Health',
            [enums.SETTINGS_FIXCAMERA]: 'Fixed Camera',
            [enums.SETTINGS_ONKILL]: 'On Kill Chat Msg',
            [enums.SETTINGS_ONDEATH]: 'On Death Chat Msg',
            [enums.SETTINGS_AUTOTHANK]: 'Auto Medkit Thank',
            [enums.SETTINGS_DISABLECLOSEPOPUP]: 'No Unload Popup',
            [enums.SETTINGS_RELOADSPIN]: 'Reload Spin'/*,
            [enums.SETTINGS_TRIGGERBOT]: false,
            [enums.SETTINGS_WALLCHECK]: false,
            [enums.SETTINGS_DISABLEWALLDESPAWN]: 'Keep Walls'*/
        },

        //for if the player has made friends on the enemy team
        friends = [],

        //if the cheat menu is up or not
        menuUp = true,

        //the divs that make up the cheat menu
        divs = {
            menu: null,
            title: null,
            content: null,
            backbutton: null
        },

        //0 = menu select
        //1 = cheats
        //2 = friends
        //3 = upgrades
        selectedMenu = 0,

        //selected perk slot for auto upgrade menu
        selectedPerkSlot = 1,

        //all menu names
        menuNames = ['Guide', 'Cheats', 'Friends', 'Auto Upgrades', 'Chat Scroller', 'Paint', 'Recorder', 'Advanced'],

        //functions that will be hooked
        oldKeyDown = document.onkeydown,
        old_play = play,
        old_b18 = b18,
        old_a75 = a75,

        //alternate chat bind messages so we don't get kicked for spam
        swapMessage = true,

        //key code map
        // http://www.foreui.com/articles/Key_Code_Table.htm
        keyCodeMap = {
              ESC: 27,   A: 65,   E: 69,
                D: 68,   R: 82,   S: 83,
                T: 84,   W: 87,   Z: 90,
            ENTER: 13
        },

        //backups of functions that will be disabled if the user interacts with the cheat menu
        gameMouseUp = document.onmouseup,
        gameMouseDown = document.onmousedown,

        autoUpgrades = ['', '', '', ''],

        perks = [
            "bipod",         "optics",      "thermal",
            "armorPiercing", "extended",    "grip",
            "silencer",      "lightweight", "longRange",
            "thickSkin"
        ],
        abilities = [
            "shield",        "firstAid",    "grenade",
            "knife",         "engineer",    "ghillie",
            "dash",          "gasGrenade",  "landMine",
            "fragGrenade"
        ],

        perkNames = {
            "bipod": 'No Recoil',
            "optics": 'Binoculars',
            "thermal": 'Thermal',
            "armorPiercing": 'Damage',
            "extended": 'Large Mags',
            "grip": '+Accuracy',
            "silencer": 'Silencer',
            "lightweight": 'Speed',
            "longRange": 'Range',
            "thickSkin": 'Kevlar',
            "shield": 'Shield',
            "firstAid": 'Medkit',
            "grenade": 'Grenade',
            "knife": 'Knife',
            "engineer": 'Build',
            "ghillie": 'Camo',
            "dash": 'Dash',
            "gasGrenade": 'Gas',
            "landMine": 'Landmine',
            "fragGrenade": 'Frag'
        },

        //chat scroll cheat stuff
        chatScroll = {
            [enums.CHATSCROLLER_TEXT]: 'Hello World!',
            [enums.CHATSCROLLER_INDEX]: 0,
            [enums.CHATSCROLLER_WIDTH]: 30,
            [enums.CHATSCROLLER_TIMEOUT]: null,
            [enums.CHATSCROLLER_INTERVAL]: 100,
            [enums.CHATSCROLLER_VARIATION]: 0,
            [enums.CHATSCROLLER_DIRECTION]: 1,
            [enums.CHATSCROLLER_SEPERATOR]: ' # ',
            [enums.CHATSCROLLER_PAUSEPERIOD]: 3000,
        },

        //this really doesnt need to exist but idc
        pInt = parseInt,

    //simple string hash
    hashString = str => {
        let hash = 0, i;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) hash = (((hash << 5) - hash) + str.charCodeAt(i)) | 0;
        return hash;
    },

    //looks less ugly
    clamp = (min, val, max) => Math.min(max, Math.max(min, val)),

    //linear interpolation
    lerp = (a, b, t) => a + t * (b - a),

    //I WANT INTEGERS
    lerpR = (a, b, t) => Math.round(lerp(a, b, t)),

    //facilitates keypresses
    pressKey = keyCode => document.onkeydown({keyCode, isFromCheat: true, preventDefault: ()=>{/*do nothing*/}}),
    releaseKey = keyCode => document.onkeyup({keyCode, isFromCheat: true, preventDefault: ()=>{/*do nothing*/}}),

    //facilitates message sending
    sendChatMessage = (message, dontpause) => {
        if (!dontpause) pauseChatScrolling();
        RF.list[0].send(a59("message", {message}));
    },

    //remove clan tags in tdm and dom
    sanitiseName = username => username.replace(/\[[\d\w]{1,4}\] /, ''),

    //makes code look better
    getPool = R => Object.values(R.pool),

    saveSettings = () => {
        localStorage.setItem('TioHax_settings', JSON.stringify({
            _settings: settings,
            _friends: friends.filter(x => !x.startsWith('Guest ')),
            _upgrades: autoUpgrades,
            _chatScroller: [
                chatScroll[enums.CHATSCROLLER_TEXT],
                chatScroll[enums.CHATSCROLLER_WIDTH],
                chatScroll[enums.CHATSCROLLER_INTERVAL],
                chatScroll[enums.CHATSCROLLER_DIRECTION],
                chatScroll[enums.CHATSCROLLER_SEPERATOR]
            ]
        }));
    },

    loadSettings = () => {
        let { _settings, _friends, _upgrades, _chatScroller } = JSON.parse(localStorage.getItem('TioHax_settings') || '{}');
        if (_settings) for (let key in _settings) if (key in settings) settings[key] = _settings[key];
        if (_friends) friends = _friends;
        if (_upgrades) autoUpgrades = _upgrades;
        if (_chatScroller) {
            let [text, width, interval, direction, seperator] = _chatScroller;
            chatScroll[enums.CHATSCROLLER_TEXT] = text;
            chatScroll[enums.CHATSCROLLER_WIDTH] = width;
            chatScroll[enums.CHATSCROLLER_INTERVAL] = interval;
            chatScroll[enums.CHATSCROLLER_DIRECTION] = direction;
            chatScroll[enums.CHATSCROLLER_SEPERATOR] = seperator;
        }
    },

    //line drawer wrapper
    drawLine = (start, entity, offset, width, color) => {
        j58.beginPath();
        j58.strokeStyle = color || getColor(entity);
        j58.lineWidth = width;
        j58.moveTo(start.x, start.y);
        j58.lineTo(entity.x + offset.x, entity.y + offset.y);
        j58.stroke();
    },

    //line drawer wrapper but different
    drawLine2 = (entity, end, offset, width, color) => {
        j58.beginPath();
        j58.strokeStyle = color || getColor(entity);
        j58.lineWidth = width;
        j58.moveTo(entity.x + offset.x, entity.y + offset.y);
        j58.lineTo(entity.x + offset.x + end.x, entity.y + offset.y + end.y);
        j58.stroke();
    },

    //circle drawer wrapper
    drawCircle = (entity, offset, radius, width, color) => {
        j58.beginPath();
        j58.strokeStyle = color || getColor(entity);
        j58.lineWidth = width;
        j58.moveTo(entity.x + offset.x + radius, entity.y + offset.y);
        j58.arc(entity.x + offset.x, entity.y + offset.y, radius, 0, doublePI);
        j58.stroke();
    },

    //text drawer wrapper
    drawText = (x, y, text, color) => {
        j58.fillStyle = color;
        j58.fillText(text, x, y);
        j58.lineWidth = 1;
        j58.strokeStyle = 'black';
        j58.strokeText(text, x, y);
    },

    //adds a toggleable camera fix
    fixCamera = () => {
        c2.update = () => {
            var player = RD.pool[c2.trackingId];
            if (c2.trackingId) {
                if (player.mouseAngle === undefined) player.mouseAngle = 0;
                if (settings[enums.SETTINGS_FIXCAMERA]) {
                    //we need to add the velocity to it because the tick function now draws after updating players
                    c2.x = (player.x + Math.round(player.spdX * 0.4)) - j40.x;
                    c2.y = (player.y + Math.round(player.spdY * 0.4)) - j40.y;
                    return;
                }
                if (c2.spdX < player.spdX) {
                    c2.spdX += 0.1;
                } else if (c2.spdX > player.spdX) {
                    c2.spdX -= 0.1;
                }
                if (c2.spdY < player.spdY) {
                    c2.spdY += 0.1;
                } else if (c2.spdY > player.spdY) {
                    c2.spdY -= 0.1;
                }
                if (c2.spdX > -.1 && c2.spdX < 0.1) c2.spdX = 0;
                if (c2.spdY > -.1 && c2.spdY < 0.1) c2.spdY = 0;
                c2.spdX = Math.round(c2.spdX * 10) / 10;
                c2.spdY = Math.round(c2.spdY * 10) / 10;
                var angleRad = player.mouseAngle * degToRad,
                    cos = Math.cos(angleRad),
                    sin = Math.sin(angleRad);
                if (c2.spdX > -22 && c2.spdX < 22) c2.x = j39 / 15 * cos + (player.x - j40.x) - c2.spdX * 12;
                if (c2.spdY > -22 && c2.spdY < 22) c2.y = j39 / 15 * sin + (player.y - j40.y) - c2.spdY * 12;
            }
        };
    },

    //handles upgrading
    upgradePerk = (upgrade, upgradeLevel) => {
        o3[upgradeLevel] = upgrade;
        RF.list[0].send(a59("upgrade", {upgrade, upgradeLevel}));
        c8[upgradeLevel] = false;
    },

    //automatic upgrade cheat
    autoUpgrade = me => {
        if (me.score >= c33 && o3[1] == '' && autoUpgrades[1] != '') upgradePerk(autoUpgrades[1], 1);
        if (me.score >= c34 && o3[2] == '' && autoUpgrades[2] != '') upgradePerk(autoUpgrades[2], 2);
        if (me.score >= c35 && o3[3] == '' && autoUpgrades[3] != '') upgradePerk(autoUpgrades[3], 3);
    },

    /*gets the color of an enemy by its team affiliation
        -FFA player colors-
        red: {a: '#f26740', b: '#fcd9cf'}
        orange: {a: '#f6803c', b: '#fddfce'}
        yellow: {a: '#fff133', b: '#fffccc'}
        green: {a: '#92cd8b', b: '#ddf0db'}
        blue: {a: '#8dd8f8', b: '#cfeefc'}
        pink: {a: '#f7b0c2', b: '#fde8ed'}
     */
    getColor = entity => {
        //fix for FFA
        if (entity.ownerId && !entity.teamCode) return RD.pool[c3].id == entity.ownerId ? 'green' : 'red';

        return entity.teamCode == 2 ? 'blue' : entity.teamCode == 1 ? 'red' : {
            '#f26740': 'red',
            '#f6803c': 'orange',
            '#fff133': 'yellow',
            '#92cd8b': 'green',
            '#8dd8f8': 'blue',
            '#f7b0c2': 'pink'
        }[entity.color.a];
    },

    //either add them or remove them from the friends list depending on if they are already in it or not
    toggleUsernameInFriendslist = username => {
        username = sanitiseName(username);
        let index = friends.indexOf(username);

        //if the player doesnt exist in the list, add them
        if (index == -1) {
            friends.push(username);

        //if the player does exist, delete them from the list
        } else if (index == friends.length - 1){
            friends.pop();
        } else {
            friends[index] = friends.pop();
        }

        saveSettings();
        refreshMenu();
    },

    //very simple thing for making elements very quickly
    //i thought of adding a third argument containing all the elements that will be appended to it but then didnt add it
    make = (type, style = {}) => {
        let div = document.createElement(type);
        for (let key in style) div.style[key] = style[key];
        return div;
    },

    //dublicates an image because an image element cannot be appended to two places at once
    dupeImg = img => {
        let element = make('canvas', { 'width': '100%', 'height': '100%' }),
            context = element.getContext('2d');
        element.width = img.width;
        element.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        return element;
    },

    enableGameMouse = () => {
        document.onmouseup = gameMouseUp;
        document.onmousedown = gameMouseDown;
    },
    disableGameMouse = () => {
        document.onmouseup = () => {};
        document.onmousedown = () => {};
    },

    //if a menu requires a canvas for whatever reason
    //this function would later be re-defined in the menu
    updateMenuCanvas = () => {},

    stopChatScrolling = () => {
        //surprisingly, clearTimeout doesn't throw an error if the argument is null...
        clearTimeout(chatScroll[enums.CHATSCROLLER_TIMEOUT]);
        chatScroll[enums.CHATSCROLLER_TIMEOUT] = null;
    },

    startChatScrolling = () => {
        stopChatScrolling();
        let chatScrollLoop = () => {
            let textFinal = '',
                text = chatScroll[enums.CHATSCROLLER_TEXT] + chatScroll[enums.CHATSCROLLER_SEPERATOR],
                index = chatScroll[enums.CHATSCROLLER_INDEX],
                variation = chatScroll[enums.CHATSCROLLER_VARIATION];
            if (text) {
                for (let i = index; i < index + chatScroll[enums.CHATSCROLLER_WIDTH]; i++) textFinal += text[i % text.length];

                //the .slice() exists because the game kicks you for sending messages with the same length often
                sendChatMessage(textFinal.slice(variation, textFinal.length - variation), true);
            } else {
                //if the user is trying to chat-scroll literally nothing for some reason
                sendChatMessage(' '.repeat(variation + 1), true);
            }
            chatScroll[enums.CHATSCROLLER_INDEX] = (index + chatScroll[enums.CHATSCROLLER_DIRECTION] + text.length) % text.length;
            chatScroll[enums.CHATSCROLLER_VARIATION] = (variation + 1) % 3;
            chatScroll[enums.CHATSCROLLER_TIMEOUT] = setTimeout(chatScrollLoop, chatScroll[enums.CHATSCROLLER_INTERVAL]);
        };
        chatScrollLoop();
    },

    //pauses scrolling for some amount of time
    pauseChatScrolling = () => {
        if (!chatScroll[enums.CHATSCROLLER_TIMEOUT]) return;
        stopChatScrolling();
        //to not conflict if this function was called another time
        let localRandom = Math.random();
        chatBoxRandom = localRandom;
        setTimeout(() => chatBoxRandom == localRandom && startChatScrolling(), chatScroll[enums.CHATSCROLLER_PAUSEPERIOD]);
    },

    removeChildren = element => {
        while (element.hasChildNodes()) element.removeChild(element.lastChild);
    },

    refreshMenu = () => {
        divs.menu.hidden = !menuUp;
        enableGameMouse();
        updateMenuCanvas = () => {};
        removeChildren(divs.content);
        if (!menuUp) return;

        //find out which menu to render
        //this really doesn't need to be like this but I figured it would make deobfuscation harder
        [   refreshMenuSelect, refreshMenuGuide, refreshMenuCheats,
            refreshMenuFriends, refreshMenuUpgrades, refreshMenuScroller,
            refreshMenuPaint, refreshMenuRecorder, refreshMenuAdvanced
        ][selectedMenu]();
    },

    //this breaks if this function is ran multiple times but that shouldnt happen anyways
    createMenu = () => {
        //custom scrollbar
        //i wish there were a better way...
        const style = make('style');
        style.textContent = 'img{width:100%;height:100%}::-webkit-scrollbar{width:16px}::-webkit-scrollbar-track{background:#000000;border-left:4px solid black}::-webkit-scrollbar-thumb{background:#666666;border-left:4px solid black}::-webkit-scrollbar-thumb:hover{background:#888888}';
        document.head.append(style);

        divs.menu = make("div", {
            'left': '5px',
            'width': '300px',
            'color': 'white',
            'border': '2px solid #000000',
            'z-index': '10',
            'position': 'absolute',
            'font-size': '20px',
            'font-family': 'Consolas, monospace',
            'user-select': 'none'
        });
        divs.title = make("div", {
            'width': '100%',
            'height': '43px',
            'border': '2px solid #000000',
            'padding': '5px',
            'display': 'flex',
            'white-space': 'pre-wrap',
            'padding-right': '10px',
            'justify-content': 'space-between',
            'background-image': 'linear-gradient(to bottom, #880000cc 0%, #ff0000cc 40%, #0000ffcc 60%, #000088cc 100%)'
        });
        divs.content = make("div", {
            'width': '100%',
            'height': '322px',
            'border': '2px solid #000000',
            'overflow-y': 'scroll',
            'border-top': '2px solid #000000',
            'border-left': '2px solid #000000',
            'background-color': '#000000cc'
        });
        divs.backbutton = make("div", {
            'color': '#000000',
            'width': '28px',
            'height': '28px',
            'border': '3px solid #000000',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'background-color': '#ffffff88'
        });

        //make the game not interact with mouse pressed when the mouse is over the cheat menu
        divs.menu.onmouseover = disableGameMouse;
        divs.menu.onmouseout = enableGameMouse;

        //make back button return to menu select
        divs.backbutton.innerText = '<';
        divs.backbutton.onclick = () => {
            selectedMenu = 0;
            refreshMenu();
        };

        divs.title.innerText = 'TioHax Cheat Menu (T)';
        divs.title.prepend(divs.backbutton);

        //b21 keeps track of if the player is in game or not
        (window.onresize = () => {
            divs.menu.style.bottom = b21 ? 0.08 * window.innerHeight + 'px' : '110px';
        })();

        refreshMenu();
        divs.menu.append(divs.title);
        divs.menu.append(divs.content);
        document.body.append(divs.menu);
    },

    refreshMenuSelect = () => {
        for (let i in menuNames) {
            let menuDiv = make("div", {
                'width': '100%',
                'height': '40px',
                'padding': '5px',
                'align-items': 'center',
                'border-bottom': '2px solid #000000',
                'padding-bottom': '0px',
                'justify-content': 'center',
                'background-color': '#88888888'
            });

            menuDiv.innerText = menuNames[i];
            menuDiv.onmouseover = () => {
                menuDiv.style['background-color'] = '#888888cc';
            };
            menuDiv.onmouseout = () => {
                menuDiv.style['background-color'] = '#88888888';
            };
            menuDiv.onclick = () => {
                selectedMenu = pInt(i) + 1;
                refreshMenu();
            };

            divs.content.append(menuDiv);
        }
        divs.content.lastChild.style.height = '38px';
        divs.content.lastChild.style['border-bottom'] = '0px';
    },

    //telling people how to use menu
    refreshMenuGuide = () => {
        //this was going to have submenus so it would be easier to navigate
        //then the cheat controls menu would have submenus aswell so it isnt just one disorganized mess
        for (let entry of guide) {
            for (let i in entry) {
                let bool = i == 0,
                text = make("div", {
                    'font-size': bool ? '30px' : i & 1 ? '25px' : '20px',
                    'border-top': bool ? '4px solid #000000' : '',
                    'margin-top': bool ? '10px' : i & 1 ? '15px' : '5px',
                    'padding-top': bool ? '10px' : '',
                    'padding-left': '5px'
                });
                text.innerText = entry[i];
                divs.content.append(text);
            }
        }
        let firstEntry = divs.content.firstChild.style;
        firstEntry['margin-top'] = '0px';
        firstEntry['border-top'] = '0px';
    },

    //creates cheat controls
    refreshMenuCheats = () => {
        for (let setting in controls) {
            let controlDiv = make("div", {
                'width': '100%',
                'height': '40px',
                'border-top': '1px solid #000000',
                'border-bottom': '1px solid #000000',
                'display': 'flex',
                'padding': '5px',
                'padding-bottom': '0px'
            }),
            controlNameDiv = make("div", { 'width': '240px' }),
            controlButtonDiv = make("div", {
                'width': '60px',
                'height': '30px',
                'border': '4px solid #ffffff',
                'display': 'flex',
                'position': 'relative',
                'align-items': 'center',
                'justify-content': 'center'
            });

            controlNameDiv.innerText = controls[setting];

            controlButtonDiv.update = () => {
                controlButtonDiv.innerText = settings[setting] ? 'On' : 'Off';
                controlButtonDiv.style['background-color'] = settings[setting] ? '#00ff00cc' : '#ff0000cc';
            };
            controlButtonDiv.onclick = () => {
                settings[setting] = !settings[setting];
                saveSettings();
                controlButtonDiv.update();
            };
            controlButtonDiv.update();

            controlDiv.append(controlNameDiv);
            controlDiv.append(controlButtonDiv);
            divs.content.append(controlDiv);
        }

        divs.content.firstChild.style['border-top'] = '0px';
        divs.content.firstChild.style.height = '39px';
        divs.content.lastChild.style['border-bottom'] = '0px';
        divs.content.lastChild.style.height = '39px';
    },

    refreshMenuFriends = () => {
        for (let username of friends) {
            let entryDiv = make("div", {
                'width': '100%',
                'height': '40px',
                'display': 'flex',
                'padding': '5px',
                'border-bottom': '2px solid #000000',
                'padding-bottom': '0px'
            }),
            entryNameDiv = make("div", {
                'width': '240px',
                'user-select': 'text'
            }),
            entryButtonDiv = make("div", {
                'width': '30px',
                'height': '30px',
                'border': '4px solid #ffffff',
                'display': 'flex',
                'position': 'relative',
                'align-items': 'center',
                'justify-content': 'center',
                'background-color': '#ff0000cc'
            });

            entryNameDiv.innerText = username;

            //this button exists to allow the user to remove friends from the menu without having to find them
            entryButtonDiv.innerText = 'X';
            entryButtonDiv.onclick = () => {
                toggleUsernameInFriendslist(username);
                entryDiv.remove();
            };

            entryDiv.append(entryNameDiv);
            entryDiv.append(entryButtonDiv);
            divs.content.append(entryDiv);
        }

        if (friends.length > 7) {
            divs.content.lastChild.style.height = '38px';
            divs.content.lastChild.style['border-bottom'] = '0px';
        }
    },

    //this menu was a serious pain in the ass
    refreshMenuUpgrades = () => {
        let upgradeslotsDivs = [],
            perkSelectDiv = make("div", {
                'width': ' 100%',
                'display': 'grid',
                'grid-template-columns': 'auto auto auto auto auto'
            });

        for (let i = 1; i < 4; i++) {

            let upgradeSlotDiv = make("div", {
                'width': '100%',
                'height': '40px',
                'padding': '5px',
                'display': 'flex',
                'border-bottom': '2px solid #000000',
                'padding-bottom': '0px',
                'justify-content': 'space-between'
            }), upgradeNameDiv = make("div"),
            perkSlotImageDiv = make("div", {
                'width': '30px',
                'height': '30px',
                'border': '2px solid #000000',
                'padding': '0px',
                'vertical-align': '0px',
                'background-color': '#44444488'
            });

            //b = update
            //this is abstracted because closure compiler doesnt
            (upgradeSlotDiv.b = (perk, boolean) => {
                upgradeNameDiv.innerText = perkNames[perk] || 'No Perk Selected';
                removeChildren(perkSlotImageDiv);
                if (j30[perk]) perkSlotImageDiv.append(dupeImg(j30[perk]));
            })(autoUpgrades[i], true);

            //f = update visually
            //this is abstracted because closure compiler doesnt
            (upgradeSlotDiv.f = () => upgradeSlotDiv.style['background-color'] = i == selectedPerkSlot ? '#888888cc' : '')();
            
            upgradeSlotDiv.onclick = () => {
                perkSelectDiv.p(selectedPerkSlot = i);
                for (let slot of upgradeslotsDivs) slot.f();
            };

            upgradeSlotDiv.append(upgradeNameDiv);
            upgradeSlotDiv.append(perkSlotImageDiv);
            upgradeslotsDivs.push(upgradeSlotDiv);
        }

        //p = update
        //this is abstracted because closure compiler doesnt
        (perkSelectDiv.p = perkLevel => {
            removeChildren(perkSelectDiv);
            let perksToDisplay = perkLevel === 2 ? abilities : perks;
            for (let perk of perksToDisplay) {
                let perkImageDiv = make("div", {
                    'border': '2px solid ' + (autoUpgrades[perkLevel] === perk ? '#ffff00' : '#000000'),
                    'padding': '0px'
                });
                perkImageDiv.style.height = perkSelectDiv.width / 4;
                perkImageDiv.onclick = () => {
                    autoUpgrades[perkLevel] = perk;
                    upgradeslotsDivs[perkLevel - 1].b(perk);

                    //alternatively you can update just the perk selects that actually change but this is easier to do soo...
                    perkSelectDiv.p(perkLevel);
                }
                perkImageDiv.append(j30[perk]);
                perkSelectDiv.append(perkImageDiv);
            }
        })(selectedPerkSlot);
        for (let div of upgradeslotsDivs) divs.content.append(div);
        divs.content.append(perkSelectDiv);
    },

    refreshMenuScroller = () => {
        let controlDiv = make("div", {
            'width': '100%',
            'height': '40px',
            'border-bottom': '2px solid #000000',
            'display': 'flex',
            'padding': '5px',
            'padding-bottom': '0px'
        }),
        controlNameDiv = make("div", { 'width': '240px' }),
        controlButtonDiv = make("div", {
            'width': '60px',
            'height': '30px',
            'border': '4px solid #ffffff',
            'display': 'flex',
            'position': 'relative',
            'align-items': 'center',
            'justify-content': 'center',
            'background-color': '#ff0000cc'
        }),

        //makes sure the values don't go past a certain unsafe point
        clampValues = () => {
            chatScroll[enums.CHATSCROLLER_WIDTH] = clamp(5, chatScroll[enums.CHATSCROLLER_WIDTH], 30);
            chatScroll[enums.CHATSCROLLER_DIRECTION] = clamp(-5, chatScroll[enums.CHATSCROLLER_DIRECTION], 5);
            chatScroll[enums.CHATSCROLLER_INTERVAL] = clamp(25, chatScroll[enums.CHATSCROLLER_INTERVAL], 1000);
            chatScroll[enums.CHATSCROLLER_SEPERATOR] = chatScroll[enums.CHATSCROLLER_SEPERATOR].slice(0, 5);
            chatScroll[enums.CHATSCROLLER_TEXT] = chatScroll[enums.CHATSCROLLER_TEXT].slice(0, 9999);
            chatScroll[enums.CHATSCROLLER_PAUSEPERIOD] = clamp(500, chatScroll[enums.CHATSCROLLER_PAUSEPERIOD], 10000);
            saveSettings();
        };

        controlNameDiv.innerText = 'Toggle Scroller';

        controlButtonDiv.style['background-color'] = chatScroll[enums.CHATSCROLLER_TIMEOUT] == null ? '#ff0000cc' : '#00ff00cc';
        controlButtonDiv.onclick = () => {
            if (chatScroll[enums.CHATSCROLLER_TIMEOUT] == null) {
                startChatScrolling();
                controlButtonDiv.style['background-color'] = '#00ff00cc';
            } else {
                stopChatScrolling();
                controlButtonDiv.style['background-color'] = '#ff0000cc';
            }
        };

        controlDiv.append(controlNameDiv);
        controlDiv.append(controlButtonDiv);
        divs.content.append(controlDiv);

        for (let attribute of [enums.CHATSCROLLER_WIDTH, enums.CHATSCROLLER_DIRECTION, enums.CHATSCROLLER_INTERVAL, enums.CHATSCROLLER_PAUSEPERIOD]) {
            let controlValueDiv = make("div", {
                'width': '100%',
                'height': '40px',
                'border-bottom': '2px solid #000000',
                'display': 'flex',
                'padding': '5px',
                'padding-top': '0px',
                'padding-bottom': '0px',
                'justify-content': 'space-between'
            }),
            controlValueNameDiv = make("div", {'margin-top': '5px','display': 'flex'}),
            controlButtonContainerDiv = make("div", {'display': 'flex', 'align-items': 'center', 'flex-direction': 'row'}),
            controlButtonLeftDiv = make("div", {
                'width': '30px',
                'height': '30px',
                'border': '3px solid #ffffff',
                'display': 'flex',
                'position': 'relative',
                'align-items': 'center',
                'justify-content': 'center',
                'background-color': '#ffff00cc'
            }),
            controlIndicatorDiv = make("div", {
                'color': '#000000',
                'width': '60px',
                'height': '34px',
                'border': '4px solid #ffffff',
                'display': 'flex',
                'position': 'relative',
                'align-items': 'center',
                'margin-left': '5px',
                'margin-right': '5px',
                'justify-content': 'center',
                'background-color': '#ffffffcc'
            }),
            controlButtonRightDiv = make("div", {
                'width': '30px',
                'height': '30px',
                'border': '3px solid #ffffff',
                'display': 'flex',
                'position': 'relative',
                'align-items': 'center',
                'justify-content': 'center',
                'background-color': '#ffff00cc'
            });

            //j = update
            //this is abstracted because closure compiler doesnt
            (controlIndicatorDiv.j = () => {
                clampValues();
                controlIndicatorDiv.innerText = chatScroll[attribute] / (attribute == enums.CHATSCROLLER_PAUSEPERIOD ? 1000 : 1);
            })();
            controlButtonRightDiv.onclick = () => {
                chatScroll[attribute] += enums.CHATSCROLLER_PAUSEPERIOD == attribute ? 500 : enums.CHATSCROLLER_INTERVAL == attribute ? 25 : 1;
                controlIndicatorDiv.j();
            };
            controlButtonLeftDiv.onclick = () => {
                chatScroll[attribute] -= enums.CHATSCROLLER_PAUSEPERIOD == attribute ? 500 : enums.CHATSCROLLER_INTERVAL == attribute ? 25 : 1;
                controlIndicatorDiv.j();
            };

            controlValueNameDiv.innerText = {
                [enums.CHATSCROLLER_WIDTH]: 'Text Width',
                [enums.CHATSCROLLER_DIRECTION]: 'Direction',
                [enums.CHATSCROLLER_INTERVAL]: 'Interval',
                [enums.CHATSCROLLER_PAUSEPERIOD]: 'Pause Period'
            }[attribute];

            controlButtonContainerDiv.append(controlButtonLeftDiv);
            controlButtonContainerDiv.append(controlIndicatorDiv);
            controlButtonContainerDiv.append(controlButtonRightDiv);
            controlValueDiv.append(controlValueNameDiv);
            controlValueDiv.append(controlButtonContainerDiv);
            divs.content.append(controlValueDiv);

        }

        for (let attribute of [enums.CHATSCROLLER_SEPERATOR, enums.CHATSCROLLER_TEXT]) {
            let controlTextDiv = make("div", {
                'width': '100%',
                'height': '40px',
                'display': 'flex',
                'padding': '5px',
                'padding-top': '2px',
                'border-bottom': '2px solid #000000',
                'padding-bottom': '0px',
                'justify-content': 'space-between'
            }),
            controlTextNameDiv = make("div", {'margin-top': '3px', 'margin-right': '8px', 'display': 'flex'}),
            controlTextInputDiv = make('input', {
                'width': attribute == enums.CHATSCROLLER_TEXT ? 'calc(100% - 10px)' : '70px',
                'height': '34px',
                'color': '#000000',
                'border': '4px solid #ffffff',
                'display': 'flex',
                'position': 'relative',
                'align-items': 'center',
                'justify-content': 'center',
                'background-color': '#ffffffcc'
            });
            controlTextInputDiv.type = 'text';
            controlTextInputDiv.oninput = () => {
                chatScroll[attribute] = controlTextInputDiv.value;
                clampValues();
                controlTextInputDiv.value = chatScroll[attribute];
            }
            controlTextInputDiv.onfocus = () => textBoxFocused = true;
            controlTextInputDiv.onblur = () => textBoxFocused = false;
            controlTextInputDiv.value = chatScroll[attribute];
            controlTextNameDiv.innerText = attribute == enums.CHATSCROLLER_TEXT ? 'Text' : 'Seperator';
            controlTextDiv.append(controlTextNameDiv);
            controlTextDiv.append(controlTextInputDiv);
            divs.content.append(controlTextDiv);
        }
    },

    refreshMenuPaint = () => {
        //a menu for changing model colors, similar to what public vaakir client has but extended
        //this is the only one i had made a concept design for
        //https://cdn.discordapp.com/attachments/828690456330108938/1005149323417370684/unknown.png
    },

    refreshMenuRecorder = () => {
        //a game recorder similar to nitrogem's recorder but it works offline and doesn't need an iframe to play
        //it back since it just plays back server packets while making the game think it is connected to one
    },

    refreshMenuAdvanced = () => {
        //contains controls for changing specific stuff like the aimbots' aim constants, onkill/death/heal messages,
        //how many recent pings it saves (the number 10 in the RF.prototype.a74 modification), and some more i wouldve thought of later
    },

    pingDisplay = () => {

        //starts at 5 padding so it isn't directly on the screen's edge, looks nicer
        let pingTextPadding = 5,
            fallbackText = 'Not Checked',
            pingSocket = RF.list[0] || {
                currentPing: fallbackText,
                averagePing: fallbackText,
                maxPing: fallbackText,
                minPing: fallbackText
            },
            pingTexts = [
                'Ping: ' + pingSocket.currentPing + ' ms',
                'Avg.: ' + Math.round(pingSocket.averagePing) + ' ms',
                'Max:  ' + pingSocket.maxPing + ' ms',
                'Min:  ' + pingSocket.minPing + ' ms'
            ];

        //if we're in a game or not
        if (b21 || c28) {
            pingTextPadding += 10;
            
            //second padding for the VIP tag
            if (selfPremiumMember) pingTextPadding += 35;

            //second padding for the username text
            if (b3 || b4) {
                j58.font = "14px Arial";
                pingTextPadding += Math.ceil(j58.measureText((b3 ? 'Logged in' : 'Playing') + ' as ' + b4).width);
            }
        }

        //draw the ping number
        j58.font = 'bold 14px consolas';
        let offset = 0;
        for (let i = 0; i < pingTexts.length; i++) drawText(pingTextPadding, 15 + (i * 17), pingTexts[i], '#fff');

        //return the padding for the render time so we dont draw the render time text over server ping text
        return pingTextPadding + Math.ceil(j58.measureText(pingTexts[2]).width);
    },

    //find nearest enemy
    //NOTE: all distances calculated here are left squared because it is not required for them to not be until later in aimTorwards(),
    //      and Math.sqrt() is slow as shit and this runs like 60 times a frame for each enemy nearby and thats gonna slow shit down
    getTarget = (me, offset, players) => {

        //two of those will be returned and one of those will be used in the distance check
        let enemy = null, isItABadIdeaToReloadRightNow = false,
            smallestDistanceToPoint = Infinity,
            minDis = offsets[gunMap[c1.weapon]] ** 2,
            distanceToMe, distanceToPoint, distance,
            c = {x: j9[0], y: j9[1]};

        for (let player of players) {
            //dont aimbot at invincible or chatting people if that setting is enabled
            if (player.invincible || (settings[enums.SETTINGS_IGNORECHATTING] && player.chatBoxOpen)
            //dont aimbot at team mates
            || (player.teamCode && player.teamCode == me.teamCode)
            //dont aimbot at the developer of this cheat
            || hashString(player.username) === developerHash
            //dont aimbot at people the aimbot is not supposted to shoot at
            || friends.includes(sanitiseName(player.username))
            ) continue;

            //compare distances and check if the current enemy to check is closer
            distanceToMe = (player.x - me.x) ** 2 + (player.y - me.y) ** 2;

            //or closer to the mouse if that setting is enabled
            if (settings[enums.SETTINGS_CURSORPROXIMITY]) {
                distanceToPoint = (player.x + offset.x - c.x) ** 2 + (player.y + offset.y - c.y) ** 2;

                //draws lines from cursor to enemies
                if (settings[enums.SETTINGS_TRACERS]) drawLine(c, player, offset, 1, '#888888');
            } else {
                distanceToPoint = distanceToMe;
            }

            //and also if the enemy is too close for the player to do anything anyway
            //IDEA: add max distance to cursor, maybe
            if (distanceToPoint < smallestDistanceToPoint) {
                isItABadIdeaToReloadRightNow = true;
                if (distanceToMe > minDis) {
                    smallestDistanceToPoint = distanceToPoint;
                    distance = distanceToMe;
                    enemy = player;
                }
            }
        }

        //a visualiser so you know whats close to your cursor
        if (enemy && settings[enums.SETTINGS_CURSORPROXIMITY]) {
            drawLine(c, enemy, offset, 2, '#888888');
            let radius = Math.sqrt(smallestDistanceToPoint);
            j58.beginPath();
            j58.moveTo(c.x + radius, c.y);
            j58.arc(c.x, c.y, radius, 0, doublePI);
            j58.stroke();
        }

        return {enemy, distance, isItABadIdeaToReloadRightNow};
    },

    //the actual aimbot component
    aimTorwards = (enemy, offset, distance) => {

        //offset required so the aimbot doesnt aim at some spot at the bottom right
        let aimX = enemy.x,
            aimY = enemy.y,

            gun = gunMap[c1.weapon],

            //this can only be set to true in the block where it checks if the enemy is dashing so the aimbot doesnt shoot too far backwards
            includePrevPos = false;

        //not accounting for velocity when the enemy is dashing is mostly a better idea
        if (!enemy.dashing) {
            includePrevPos = settings[enums.SETTINGS_AIMSMOOTHING];

            //maf
            distance = (Math.sqrt(distance) - offsets[gun]) / (velocities[gun] * (includePrevPos ? aimConstantSmoothed : aimConstant));

            //aim a bit more ahead depending on the connection
            if (settings[enums.SETTINGS_PINGCOMPENSATION]) distance += RF.list[0].averagePing / 40; // 40 because the server updates once every 40 ms

            //the larger the distance, the more the velocity of the enemy needs to be applied
            aimX += enemy.spdX * distance;
            aimY += enemy.spdY * distance;

            //Formula for "Pos + Vel + Acc + Time => New Pos": (np = new pos, p = pos, v = vel, t = time, a = acc) np = (p) + (v * t) + (0.5 * a * t²)
            if (settings[enums.SETTINGS_USEACCELERATION]) {
                //0.5 * 0.4 * 0.5 = 0.1
                //0.4 because units are not identical across client and server
                //0.5 because halving the not fully completed average
                aimX += 0.1 * (enemy.accX + enemy.prevAccX) * (distance ** 2)
                aimY += 0.1 * (enemy.accY + enemy.prevAccY) * (distance ** 2)
            }
        }

        //immitate mouse cursor movement
        a57({
            clientX: (includePrevPos ? (prevAimX + aimX) / 2 : aimX) + offset.x,
            clientY: (includePrevPos ? (prevAimY + aimY) / 2 : aimY) + offset.y
        }, true);

        prevAimX = aimX;
        prevAimY = aimY;
    },

    //implement simple antiafk
    //simply go to middle for a step
    onAFK = () => {
        let me = RD.pool[c3],
            horizontal = j11 / 2 - me.x,
            vertical = j12 / 2 - me.y,
            key = horizontal > vertical ?
                horizontal > 0 ? keyCodeMap.A : keyCodeMap.D
            :   horizontal > 0 ? keyCodeMap.S : keyCodeMap.W;

        pressKey(key);
        releaseKey(key);
    },

    //TODO: Make text configurable in advaned settings menu
    onKill = victim => settings[enums.SETTINGS_ONKILL]                     && sendChatMessage('I just killed '  + victim.replace('Guest ', '') + '!'),
    onDeath= killer => settings[enums.SETTINGS_ONDEATH]                    && sendChatMessage('I just died to ' + killer.replace('Guest ', '') + '!'),
    onHeal = patient=> settings[enums.SETTINGS_AUTOTHANK] && patient == c3 && sendChatMessage((swapMessage = !swapMessage) ? 'Thank you!' : 'Thank you for healing!');

    //this is the DRM!
    setInterval(console.dir, 1000, "GATS.io TioHax Menu\nMade by Taureon." + (DRMuser ? "\nLent to " + DRMuser + "." : ""));

/*
this is planned shit for an uktrakill-like style meter which would use the chat for the style level and the duration of the style
concept:
-------SSShitstorm-------
 ------SSShitstorm------
  -----SSShitstorm-----
   ----SSShitstorm----
    ---SSShitstorm---
      -SSShitstorm-
       SSShitstorm
when it ends it downgrades to the level before
if the user kills someone it levels up and resets the timer

(11) Destructive
( 7) Chaotic
( 6) Brutal
( 8) Anarchic
( 7) Supreme
( 9) SSadistic
(11) SSShitstorm
( 9) ULTRAKILL
30 - 11 = 19 => 18
(30) jgihrehgioerhgiorehiogheriohge
*/

    //both of those to update accX and accY aswell
    RD.prototype.activate = function(data, bool) {
        this.class = data.class;
        this.color = data.color;
        this.x = parseFloat(data.x / 10);
        this.y = parseFloat(data.y / 10);
        this.prevAccX = 0;
        this.prevAccY = 0;
        this.accX = 0;
        this.accY = 0;
        this.radius = pInt(data.radius / 10);
        this.playerAngle = pInt(data.playerAngle);
        this.hp = pInt(data.hp);
        this.hpRadius = this.hp * this.radius / 100;
        this.armorAmount = pInt(data.armorAmount);
        this.shootingAnimation = a6("shooting", this.class);
        this.ghillie = data.ghillie;
        this.maxBullets = data.maxBullets;
        this.invincible = data.invincible;
        this.username = formatUserName(data.username);
        this.isLeader = pInt(data.isLeader);
        this.isPremiumMember = pInt(data.isPremiumMember);
        this.teamCode = pInt(data.teamCode);
        this.chatBoxOpen = pInt(data.chatBoxOpen);
        if (!bool) {
            this.currentBullets = pInt(data.currentBullets);
            this.maxBullets = pInt(data.maxBullets);
            this.armor = data.armor;
            this.c2 = data.c2;
            this.hpMax = data.hpMax;
            this.numExplosivesLeft = 3;
            j31 = pInt(data.mapWidth) / 10;
            j41 = pInt(data.mapHeight) / 10;
        }
        this.activated = 1;
    };

    //keep track of acceleration
    RD.prototype.applyPrimaryUpdate = function(data) {
        this.x = parseFloat(data.x / 10);
        this.y = parseFloat(data.y / 10);
        let spdX = parseFloat(data.spdX / 10);
        let spdY = parseFloat(data.spdY / 10);
        this.prevAccX = this.accX;
        this.prevAccY = this.accY;
        this.accX = spdX - this.spdX;
        this.accY = spdY - this.spdY;
        this.spdX = spdX;
        this.spdY = spdY;
        if (data.id != c3) this.playerAngle = pInt(data.playerAngle);
    };

    //so we know when we got healed
    RD.prototype.applyAuxUpdate = function (data) {
        if (!this.activated) return;
        if (data.color          !== undefined && data.color          != "") this.color          = data.color;
        if (data.radius         !== undefined && data.radius         != "") this.radius         = pInt(data.radius / 10);
        if (data.dashing        !== undefined && data.dashing        != "") this.dashing        = pInt(data.dashing);
        if (data.ghillie        !== undefined && data.ghillie        != "") this.ghillie        = pInt(data.ghillie);
        if (data.shooting       !== undefined && data.shooting       != "") this.shooting       = pInt(data.shooting);
        if (data.isLeader       !== undefined && data.isLeader       != "") this.isLeader       = pInt(data.isLeader);
        if (data.reloading      !== undefined && data.reloading      != "") this.reloading      = pInt(data.reloading);
        if (data.maxBullets     !== undefined && data.maxBullets     != "") this.maxBullets     = pInt(data.maxBullets);
        if (data.invincible     !== undefined && data.invincible     != "") this.invincible     = pInt(data.invincible);
        if (data.armorAmount    !== undefined && data.armorAmount    != "") this.armorAmount    = pInt(data.armorAmount);
        if (data.chatBoxOpen    !== undefined && data.chatBoxOpen    != "") this.chatBoxOpen    = pInt(data.chatBoxOpen);
        if (data.currentBullets !== undefined && data.currentBullets != "") this.currentBullets = pInt(data.currentBullets);
        if (data.hp !== undefined && data.hp != "") {
            let newHp = pInt(data.hp);
            if (this.hp + 1 < newHp) onHeal(this.id);
            this.hp = newHp;
        }
        if (data.beingHit !== undefined && data.beingHit != "") {
            if (data.id == c3) j37 = 6;
            this.beingHit = pInt(data.beingHit)
        }
        if (data.j47 !== undefined && data.j47 != "") {
            this.j47 = data.j47.replace(/~/g, ",");
            this.j47Timer = 200;
        }
    };

    //extra toggleable stuff when the user right clicks
    document.oncontextmenu = e => {

        if (c2) {

            //positional
            let me = RD.pool[c3],
                x = -c2.x - e.clientX / j6,
                y = -c2.y - e.clientY / j5;

            //if hovering over a player, add them to the friends list
            for (let player of getPool(RD)) {

                //if the player that we are aiming over is not us and also has their mouse over
                if (player.activated && player.id != me.id && (player.x + x) ** 2 + (player.y + y) ** 2 <= (player.radius + 2) ** 2) {

                    //either add or remove them to the friendslist
                    toggleUsernameInFriendslist(player.username);

                    //stop friending any more players and dont toggle aimbot
                    return;
                }
            }
        }

        //toggle aimbot if not over a player
        settings[enums.SETTINGS_AIMBOT] = !settings[enums.SETTINGS_AIMBOT];
        saveSettings();
        refreshMenu();

        //reset aiming direction to the cursor
        if (!settings[enums.SETTINGS_AIMBOT]) {
            a57({ clientX: cursor.x, clientY: cursor.y });
            a37();
        }
    };

    //yes i could use addEventListener but I felt like doing it this way anyway
    document.onkeydown = keyEvent => {

        //prevents stupidness
        if (textBoxFocused && !keyEvent.isFromCheat) return;

        oldKeyDown(keyEvent);

        //dont do anything if chat input box is open or if the keypress is not bound to anything in the cheat
        if (j46 || !Object.values(keyCodeMap).includes(keyEvent.keyCode)) return;

        keyEvent.preventDefault();
        if (keyEvent.keyCode !== keyCodeMap.T) {
            if (!settings[enums.SETTINGS_CHATBINDS]) return;
            swapMessage = !swapMessage;
        }

        switch (keyEvent.keyCode) {

            //hide the 'this person is typing' thing from others when writing something
            //doesnt work lmao
            case keyCodeMap.ENTER:
                //immitates "this person isn't typing anymore" packet
                if (!j46) break;
                j46 = false;
                RF.list[0].send(a59("key-press", {inputId: 7, state: 0}));
                break;

            //make the player call for a medic when they press E
            case keyCodeMap.E:
                sendChatMessage(swapMessage ? 'Medic!' : 'Medkit!');
                break;

            //pootis
            case keyCodeMap.Z:
                sendChatMessage(swapMessage ? 'Put Dispenser here!' : 'Need a Dispenser here!');
                break;

            //toggle visibility of the menu
            case keyCodeMap.T:
                menuUp = !menuUp;
                refreshMenu();
        }
    };

    a57 = (event, bot) => {

        //if the aimbot is aiming for the player, dont accept movement events from the player himself
        if (aimbotFocused && !bot) return;

        let relPos = c2.getRelPos(RD.pool[c3]);
        if (!bot) {
            relPos.x *= j6;
            relPos.y *= j5;
        }
        relPos.x -= event.clientX;
        relPos.y -= event.clientY;
        let mouseAngle = Math.atan2(relPos.y, relPos.x) / degToRad + 180,
            playerAngle = mouseAngle + Math.asin(18 / Math.sqrt(relPos.x ** 2 + relPos.y ** 2)) / degToRad;
        j9[0] = event.clientX;
        j9[1] = event.clientY;
        j39 = Math.sqrt(relPos.x ** 2 + relPos.y ** 2);
        j16[0] = Math.round(relPos.x);
        j16[1] = Math.round(relPos.y);
        j16[2] = Math.round(mouseAngle);
        if (!playerAngle && playerAngle !== 0) playerAngle = mouseAngle;
        RD.pool[c3].mouseAngle = Math.round(mouseAngle);
        RD.pool[c3].playerAngle = Math.round(playerAngle);
    };

    //hook to check if specific stuff should be ran by the cheat depending on the message that is received
    b18 = wsMsgEvent => {

        //let the game parse the websocket message like nothing suspicious is happening at all :))))))
        old_b18(wsMsgEvent);

        //message parsing
        for (let data of a67(wsMsgEvent.data).split('|')) {
            data = a61(data);
            if (!data) continue;
            switch (data.code) {

                //re-fixing the camera so it does not move around much
                case 'a':
                    fixCamera();
                    break;

                //handle notifications
                case "r":
                    let type = pInt(data.type);
                    if (type == 1) onKill(data.content);
                    if (type == 2 || type == 9) onDeath(data.content);
                    if (type == 5) onAFK();
                    break;
            }
        }
    };

    //replace the tick function with a heavily modified one
    a41 = () => {
        let start = Date.now(),
            renderDisplayPadding = 5;

        //modified game loop tick
        if (!c4 && !b21 && window.location.pathname != "/model") a29();
        if (c3 != null) {

            //auto-zoom hack
            //zooming further than this brings no positives
            //this still fucks up when the aspect ratio isn't perfect but I don't want to fix that
            if (settings[enums.SETTINGS_ZOOM] && (j7 != 2000 || j8 != 1000)) {
                normalCameraScale.width = j7;
                normalCameraScale.height = j8;
                j7 = 2000;
                j8 = 1000;
                a1();
            } else if (!settings[enums.SETTINGS_ZOOM] && (j7 == 2000 && j8 == 1000)) {
                j7 = normalCameraScale.width;
                j8 = normalCameraScale.height;
                a1();
            }

            //shows landmines
            for (let i in landMine[0]) landMine[0][i][1][3] = settings[enums.SETTINGS_SHOWINVIS] ? '#000000' : '#e8e8ed';

            j17 = false;
            j58.clearRect(0, 0, canvas.width, canvas.height);
            c2.update();
            a16(j58, c2);
            for (var i in RA.pool) {
                if (!RA.pool[i].activated || RA.pool[i].type != "landMine") continue;
                RA.pool[i].update();
                RA.pool[i].draw(j58, c2);
            }
            for (var i in RC.pool) {
                if (!RC.pool[i].activated) continue;
                if (!RC.pool[i].tempAccX) RC.pool[i].tempAccX = 0;
                if (!RC.pool[i].tempAccY) RC.pool[i].tempAccY = 0;
                RC.pool[i].silenced = 0; //show silencers
                RC.pool[i].update();
                RC.pool[i].draw(j58, c2);
            }
            for (var i in RB.pool) {
                if (!RB.pool[i].activated) continue;
                RB.pool[i].update();
                RB.pool[i].draw(j58, c2);
            }
            for (var i in RA.pool) {
                if (!RA.pool[i].activated || RA.pool[i].type == "landMine") continue;
                if (!RA.pool[i].timeAliveExtra) RA.pool[i].timeAliveExtra = 0;
                RA.pool[i].update();
                RA.pool[i].draw(j58, c2);
            }
            for (var i in RD.pool) {
                if (!RD.pool[i].activated || (c28 && RD.pool[i].id == c3)) continue;
                RD.pool[i].ghillie = 0; //show ghillie
                RD.pool[i].update();
                RD.pool[i].drawBody(j58, c2);
                RD.pool[i].drawGun(j58, c2);
            }
            for (var i in RA.pool) if (RA.pool[i].activated) RA.pool[i].drawEmission(j58, c2);
            for (var i in j27) {
                var hitParticle = j27[i];
                if (hitParticle.c42++ < 5) {
                    j26(c2, hitParticle.x, hitParticle.y);
                } else {
                    delete hitParticle[i];
                }
            }
            a55(j58, c2);
            //underscore to prevent variable name collision
            var _me = RD.pool[c3];
            if (settings[enums.SETTINGS_STATICHUD]) {
                c5 = _me.hp;
                c6 = _me.armorAmount;
                c7 = _me.score;
            }
            if (settings[enums.SETTINGS_AUTOUPGRADE]) autoUpgrade(_me);

            //fixes hud visual glitches
            //for some reason this works without major errors?
            j9 = [cursor.x, cursor.y];

            a9(_me);
            a100(_me);
            a13(j58, c8);
            a44(j58, j38);
        }
        a113();
        a56();

        //:trolleybus:
        j9[0] /= j6;
        j9[1] /= j5;

        //if any menu is needing a canvas right now
        updateMenuCanvas();

        //server latency display
        if (settings[enums.SETTINGS_PINGDISPLAY]) renderDisplayPadding += pingDisplay() + 5;

        //draw the time taken to draw everything in the last frame
        if (settings[enums.SETTINGS_RENDERDISPLAY]) {
            j58.font = 'bold 14px consolas';
            drawText(renderDisplayPadding, 15, 'Render time: ' + renderTime + 'ms', '#fff');
        }

        //only do shit when in a game, else the cheat breaks
        if (c2) {
            j58.font = 'bold 20px consolas';

            //get all valid players
            let players = [],
                me = RD.pool[c3],
                playerScreenPos = c2.getRelPos(me),
                offset = {x: playerScreenPos.x - me.x, y: playerScreenPos.y - me.y};
            for (let player of getPool(RD)) if (player.activated && player.id != me.id && player.hp != 0) players.push(player);

            //draw tracers
            for (let player of players) {

                //if they have no bullets and they arent reloading, assume they have max bullets
                //because the server doesnt send accurate currentbullets info unless the other players update their bullet count in any way
                if (!player.reloading && player.currentBullets == 0) player.currentBullets = player.maxBullets;

                //the tracer
                if (settings[enums.SETTINGS_TRACERS]) drawLine(playerScreenPos, player, offset, 1);

                //make a dark circle to tell friends apart
                if (friends.includes(sanitiseName(player.username))) {
                    j58.globalAlpha = 0.5;
                    drawCircle(player, offset, player.radius * 1.4, 5, 'black');

                //show that they wont be shot at because they are chatting and the ignorechatting option is enabled
                } else if (settings[enums.SETTINGS_IGNORECHATTING] && player.chatBoxOpen) {
                    j58.globalAlpha = 0.25;
                    drawCircle(player, offset, player.radius * 1.4, 5, 'black');
                }

                //dont make the health value text transparent
                j58.globalAlpha = 1;

                //draw the health values (hp and armor) either above or below the player
                //could be more elegant, but ehh
                if (settings[enums.SETTINGS_SHOWHEALTH]) {
                    let x = player.x + offset.x - player.radius,
                        y = player.y + offset.y - (player.radius + 6);

                    //move health text further down if the player is chatting and above the upper half of the screen
                    //figuring out the exact offset values took 2 whole days of trial and error for some reason.
                    drawText(x, y, player.hp, getColor(player));
                    drawText(x, y - 20, player.armorAmount, '#666');
                    drawText(x, y - 40, player.currentBullets + '/' + player.maxBullets, '#000');
                }
            }

            //draw team affiliations of various stuff
            if (settings[enums.SETTINGS_REVEALTEAMS]) {
                for (let item of getPool(RA)) {
                    if (!item.activated) continue;

                    //landmines
                    if (item.type == 'landMine') {
                        drawCircle(item, offset, 20, 2);
                    
                    //gas
                    } else if (item.emitting) {
                        drawCircle(item, offset, item.emissionRadius, 2);
                    
                    //grenades
                    } else {
                        drawCircle(item, offset, 10, 2);

                        //a line from where they are to roughly where they will be
                        if (settings[enums.SETTINGS_TRACERS] && item.timeAlive < item.travelTime) {
                            let factor = (item.travelTime - (item.timeAlive + item.timeAliveExtra)) * 2.5;
                            item.timeAliveExtra += third;
                            drawLine2(item, {x: item.spdX * factor, y: item.spdY * factor}, offset, 1);
                        }
                    }
                }

                //reveal team affiliations of knifes
                for (let knife of getPool(RC)) if (knife.activated && knife.isKnife) drawCircle(knife, offset, 5, 2);
            }

            //if you dont understand this then i suggest asking your doctor to reverse that lobotomy
            let target = getTarget(me, offset, players);

            //enables the user's own mouse movement
            aimbotFocused = false;

            if (settings[enums.SETTINGS_AIMBOT]) {

                //disables the user's own mouse movement
                //aimbot is taking control over mouse movement now
                aimbotFocused = target.enemy != null;

                //if there is an enemy to rudely stare at, then look at them
                if (aimbotFocused) {

                    //figure out the angle to aim at so our shots hit the enemy, hopefully
                    aimTorwards(target.enemy, offset, target.distance);

                    //draw a thicker tracer to indicate that this is the one the aimbot is aiming at
                    //literally just draw a second line over the thinner one
                    if (settings[enums.SETTINGS_TRACERS]) drawLine(playerScreenPos, target.enemy, offset, 3);
                }

                //visual indicator that aimbot is enabled
                drawCircle(me, offset, 10, 2, 'black');
            }

            //if we are reloading and that setting is enabled, just spin so hopefully the enemy doesnt see how long it is until we finished reloading
            //TODO: make the reloading
            let connection = RF.list[0];
            if (me.reloading && settings[enums.SETTINGS_RELOADSPIN]/* && (me.reloadingFrame + connection.) */) {
                let r_1 = Math.PI * Math.random(), r_2 = me.radius + Math.random() * 100;
                a57({
                    clientX: j13 + (r_2 * Math.sin(r_1)),
                    clientY: j14 + (r_2 * Math.cos(r_1))
                }, true);
            }

            //auto reload the gun if: not fully reloaded, not currently reloading, there are no enemies nearby, the player isnt shooting for no reason
            //reloads by pressing R to tell game to reload the gun
            if (settings[enums.SETTINGS_AUTORELOAD] && !(target.isItABadIdeaToReloadRightNow || j18.x || j18.y || me.shooting || me.reloading || me.maxBullets == me.currentBullets)) pressKey(keyCodeMap.R);

            //draw a laser from the gun to the mouse cursor
            //TODO: make the laser aim at where the aimbot or the user would be pointing at if the reload spin is enabled
            if (settings[enums.SETTINGS_TRACERS]) {
                let newAngle = (me.playerAngle + 210) * -degToRad,

                    //the  H A N D  of  P O W E R R R R R
                    hand = {
                        x: playerScreenPos.x + Math.sin(newAngle) * me.radius,
                        y: playerScreenPos.y + Math.cos(newAngle) * me.radius
                    };

                //scuffed
                drawLine2(hand, {x: j9[0] - hand.x, y: j9[1] - hand.y}, nullPos, 1, 'black');

                let gun = gunMap[c1.weapon],
                    gunOffset = offsets[gun] + velocities[gun] - 14,
                    gunAngle = (me.playerAngle + 270) * -degToRad;
                drawCircle({
                    x: hand.x + Math.sin(gunAngle) * gunOffset,
                    y: hand.y + Math.cos(gunAngle) * gunOffset
                }, nullPos, 1, 2, 'red');

                //TODO: show where the gun would be pointing at when finished reloading
                /*
                if (me.reloading && settings[enums.SETTINGS_RELOADSPIN]) {
                    ctx.globalAlpha = 0.5;
                }
                */
            }
        }
        a37();

        //simplified next tick delay function
        if (RF.list[0]) RF.list[0].check();

        //guarantees that the next tick will happen in 16 since when this tick started
        renderTime = Date.now() - start;
        setTimeout(a41, 16 - renderTime);
    };

    //make the hack menu
    loadSettings();
    createMenu();

    //get average recent ping instead of a very fluctuating value
    //also max ping and min ping aswell
    //used for the aimbot setting that accounts for server latency
    RF.prototype.a74 = function () {
        this.pingReceivedTime = (new Date).getTime();
        this.currentPing = this.pingReceivedTime - this.pingSentTime;
        if (!this.pings) this.pings = [];
        this.pings.push(this.currentPing);
        if (this.pings.length > 10) this.pings.shift();
        this.averagePing = 0;
        for (let ping of this.pings) this.averagePing += ping;
        this.averagePing /= this.pings.length;
        this.minPing = Math.min(...this.pings);
        this.maxPing = Math.max(...this.pings); //lag spikes? L
        ++this.numSuccessfulPings;
    };

    //better display for crate healths
    RB.prototype.draw = function(ctx, camera) {
        if (!this.model) return;
        if (this.model.length > 1) {
            this.animationFrame < this.model.length - 1 ? this.animationFrame++ : this.animationFrame = 0;
            a38(ctx, camera, this.getAttr(), this.angle, this.model[this.animationFrame]);
        } else if (this.type == "userCrate") {

            //to be honiest this just looks way nicer.
            var hpPercent = this.hp / this.maxHp,
                model = this.model,
                color = this.isPremium ? [ 240, 186, 55 ] : [ 83, 198, 140 ];
            model[0][1][1][3] = '#';
            for (let value of color) model[0][1][1][3] += lerpR(255, value, hpPercent).toString(16);
            a38(ctx, camera, this.getAttr(), this.angle, model[0]);

        } else {
            a38(ctx, camera, this.getAttr(), this.angle, this.model[0]);
        }
    };

    //option to disable health radius change animations
    RD.prototype.updateHpRadius = function() {
        var hpRadius = Math.round(this.hp * (this.radius - this.armorAmount / 10 - 1) / 100);
        if (settings[enums.SETTINGS_STATICHEALTH]) {
            this.hpRadius = hpRadius;

        //if end user wants to keep health animations
        } else {
            if (this.hpRadius > hpRadius - 0.5 && this.hpRadius < hpRadius + 0.5) {
                this.hpRadius = hpRadius;
            } else if (this.hpRadius > hpRadius) {
                this.hpRadius = this.hpRadius - 0.5;
            } else if (this.hpRadius < hpRadius) {
                this.hpRadius = this.hpRadius + 0.5;
            }
            if (this.hpRadius < 0) this.hpRadius = 0;
        }
    };

    //related to the tracer that draws to where a grenade lands
    RA.prototype.applyUpdate = function(data) {
        this.x = pInt(data.x / 10);
        this.y = pInt(data.y / 10);
        this.exploding = pInt(data.exploding);
        this.emitting = pInt(data.emitting);
        this.emissionRadius = pInt(data.emissionRadius / 10);
        this.timeAliveExtra = 0;
        this.timeAlive++;
    };

    //keeping track of the mouse's actual position
    document.onmousemove = mouseEvent => {
        cursor.x = mouseEvent.clientX;
        cursor.y = mouseEvent.clientY;
        if (c3) a57(mouseEvent);
    };

    //fix a bug related to aiming
    a37 = ()=>{
        //thank you dygn for coding packet sending in such a weird way
        let str = a60("mouse-move", {mouseX: j16[0], mouseY: j16[1], mouseAngle: j16[2]});

        if (RF.list[0] !== undefined && str !== j15) {

            //convert string to bytes then send
            RF.list[0].send(a66(str));

            //j15 isnt const so we can reuse it for whatever purpose
            j15 = str;
        }
    };

    //this disables ad related functions
    a119=()=>{};a78=()=>{};a79=()=>{};a80=()=>{};

    //this removes ad elements
    for (var ad of j36) document.getElementById(ad.pl).remove();

    //if the player is loading the cheat while in a game
    if (c2) fixCamera();

    //make the reconnect button... yknow... ACTUALLY RECONNECT INSTEAD OF RELOADING THE WEBSITE LIKE A NORMAL GAME
    reloadGame = () => a120(o4.server, c22);

    //fixes stupidness about the auto upgrader
    a36 = () => {
        c8 = {1: false, 2: false, 3: false};
        o3 = {1: "", 2: "", 3: ""};
        a2("c1", c1.weapon + "," + c1.armor + "," + c1.armorBtn + "," + c1.color, 365);
    };

    //instant reconnect attempt on load
    if (document.getElementById('reconnectButton').style.display == 'block') reloadGame();

    //this popup is FUCKING ANNOYING I SWEAR TO GOD
    window.onbeforeunload = event => {
        if (!settings[enums.SETTINGS_DISABLECLOSEPOPUP] && b3) {
            event.preventDefault();
            return event.returnValue = "You're still logged in. Are you sure you want to leave?";
        }
    };

    //stuff related to repositioning the menu a little bit depending on the menu update
    a75 = () => {
        old_a75();
        window.onresize();
    };
    play = () => {
        old_play();
        window.onresize();
    };

    //no idea why the reconnect screen doesnt have server select but this function mod adds that now
    //it also stops the game from killing several modals if the user is interacting with them
    a45 = () => {
        console.log("Disconnect Called!");
        !b15 && a93();
        a4();
        a75();
        b4 = null;
        b38 = null;
        selfPremiumMember = false;
        b3 = false;
        b2 = false;
        b1 = false;
        $("#hostServerTabLi").hide();
        $("#playButton").hide();
        document.getElementById("gametypeDropdown").style.display = "block";
        document.getElementById("serversBtn").style.display = "flex";
        a99();
    }

    //just making some stuff look better
    document.getElementById("playButton").style.height = '55px';
    document.getElementById("playButton").style['margin-top'] = '0px';
    document.getElementById("playButton").style['border-width'] = '4px';
    document.getElementById("reconnectButton").style.height = '55px';
    document.getElementById("reconnectButton").style['margin-top'] = '0px';
    document.getElementById("reconnectButton").style['border-width'] = '4px';
    document.getElementById("reconnectButton").style['border-color'] = '#767676';
})();
