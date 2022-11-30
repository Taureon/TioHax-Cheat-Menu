/* jshint esversion: 8*/

/*
 * TODO:
 * + better acceleration for aimbot (https://math.stackexchange.com/a/4538831/1099868)
 * + detecting direction a player wants to go to based on velocity and acceleration
 * + try to guess mid perk timeout and also perks in general. suggested by ravgo
 * + Auto Respawn using 2nd connection
 * + Coords
 * + split silencer reveal, camo reveal and landmine reveal into different things (drop down menu)
 * + Seperate Team and Enemy Tracers (drop down menu)
 * + "render players above everything" setting
 */
(function main() {

    //now, this cheat obviously wouldn't work on sites that aren't gats.io
    if (location.host != 'gats.io' && location.host != 'gats2.com') return alert('This inject can only be ran on gats.io!');

    //if the game hasn't loaded yet, wait until it is loaded
    //it is checked if the game has loaded by checking if the game tick function exists
    if (typeof a41 !== 'function') return setTimeout(main);

    //these get computed and replaced by the closure compiler
    //heavily increases obfuscation (prevention of code stealing) while decreasing code size and code complexity
    let enumsCharDict = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$",

        ATTRIBUTE_USERNAMEHASH = enumsCharDict[0],
        ATTRIBUTE_PREVACCX = enumsCharDict[1],
        ATTRIBUTE_PREVACCY = enumsCharDict[2],
        ATTRIBUTE_ACCX = enumsCharDict[3],
        ATTRIBUTE_ACCY = enumsCharDict[4],
        ATTRIBUTE_HITBOX = enumsCharDict[5],
        ATTRIBUTE_HITBOXOFFSET = enumsCharDict[6],
        ATTRIBUTE_HITBOXRADIUS = enumsCharDict[7],
        ATTRIBUTE_HITBOXFORWARDOFFSET = enumsCharDict[8],
        ATTRIBUTE_BULLETCOLLISIONS = enumsCharDict[9],
        ATTRIBUTE_WIDTH = enumsCharDict[10],
        ATTRIBUTE_HEIGHT = enumsCharDict[11],
        ATTRIBUTE_PINGS = enumsCharDict[12],
        ATTRIBUTE_AVERAGEPING = enumsCharDict[13],
        ATTRIBUTE_MINPING = enumsCharDict[14],
        ATTRIBUTE_MAXPING = enumsCharDict[15],
        ATTRIBUTE_TIMEALIVEEXTRA = enumsCharDict[16],
        ATTRIBUTE_ISFROMCHEAT = enumsCharDict[17],
        ATTRIBUTE_TAGGEDNAME = enumsCharDict[18],

        METHOD_FILLHITBOX = enumsCharDict[0],
        METHOD_MAKEHITBOX = enumsCharDict[1],

        KEYCODE_ESC = enumsCharDict[0],
        KEYCODE_A = enumsCharDict[1],
        KEYCODE_E = enumsCharDict[2],
        KEYCODE_D = enumsCharDict[3],
        KEYCODE_R = enumsCharDict[4],
        KEYCODE_S = enumsCharDict[5],
        KEYCODE_T = enumsCharDict[6],
        KEYCODE_W = enumsCharDict[7],
        KEYCODE_Z = enumsCharDict[8],
        KEYCODE_ENTER = enumsCharDict[9],
        KEYCODE_SPACE = enumsCharDict[10],
        KEYCODE_ARROWLEFT = enumsCharDict[11],
        KEYCODE_ARROWRIGHT = enumsCharDict[12],
        KEYCODE_ARROWUP = enumsCharDict[13],
        KEYCODE_ARROWDOWN = enumsCharDict[14],
        KEYCODE_N = enumsCharDict[15],

        INSTANTCHAT_CHATBINDS = enumsCharDict[0],
        INSTANTCHAT_CHATBINDSTEXTS = enumsCharDict[1],
        INSTANTCHAT_ONKILL = enumsCharDict[2],
        INSTANTCHAT_ONKILLTEXT = enumsCharDict[3],
        INSTANTCHAT_ONDEATH = enumsCharDict[4],
        INSTANTCHAT_ONDEATHTEXT = enumsCharDict[5],
        INSTANTCHAT_AUTOTHANK = enumsCharDict[6],
        INSTANTCHAT_AUTOTHANKTEXT = enumsCharDict[7],

        AIMBOT_ENABLE = enumsCharDict[0],
        AIMBOT_AIMSMOOTHING = enumsCharDict[1],
        AIMBOT_CURSORPROXIMITY = enumsCharDict[2],
        AIMBOT_USEACCELERATION = enumsCharDict[3],
        AIMBOT_IGNORECHATTING = enumsCharDict[4],
        AIMBOT_PINGCOMPENSATION = enumsCharDict[5],
        AIMBOT_TRIGGERBOT = enumsCharDict[6],
        AIMBOT_WALLCHECK = enumsCharDict[7],
        AIMBOT_USEAHEAD = enumsCharDict[8],
        AIMBOT_DISABLEWHENDASHING = enumsCharDict[9],
        AIMBOT_CURSORPROXCOSENESS = enumsCharDict[10],
        AIMBOT_TARGETMODE = enumsCharDict[11],
        AIMBOT_TRIGGERBOTWHENDOWN = enumsCharDict[12],
        AIMBOT_RIGHTCLICKFRIEND = enumsCharDict[13],
        AIMBOT_AUXCLICKTARGET = enumsCharDict[14],
        AIMBOT_DROPDOWN_GENERAL = enumsCharDict[15],
        AIMBOT_DROPDOWN_ENHANCED = enumsCharDict[16],
        AIMBOT_DROPDOWN_CURSORPROX = enumsCharDict[17],
        AIMBOT_DROPDOWN_SMART = enumsCharDict[18],
        AIMBOT_DROPDOWN_PRIORITY = enumsCharDict[19],
        AIMBOT_DROPDOWN_TRIGGERBOT = enumsCharDict[20],
        AIMBOT_TARGETSONLY = enumsCharDict[21],

        ESP_ZOOM = enumsCharDict[0],
        ESP_FIXCAMERA = enumsCharDict[1],
        ESP_TRACERSBODYENEMY = enumsCharDict[2],
        ESP_TRACERSCURSORENEMY = enumsCharDict[3],
        ESP_TRACERSWALLCHECK = enumsCharDict[4],
        ESP_TRACERSGUN = enumsCharDict[5],
        ESP_TRACERSGRENADES = enumsCharDict[6],
        ESP_SHOWINVIS = enumsCharDict[7],
        ESP_REVEALTEAMS = enumsCharDict[8],
        ESP_SHOWHEALTH = enumsCharDict[9],
        ESP_SHOWARMOR = enumsCharDict[10],
        ESP_SHOWMAGS = enumsCharDict[11],
        ESP_SHOWGUNSTATUS = enumsCharDict[12],
        ESP_CAMUSEREALPOSITION = enumsCharDict[13],
        ESP_INCLUDEYOU = enumsCharDict[14],
        ESP_DROPDOWN_CAMERA = enumsCharDict[15],
        ESP_DROPDOWN_TRACERS = enumsCharDict[16],
        ESP_DROPDOWN_PLAYERSTATS = enumsCharDict[17],
        ESP_DROPDOWN_OTHER = enumsCharDict[18],
        ESP_SHOWRANGE = enumsCharDict[19],

        CHATSCROLLER_TEXT = enumsCharDict[0],
        CHATSCROLLER_WIDTH = enumsCharDict[1],
        CHATSCROLLER_INTERVAL = enumsCharDict[2],
        CHATSCROLLER_DIRECTION = enumsCharDict[3],
        CHATSCROLLER_SEPERATOR = enumsCharDict[4],
        CHATSCROLLER_INDEX = enumsCharDict[5],
        CHATSCROLLER_TIMEOUT = enumsCharDict[6],
        CHATSCROLLER_PAUSEPERIOD = enumsCharDict[7],
        CHATSCROLLER_VARIATION = enumsCharDict[8],

        ANTIAIM_RELOAD = enumsCharDict[0],
        ANTIAIM_SHOOT = enumsCharDict[1],
        ANTIAIM_IDLE = enumsCharDict[2],
        ANTIAIM_ANGLESTART = enumsCharDict[3],
        ANTIAIM_ANGLERANGE = enumsCharDict[4],
        ANTIAIM_SPINSPEED = enumsCharDict[5],
        ANTIAIM_DELAY = enumsCharDict[6],
        ANTIAIM_SAVEDX = enumsCharDict[7],
        ANTIAIM_SAVEDY = enumsCharDict[8],
        ANTIAIM_DRAWREALAIM = enumsCharDict[9],

        RECORDER_ISRECORDING = enumsCharDict[0],
        RECORDER_CURRENT = enumsCharDict[1],
        RECORDER_SESSIONS = enumsCharDict[2],
        RECORDER_ISPLAYING = enumsCharDict[3],
        RECORDER_TIMEOUT = enumsCharDict[4],
        RECORDER_SESSIONTOPLAY = enumsCharDict[5],

        MISC_AUTORELOAD = enumsCharDict[0],
        MISC_PINGDISPLAY = enumsCharDict[1],
        MISC_RENDERDISPLAY = enumsCharDict[2],
        MISC_STATICHUD = enumsCharDict[3],
        MISC_STATICHEALTH = enumsCharDict[4],
        MISC_DISABLECLOSEPOPUP = enumsCharDict[5],
        MISC_BETTERCRATEHP = enumsCharDict[6],
        MISC_HIDECHATTING = enumsCharDict[7],
        MISC_FFACLANDISPLAY = enumsCharDict[8],
        MISC_SHOWFEATURES = enumsCharDict[9],

        THNET_SOCKET = enumsCharDict[0],
        THNET_ENABLE = enumsCharDict[1],
        THNET_DISCONNECT = enumsCharDict[2],
        THNET_MEMBERS = enumsCharDict[3],

        ADVANCED_PINGCOUNT = enumsCharDict[0],
        ADVANCED_AIMCONSTANT = enumsCharDict[1],
        ADVANCED_AIMCONSTANTSMOOTH = enumsCharDict[2],
        ADVANCED_TPS = enumsCharDict[3],
        ADVANCED_OPTIMISEWALLCHECK = enumsCharDict[4],
        ADVANCED_PINGCOMP = enumsCharDict[5],

        PERKBOTS_KNIFE = enumsCharDict[0],
        PERKBOTS_KNIFEMAXRANGE = enumsCharDict[1],
        PERKBOTS_KNIFETICK = enumsCharDict[2],

        CONTROLTYPE_TOGGLE = 0,
        CONTROLTYPE_VALUE = 1,

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
                "You can scroll in some menus by either using your mouse wheel or moving the scroll bar at the right side of the menu.",

                'Moving',
                'You can drag the menu around by holding the title element.'
            ], [
                'Settings',

                'Toggles and Values',
                "You can toggle On/Off settings by simply clicking on them. "
                +"You can change Value settings by clicking the [+] or [-] buttons next to them or by using your scroll wheel on the value display. "
                +"To know what a setting does, hover over the setting, since most controls have tooltips added.",

                'Special Controls',
                "Some menus use custom controls like text inputs, perk selection and more. "
                +"Though most of those special controls don't need an introduction (as I think it is self explanatory enough, correct me if i'm wrong), "
                +"but for Auto Upgrade, you can click a perk you have already selected to unselect it.",

                'Empty Menus',
                "Some menus (Paint and Recorder) don't have menu contents, which means they will be eventually added, probably...",

                'Imperfect Features',
                'Some features may decrease your effectiveness or may cause other issues, please report the issues if that is the case.',

                'Saving',
                "When you change any setting, it gets saved, which means if you reload, the settings won't be lost!"
            ], [
                'Contact',

                'Discord',
                "We have a discord where you can talk with fellow TioHax users and even the Developer himself! https://discord.gg/CwWd5UKf6R"
            ]
        ],

        credits = [
            [
                'Developing',
                'Main Developer of this Cheat Software',
                'Taureon',
                'For helping with technical stuff',
                'Vaakir & Nitrogem35',
                'Providing an API for the FFA Clan Display feature',
                'Nitrogem35'
            ], [
                'Playtesting',
                'Finding dumb bugs and general playtesting',
                'Ravgo'
            ], [
                'Inspiration',
                'Making my own Cheat Client',
                'Vaakir',
                'Providing me with moral justifications',
                'GodF4ther, cat421, CrimAnn, SHTURM and pretty much the rest of the Gats.io Community, you toxic idiots'
            ], [
                'Special Thanks',
                'You!',
                'For using this cheat! Thank you so much!'
            ]
        ],

        //if the current enviroment is tampermonkey
        isUserscript = typeof GM === 'object' || typeof GM_info === 'object',

        //make sure closure compiler deals with that aswell
        ctx = j58,

        //used to make math easier to read
        doublePI = Math.PI * 2,
        degToRad = doublePI / 360,
        third = 1 / 3,
        nullPos = {x: 0, y: 0},
        mathSin = Math.sin(degToRad * 60),

        //whoever I am giving this cheat to so I know who leaked it if it ever gets leaked
        //clear = dev testing  or public
        DRMuser = '',

        idRefreshMenu = 0,

        //hash of the developer's ign
        //this is 'TheS3xHaver' but hashed with hashString() function
        developerHash = -1599485949,

        //time it took to render a frame
        renderTime = 0,

        //how many ticks the main function has ran for
        tickCount = 0,

        //turning gun names to indexes
        gunMap = {
            'pistol': 0,
            'smg': 1,
            'shotgun': 2,
            'assault': 3,
            'sniper': 4,
            'lmg': 5,
            'bolt-action-rifle': 4,
            'machine-gun': 5
        },

        //bullet velocities of guns
        velocities = [24, 22, 24, 24, 30, 24, 20], //TODO: FIGURE OUT KNIFE SPEED

        //bullet spawn offsets based on gun lengths
        offsets = [44, 50, 55, 63, 75, 62, 0], // TODO:FIGURE OUT KNIFE OFFSET

        //how far each bullet travels
        ranges = [18, 13, 10, 18, 22, 16, 20], //TODO: FIGURE OUT KNIFE RANGE

        //stupidness
        textBoxFocused = 0,

        gunMinRange = 0,

        //when aim amoothing is enabled, those get used
        prevAimX = 0,
        prevAimY = 0,

        //cursor position that is independent of the game
        cursor = {x: 0, y: 0, isPressed: 0, isShooting: 0},

        moveMenu = {
            offsetX: 0,
            offsetY: 0,
            enable: 0
        },

        //used for toggling zoom on and off
        normalCameraScale = {width: 0, height: 0},

        clanTagCache = {},

        aimbotLabel = {
            [AIMBOT_ENABLE]: [
                'Toggle Aimbot',
                'Automatically aims your weapon at enemies, toggleable with right click',
            ],
            [AIMBOT_AIMSMOOTHING]: [
                'Aim Smoothing',
                "Makes aimbot's movement smoother",
            ],
            [AIMBOT_CURSORPROXIMITY]: [
                'Enable',
                'Whichever is closest to your cursor',
            ],
            [AIMBOT_USEACCELERATION]: [
                'Use Acceleration',
                "Tries to account for the enemy's velocity changes",
            ],
            [AIMBOT_IGNORECHATTING]: [
                'Ignore Chatting',
                'Ignores players who are typing',
            ],
            [AIMBOT_PINGCOMPENSATION]: [
                'Ping Compensation',
                'Tries to compensate for the internet connection',
            ],
            [AIMBOT_TRIGGERBOT]: [
                'Enable',
                'Shoots automatically when possible, requires Wall Check to be enabled (not recommended with single fire weapons)',
            ],
            [AIMBOT_WALLCHECK]: [
                'Wall Check',
                'Tries to not aim at enemies behind walls',
            ],
            [AIMBOT_USEAHEAD]: [
                'Use Ahead Check',
                'Use the position of where the enemy will be for wall check instead of where they are right now',
            ],
            [AIMBOT_DISABLEWHENDASHING]: [
                'Dash Disable',
                'Turns aimbot temporarily off when dashing',
            ],
            [AIMBOT_CURSORPROXCOSENESS]: [
                'Closeness',
                'How close an enemy needs to be to be targetted by the aimbot when in Cursor Proximity mode'
            ],
            [AIMBOT_TARGETMODE]: [
                'Target Mode',
                'Prioritizes targetted players over anything when applicable'
            ],
            [AIMBOT_TRIGGERBOTWHENDOWN]: [
                'When Mouse Down',
                'Triggerbot fires only when you shoot, suppresses manual firing when this and Triggerbot is enabled'
            ],
            [AIMBOT_RIGHTCLICKFRIEND]: [
                'Rightclick Friend',
                'When you Rightclick on someone, it adds them to the friends list'
            ],
            [AIMBOT_AUXCLICKTARGET]: [
                'Middleclick Target',
                'When you Middleclick on someone (Mouse-wheel when you press on it), it adds them to the targets list'
            ],
            [AIMBOT_TARGETSONLY]: [
                'Targets Only',
                "Ignores people you aren't targetting"
            ],
            [AIMBOT_DROPDOWN_GENERAL]: [
                'General',
                ''
            ],
            [AIMBOT_DROPDOWN_ENHANCED]: [
                'Enhancements',
                ''
            ],
            [AIMBOT_DROPDOWN_CURSORPROX]: [
                'Cursor Proximity',
                ''
            ],
            [AIMBOT_DROPDOWN_SMART]: [
                'Smarter Targeting',
                ''
            ],
            [AIMBOT_DROPDOWN_PRIORITY]: [
                'Priority',
                ''
            ],
            [AIMBOT_DROPDOWN_TRIGGERBOT]: [
                'Triggerbot',
                ''
            ]
        },

        espLabel = {
            [ESP_ZOOM]: [
                'Extended View',
                'Gives you maximum possible vision',
            ],
            [ESP_FIXCAMERA]: [
                'Fixed Camera',
                'Stops the camera from moving',
            ],
            [ESP_TRACERSBODYENEMY]: [
                'Player Tracers',
                'Draws a line from you to every player currently loaded in'
            ],
            [ESP_TRACERSCURSORENEMY]: [
                'CursorProx Tracers',
                'When Cursor Proximity is enabled, draws lines from your cursor to your enemies'
            ],
            [ESP_TRACERSWALLCHECK]: [
                'Wall Check Tracers',
                'Visualises the wall checking algorithm'
            ],
            [ESP_TRACERSGUN]: [
                'Gun Tracers',
                'Draws the line a bullet would go if you shot your gun'
            ],
            [ESP_TRACERSGRENADES]: [
                'Grenade Tracers',
                'Draws a line to where a grenade is to where the grenade will roughly land at'
            ],
            [ESP_SHOWINVIS]: [
                'Show Invisibles',
                'Shows silencers, camo players and landmines',
            ],
            [ESP_REVEALTEAMS]: [
                'Reveal Teams',
                'Reveals the team affiliations for grenades, landmines, gas and knifes',
            ],
            [ESP_SHOWHEALTH]: [
                'Healths',
                "Shows every players' current health",
            ],
            [ESP_SHOWARMOR]: [
                'Armors',
                "Shows every players' current armor",
            ],
            [ESP_SHOWMAGS]: [
                'Magazines',
                "Shows every players' current ammo counts",
            ],
            [ESP_SHOWGUNSTATUS]: [
                'Gun Status',
                "Shows every player's current gun status, i.e. Idle, Reloading or Shooting",
            ],
            [ESP_SHOWRANGE]: [
                'Ranges',
                'Shows how far players can shoot (may cause the game to look like a clusterfuck)'
            ],
            [ESP_CAMUSEREALPOSITION]: [
                'Camera Cursor Fix',
                'When Aimbot is on, this makes the Camera follow your Cursor, and not where the Aimbot tells the game where the Cursor is'
            ],
            [ESP_INCLUDEYOU]: [
                'Self Attributes',
                'Makes Player Healths, Player Armors, Player Magazines and Player Gun Status draw over you aswell'
            ],
            [ESP_DROPDOWN_CAMERA]: [
                'Camera',
                'Various Camera Improvement Settings'
            ],
            [ESP_DROPDOWN_TRACERS]: [
                'Tracers',
                'Some Lines and Circles'
            ],
            [ESP_DROPDOWN_PLAYERSTATS]: [
                'Player Attributes',
                'Helpful Attributes of nearby Players'
            ],
            [ESP_DROPDOWN_OTHER]: [
                'Other',
                'Other ESP Features'
            ]
        },

        autoUpgradesLabel = [
            [
                'Auto Upgrade',
                'Automatically upgrades specified perks for you'
            ]
        ],

        scrollerLabel = {
            [enumsCharDict[9]]: [
                'Toggle Scroller',
                'Turn the Chat Scroller either On or Off'
            ],
            [CHATSCROLLER_WIDTH]: [
                'Text Width',
                'Maximum width of the scrolled text'
            ],
            [CHATSCROLLER_DIRECTION]: [
                'Direction',
                'In which direction the text scrolls (- = left, + = right)'
            ],
            [CHATSCROLLER_INTERVAL]: [
                'Interval',
                'The interval it takes for the text to shift'
            ],
            [CHATSCROLLER_PAUSEPERIOD]: [
                'Pause Period',
                'When something besides the Scroller has said something in chat, for how long it should wait before it should scroll again'
            ],
            [CHATSCROLLER_TEXT]: [
                'Text',
                'The Text to scroll in Chat'
            ],
            [CHATSCROLLER_SEPERATOR]: [
                'Seperator',
                'The Seperator so it does not look like "hello worldhello worldhello world"'
            ]
        },

        instantchatLabel = {
            [INSTANTCHAT_CHATBINDS]: [
                'Chat Binds',
                'Press buttons to make the cheat instantly say something in chat for you',
            ],
            [INSTANTCHAT_CHATBINDSTEXTS]: [
                'Edit Binds',
                'Select a button on your keyboard to make the cheat say LITERALLY ANYTHING for you'
            ],
            [INSTANTCHAT_ONKILL]: [
                'On Kill Chat Msg',
                'Say something when you kill someone',
            ],
            [INSTANTCHAT_ONKILLTEXT]: [
                '', //this is empty because it is not used
                'Change the text you say when you kill someone'
            ],
            [INSTANTCHAT_ONDEATH]: [
                'On Death Chat Msg',
                'Say something when you die',
            ],
            [INSTANTCHAT_ONDEATHTEXT]: [
                '', //this is empty because it is not used
                'Change the text you say when you die'
            ],
            [INSTANTCHAT_AUTOTHANK]: [
                'Auto Medkit Thank',
                'Instantly say thanks when you get healed',
            ],
            [INSTANTCHAT_AUTOTHANKTEXT]: [
                '', //this is empty because it is not used
                'Change the text you say when you get healed'
            ]
        },

        antiAimLabel = {
            [ANTIAIM_RELOAD]: [
                'While Reloading',
                'To hide aim while reloading your gun'
            ],
            [ANTIAIM_SHOOT]: [
                'While Shooting',
                'To hide aim while shooting your gun'
            ],
            [ANTIAIM_IDLE]: [
                'While Idle',
                'To hide wim while neither shooting or reloading your gun (not recommended with single fire weapons)'
            ],
            [ANTIAIM_ANGLESTART]: [
                'Min Angle',
                'Minimum Angle where it starts off'
            ],
            [ANTIAIM_ANGLERANGE]: [
                'Angle Range',
                'Random additional angle from 0 to the angle range which gets added on the Minimum Angle'
            ],
            [ANTIAIM_SPINSPEED]: [
                'Spin Speed',
                'How fast it spins. Accepts negative numbers if you want it to spin the other direction'
            ],
            [ANTIAIM_DELAY]: [
                'Interval',
                'The amount of time (in game ticks) at which it picks another position to aim at'
            ],
            [ANTIAIM_DRAWREALAIM]: [
                'Draw Real Aim',
                "Draws the gun a second time as if Anti Aim wasn't enabled"
            ]
        },

        miscLabel = {
            [MISC_AUTORELOAD]: [
                'Auto Reload',
                'Automatically reloads when there are no enemies nearby',
            ],
            [MISC_PINGDISPLAY]: [
                'Ping Display',
                'Displays the latency to the server',
            ],
            [MISC_RENDERDISPLAY]: [
                'Render Time',
                'Displays how long it took to render the last frame',
            ],
            [MISC_STATICHUD]: [
                'Static Hud',
                'Disables hud animations',
            ],
            [MISC_STATICHEALTH]: [
                'Static Health',
                'Disables the hp moving animations on players when they take damage',
            ],
            [MISC_DISABLECLOSEPOPUP]: [
                'No Unload Popup',
                'Disable the unload popup when you leave or reload the game'
            ],
            [MISC_BETTERCRATEHP]: [
                'Better Crate HP',
                'Makes the health display pick colors better instead of just picking one of 5 colors'
            ],
            [MISC_HIDECHATTING]: [
                'Hide Chatbox',
                "Others won't see that you're typing, they'll just see you not move"
            ],
            [MISC_FFACLANDISPLAY]: [
                'FFA Clan Tags',
                'Shows clan tags next to names in FFA Mode'
            ],
            [MISC_SHOWFEATURES]: [
                'Feature Display',
                'Shows what main features are enabled in the bottom right corner'
            ]
        },

        advancedLabel = {
            [ADVANCED_PINGCOUNT]: [
                'Ping Cache',
                'How many recent ping times it stores'
            ],
            [ADVANCED_AIMCONSTANT]: [
                'Aim Const',
                'Lower = Aimbot aims further ahead'
            ],
            [ADVANCED_AIMCONSTANTSMOOTH]: [
                'Aim Const 2',
                'Same as Aim Constant but if Aimbot Smoothing is enabled'
            ],
            [ADVANCED_PINGCOMP]: [
                'PingComp',
                'How far the aimbot aims ahead depending on the ping. lower = further'
            ],
            [ADVANCED_TPS]: [
                'Sync TPS w/ Server',
                'Makes the game run at 25 ticks per second instead of 62.5'
            ],
            [ADVANCED_OPTIMISEWALLCHECK]: [
                'Optimise Wallcheck',
                'Optimises the checking for the wall checking algorithm'
            ]
        },

        perkBotsLabel = {
            [PERKBOTS_KNIFE]: [
                'KnifeBot Enable',
                'Automatically shoots a knife at a close enemy'
            ],
            [PERKBOTS_KNIFEMAXRANGE]: [
                'KnifeBot Range',
                'How close an enemy needs to be to be knifed'
            ]
        },

        THNetLabel = {
            [THNET_ENABLE]: [
                'Connect',
                'Connects to THNet when you join a server, bringing a variety of features'
            ],
            [THNET_DISCONNECT]: [
                'Disconnect',
                'Disconnect from THNet, your Aimbot will shoot at them but their Aimbots will also shoot you'
            ],
            [THNET_MEMBERS]: [
                'THNet Members',
                'The List of THNet Members in your current lobby'
            ]
        },

        //for if the player has made friends on the enemy team
        friends = [],

        //for if the player wants to really kill someone
        targets = [],

        //fellow tiohax users
        brothers = [],

        //0 = friends
        playermanagerSelectedMenu = 0,

        //the divs that make up the cheat menu
        divs = {
            menu: null,
            title: null,
            chatbox: null,
            content: null,
            backbutton: null,
        },

        //selected perk slot for auto upgrade menu
        selectedPerkSlot = 1,

        //all menu names
        menuNames = [
            'Guide', 'Aimbot', 'ESP', 'Instant Chat',
            'Misc', 'Player Manager', 'Auto Upgrades', 'Chat Scroller',
            'Anti Aim', 'Perk Bots',
            'Paint', 'Recorder', 'THNet',
            'Advanced', 'Credits'
        ],

        //functions that will be hooked
        //oldKeyDown = document.onkeydown,
        old_b18 = b18,

        //alternate chat bind messages so we don't get kicked for spam
        chatbindSpaceCount = 1,

        //key code map
        // http://www.foreui.com/articles/Key_Code_Table.htm
        keyCodeMap = {
            [KEYCODE_ESC]: 27,        [KEYCODE_A]: 65,       [KEYCODE_E]: 69,
            [KEYCODE_D]: 68,          [KEYCODE_R]: 82,       [KEYCODE_S]: 83,
            [KEYCODE_T]: 84,          [KEYCODE_W]: 87,       [KEYCODE_Z]: 90,
            [KEYCODE_ENTER]: 13,      [KEYCODE_SPACE]: 32,   [KEYCODE_ARROWLEFT]: 37,
            [KEYCODE_ARROWRIGHT]: 39, [KEYCODE_ARROWUP]: 38, [KEYCODE_ARROWDOWN]: 40,
            [KEYCODE_N]: 78
        },

        autoUpgrades = [0, '', '', ''],

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

        aimbot = {
            [AIMBOT_ENABLE]: 0,
            [AIMBOT_AIMSMOOTHING]: 0,
            [AIMBOT_CURSORPROXIMITY]: 0,
            [AIMBOT_CURSORPROXCOSENESS]: 200,
            [AIMBOT_USEACCELERATION]: 0,
            [AIMBOT_IGNORECHATTING]: 0,
            [AIMBOT_PINGCOMPENSATION]: 0,
            [AIMBOT_WALLCHECK]: 0,
            [AIMBOT_USEAHEAD]: 0,
            [AIMBOT_DISABLEWHENDASHING]: 0,
            [AIMBOT_TRIGGERBOT]: 0,
            [AIMBOT_TRIGGERBOTWHENDOWN]: 0,
            [AIMBOT_TARGETMODE]: 0,
            [AIMBOT_RIGHTCLICKFRIEND]: 1,
            [AIMBOT_AUXCLICKTARGET]: 1
        },

        esp = {
            [ESP_ZOOM]: 0,
            [ESP_FIXCAMERA]: 0,
            [ESP_CAMUSEREALPOSITION]: 0,
            [ESP_TRACERSBODYENEMY]: 0,
            [ESP_TRACERSCURSORENEMY]: 0,
            [ESP_TRACERSWALLCHECK]: 0,
            [ESP_TRACERSGUN]: 0,
            [ESP_TRACERSGRENADES]: 0,
            [ESP_SHOWINVIS]: 0,
            [ESP_REVEALTEAMS]: 0,
            [ESP_SHOWHEALTH]: 0,
            [ESP_SHOWARMOR]: 0,
            [ESP_SHOWMAGS]: 0,
            [ESP_SHOWGUNSTATUS]: 0,
            [ESP_SHOWRANGE]: 0,
            [ESP_INCLUDEYOU]: 0
        },

        chatScroll = {
            [CHATSCROLLER_TEXT]: 'TioHax on top! https://cheats.gatsio.repl.co/',
            [CHATSCROLLER_INDEX]: 0,
            [CHATSCROLLER_WIDTH]: 30,
            [CHATSCROLLER_TIMEOUT]: null,
            [CHATSCROLLER_INTERVAL]: 100,
            [CHATSCROLLER_VARIATION]: 0,
            [CHATSCROLLER_DIRECTION]: 1,
            [CHATSCROLLER_SEPERATOR]: ' # ',
            [CHATSCROLLER_PAUSEPERIOD]: 3000
        },

        instantchat = {
            [INSTANTCHAT_ONKILL]: 0,
            [INSTANTCHAT_ONKILLTEXT]: '[[ENEMY]] just died to TioHax!',
            [INSTANTCHAT_ONDEATH]: 0,
            [INSTANTCHAT_ONDEATHTEXT]: '[[ENEMY]] = god awful',
            [INSTANTCHAT_AUTOTHANK]: 0,
            [INSTANTCHAT_AUTOTHANKTEXT]: 'I have been healed! Thank you!',
            [INSTANTCHAT_CHATBINDS]: 0,
            [INSTANTCHAT_CHATBINDSTEXTS]: {
                [keyCodeMap[KEYCODE_E]]: 'I need a medic!' ,
                [keyCodeMap[KEYCODE_Z]]: 'Put Build Blocks here!'
            }
        },

        antiAim = {
            [ANTIAIM_RELOAD]: 0,
            [ANTIAIM_SHOOT]: 0,
            [ANTIAIM_IDLE]: 0,
            [ANTIAIM_ANGLESTART]: 0,
            [ANTIAIM_ANGLERANGE]: 0,
            [ANTIAIM_SPINSPEED]: 0,
            [ANTIAIM_DELAY]: 1,
            [ANTIAIM_SAVEDX]: 0,
            [ANTIAIM_SAVEDY]: 0
        },

        recorder = {
            [RECORDER_ISRECORDING]: 0,
            [RECORDER_ISPLAYING]: 0,
            [RECORDER_CURRENT]: [],
            [RECORDER_SESSIONS]: [],
            [RECORDER_TIMEOUT]: null,
            [RECORDER_SESSIONTOPLAY]: -1
        },

        misc = {
            [MISC_AUTORELOAD]: 0,
            [MISC_PINGDISPLAY]: 0,
            [MISC_RENDERDISPLAY]: 0,
            [MISC_STATICHUD]: 0,
            [MISC_STATICHEALTH]: 0,
            [MISC_DISABLECLOSEPOPUP]: 0,
            [MISC_BETTERCRATEHP]: 0,
            [MISC_HIDECHATTING]: 0,
            [MISC_FFACLANDISPLAY]: 0,
            [MISC_SHOWFEATURES]: 0
        },

        advanced = {
            [ADVANCED_PINGCOUNT]: 10,
            [ADVANCED_AIMCONSTANT]: 1.5,
            [ADVANCED_AIMCONSTANTSMOOTH]: 1.3, //this needs to be smaller so the aimbot aims more ahead because its to compensate for taking in the position it aimed previously
            [ADVANCED_TPS]: 2.5,
            [ADVANCED_OPTIMISEWALLCHECK]: 0,
            [ADVANCED_PINGCOMP]: 25 // originally 40 because the server updates once every 40 ms, though 25 is a better number
        },

        perkBots = {
            [PERKBOTS_KNIFE]: 0,
            [PERKBOTS_KNIFEMAXRANGE]: 100,
            [PERKBOTS_KNIFETICK]: 0
        },

        THNet = {
            [THNET_ENABLE]: 1, //enabled by default, change if people are complaining
            [THNET_SOCKET]: null
        },

        //this really doesnt need to exist but idc
        pInt = parseInt,

    startGunfire = () => RF.list[0]?.send(a59("key-press", {inputId: 6, state: cursor.isShooting = 1})),
    stopGunfire = () => RF.list[0]?.send(a59("key-press", {inputId: 6, state: cursor.isShooting = 0})),

    //backups of functions that will be disabled if the user interacts with the cheat menu
    gameMouseUp = function (mouseEvent) {
        cursor.isPressed = 0;
        if (!j17 && c3 && mouseEvent.which == 1) stopGunfire();
        j18 = {x: 0, y: 0};
    },
    gameMouseDown = function (mouseEvent) {
        if (!$("#loginModal").is(":visible")
         && !$("#registerModal").is(":visible")
         && !$("#aboutModal").is(":visible")
         && !$("#privacyModal").is(":visible")
        ) {
            if (!j17 && c3) {
                //positional
                if (!c2 && mouseEvent.which !== 1) return;
                let me = RD.pool[c3],
                    x = c2.x + mouseEvent.clientX / j6,
                    y = c2.y + mouseEvent.clientY / j5,
                    playerHover = null;
                if (aimbot[AIMBOT_RIGHTCLICKFRIEND] || aimbot[AIMBOT_AUXCLICKTARGET] && mouseEvent.which !== 1) for (let player of getPool(RD)) if (player.activated && player.id != me.id && getDistanceSquared(player, {x, y}, nullPos) <= (player.radius + 2) ** 2) {
                    playerHover = player;
                    break;
                }
                switch (mouseEvent.which) {
                    //left click
                    case 1:
                        if (!aimbot[AIMBOT_TRIGGERBOTWHENDOWN] || !aimbot[AIMBOT_TRIGGERBOT]) startGunfire();
                        cursor.isPressed = 1;
                        j18 = {x: mouseEvent.clientX, y: mouseEvent.clientY};
                        break;

                    //wheel click
                    case 2:
                        //if hovering over a player that isn't us, add them to the targets list
                        if (playerHover && aimbot[AIMBOT_RIGHTCLICKFRIEND]) {
                            //either add or remove them to the friendslist
                            toggleUsernameInlist(targets, playerHover.username);
                            if (friends.includes(sanitiseName(playerHover.username))) toggleUsernameInlist(friends, playerHover.username);
                        } else {
                            //toggle target mode if not over a player
                            aimbot[AIMBOT_TARGETMODE] = !aimbot[AIMBOT_TARGETMODE];
                            saveSettings();
                        }
                        break;

                    //right click
                    case 3:
                        //if hovering over a player that isn't us, add them to the friends list
                        if (playerHover && aimbot[AIMBOT_AUXCLICKTARGET]) {
                            //either add or remove them to the friendslist
                            toggleUsernameInlist(friends, playerHover.username);
                            if (targets.includes(sanitiseName(playerHover.username))) toggleUsernameInlist(targets, playerHover.username);
                        } else {
                            //toggle aimbot if not over a player
                            aimbot[AIMBOT_ENABLE] = !aimbot[AIMBOT_ENABLE];
                            saveSettings();
                            //reset aiming direction to the cursor
                            if (!aimbot[AIMBOT_ENABLE]) {
                                a57({ clientX: cursor.x, clientY: cursor.y });
                                a37();
                            }
                        }
                        break;
                }
            }
        }
    },

    //simple string hash
    hashString = str => {
        let hash = 0, i;
        for (i = 0; i < str.length; i++) hash = (((hash << 5) - hash) + str.charCodeAt(i)) | 0;
        return hash;
    },

    fetchFromServer = path => new Promise((Resolve, Reject) => fetch('https://cheats.gatsio.repl.co/' + path).then(res => res.text()).then(Resolve)),

    //apparently this works
    // https://stackoverflow.com/questions/3977792/how-to-convert-keycode-to-character-using-javascript
    keyCodeToLetter = key => String.fromCharCode((96 <= key && key <= 105) ? key - 48 : key),

    //looks less ugly
    clamp = (min, val, max) => isNaN(val) ? min : Math.min(max, Math.max(min, val)),

    //linear interpolation
    lerp = (a, b, t) => a + t * (b - a),

    //I WANT INTEGERS
    lerpR = (a, b, t) => Math.round(lerp(a, b, t)),

    percentify = a => Math.round(a * 100).toString() +'%',

    //facilitates keypresses
    pressKey = keyCode => document.onkeydown({keyCode, [ATTRIBUTE_ISFROMCHEAT]: 1, preventDefault: ()=>{/*do nothing*/}}),
    releaseKey = keyCode => document.onkeyup({keyCode, [ATTRIBUTE_ISFROMCHEAT]: 1, preventDefault: ()=>{/*do nothing*/}}),

    //facilitates message sending
    sendChatMessage = (message, dontpause) => {
        if (!dontpause) pauseChatScrolling();
        RF.list[0].send(a59("message", {message: message.replace(/,/g, "~")}));
    },

    //remove clan tags in tdm and dom
    sanitiseName = username => username.replace(/\[[\d\w]{1,4}\] /, ''),

    //makes code look better
    getPool = R => {
        if (!R) return;
        return Object.values(R.pool);
    },

    saveSettings = () => {
        stopGunfire();
        localStorage.setItem('TioHax_settings', JSON.stringify([
            friends.filter(x => !x.startsWith('Guest ')),
            targets.filter(x => !x.startsWith('Guest ')),
            autoUpgrades.slice(0, 4),
            [
                aimbot[AIMBOT_ENABLE],
                aimbot[AIMBOT_AIMSMOOTHING],
                aimbot[AIMBOT_CURSORPROXIMITY],
                aimbot[AIMBOT_USEACCELERATION],
                aimbot[AIMBOT_IGNORECHATTING],
                aimbot[AIMBOT_PINGCOMPENSATION],
                aimbot[AIMBOT_TRIGGERBOT],
                aimbot[AIMBOT_WALLCHECK],
                aimbot[AIMBOT_USEAHEAD],
                aimbot[AIMBOT_DISABLEWHENDASHING],
                aimbot[AIMBOT_CURSORPROXCOSENESS],
                aimbot[AIMBOT_TARGETMODE],
                aimbot[AIMBOT_TRIGGERBOTWHENDOWN],
                aimbot[AIMBOT_RIGHTCLICKFRIEND],
                aimbot[AIMBOT_AUXCLICKTARGET],
                aimbot[AIMBOT_TARGETSONLY]
            ],[
                esp[ESP_ZOOM],
                esp[ESP_FIXCAMERA],
                esp[ESP_TRACERSBODYENEMY],
                esp[ESP_TRACERSCURSORENEMY],
                esp[ESP_TRACERSWALLCHECK],
                esp[ESP_TRACERSGUN],
                esp[ESP_TRACERSGRENADES],
                esp[ESP_SHOWINVIS],
                esp[ESP_REVEALTEAMS],
                esp[ESP_SHOWHEALTH],
                esp[ESP_SHOWARMOR],
                esp[ESP_SHOWMAGS],
                esp[ESP_SHOWGUNSTATUS],
                esp[ESP_CAMUSEREALPOSITION],
                esp[ESP_INCLUDEYOU],
                esp[ESP_SHOWRANGE]
            ],[
                chatScroll[CHATSCROLLER_TEXT],
                chatScroll[CHATSCROLLER_WIDTH],
                chatScroll[CHATSCROLLER_INTERVAL],
                chatScroll[CHATSCROLLER_DIRECTION],
                chatScroll[CHATSCROLLER_SEPERATOR]
            ],[
                antiAim[ANTIAIM_RELOAD],
                antiAim[ANTIAIM_SHOOT],
                antiAim[ANTIAIM_IDLE],
                antiAim[ANTIAIM_ANGLESTART],
                antiAim[ANTIAIM_ANGLERANGE],
                antiAim[ANTIAIM_SPINSPEED],
                antiAim[ANTIAIM_DELAY],
                antiAim[ANTIAIM_DRAWREALAIM]
            ],[
                instantchat[INSTANTCHAT_CHATBINDS],
                instantchat[INSTANTCHAT_CHATBINDSTEXTS],
                instantchat[INSTANTCHAT_ONKILL],
                instantchat[INSTANTCHAT_ONKILLTEXT],
                instantchat[INSTANTCHAT_ONDEATH],
                instantchat[INSTANTCHAT_ONDEATHTEXT],
                instantchat[INSTANTCHAT_AUTOTHANK],
                instantchat[INSTANTCHAT_AUTOTHANKTEXT]
            ],[
                misc[MISC_AUTORELOAD],
                misc[MISC_PINGDISPLAY],
                misc[MISC_RENDERDISPLAY],
                misc[MISC_STATICHUD],
                misc[MISC_STATICHEALTH],
                misc[MISC_DISABLECLOSEPOPUP],
                misc[MISC_BETTERCRATEHP],
                misc[MISC_HIDECHATTING],
                misc[MISC_FFACLANDISPLAY],
                misc[MISC_SHOWFEATURES]
            ],[
                advanced[ADVANCED_PINGCOUNT],
                advanced[ADVANCED_AIMCONSTANT],
                advanced[ADVANCED_AIMCONSTANTSMOOTH],
                advanced[ADVANCED_TPS],
                advanced[ADVANCED_OPTIMISEWALLCHECK],
                advanced[ADVANCED_PINGCOMP]
            ]
        ]));
    },

    loadSettings = () => {
        let data = JSON.parse(localStorage.getItem('TioHax_settings') || '{}');
        if (data[0]) friends = data[0];
        if (data[1]) targets = data[1];
        if (data[2]) autoUpgrades = data[2];
        if (data[3]) {
            let data2 = data[3];
            aimbot[AIMBOT_ENABLE] = data2[0];
            aimbot[AIMBOT_AIMSMOOTHING] = data2[1];
            aimbot[AIMBOT_CURSORPROXIMITY] = data2[2];
            aimbot[AIMBOT_USEACCELERATION] = data2[3];
            aimbot[AIMBOT_IGNORECHATTING] = data2[4];
            aimbot[AIMBOT_PINGCOMPENSATION] = data2[5];
            aimbot[AIMBOT_TRIGGERBOT] = data2[6];
            aimbot[AIMBOT_WALLCHECK] = data2[7];
            aimbot[AIMBOT_USEAHEAD] = data2[8];
            aimbot[AIMBOT_DISABLEWHENDASHING] = data2[9];
            aimbot[AIMBOT_CURSORPROXCOSENESS] = data2[10];
            aimbot[AIMBOT_TARGETMODE] = data2[11];
            aimbot[AIMBOT_TRIGGERBOTWHENDOWN] = data2[12];
            aimbot[AIMBOT_RIGHTCLICKFRIEND] = data2[13];
            aimbot[AIMBOT_AUXCLICKTARGET] = data2[14];
            aimbot[AIMBOT_TARGETSONLY] = data2[15];
        }
        if (data[4]) {
            let data3 = data[4];
            esp[ESP_ZOOM] = data3[0];
            esp[ESP_FIXCAMERA] = data3[1];
            esp[ESP_TRACERSBODYENEMY] = data3[2];
            esp[ESP_TRACERSCURSORENEMY] = data3[3];
            esp[ESP_TRACERSWALLCHECK] = data3[4];
            esp[ESP_TRACERSGUN] = data3[5];
            esp[ESP_TRACERSGRENADES] = data3[6];
            esp[ESP_SHOWINVIS] = data3[7];
            esp[ESP_REVEALTEAMS] = data3[8];
            esp[ESP_SHOWHEALTH] = data3[9];
            esp[ESP_SHOWARMOR] = data3[10];
            esp[ESP_SHOWMAGS] = data3[11];
            esp[ESP_SHOWGUNSTATUS] = data3[12];
            esp[ESP_CAMUSEREALPOSITION] = data3[13];
            esp[ESP_INCLUDEYOU] = data3[14];
            esp[ESP_SHOWRANGE] = data3[15];
        }
        if (data[5]) {
            let data4 = data[5];
            chatScroll[CHATSCROLLER_TEXT] = data4[0];
            chatScroll[CHATSCROLLER_WIDTH] = data4[1];
            chatScroll[CHATSCROLLER_INTERVAL] = data4[2];
            chatScroll[CHATSCROLLER_DIRECTION] = data4[3];
            chatScroll[CHATSCROLLER_SEPERATOR] = data4[4];
        }
        if (data[6]) {
            let data5 = data[6];
            antiAim[ANTIAIM_RELOAD] = data5[0];
            antiAim[ANTIAIM_SHOOT] = data5[1];
            antiAim[ANTIAIM_IDLE] = data5[2];
            antiAim[ANTIAIM_ANGLESTART] = data5[3];
            antiAim[ANTIAIM_ANGLERANGE] = data5[4];
            antiAim[ANTIAIM_SPINSPEED] = data5[5];
            antiAim[ANTIAIM_DELAY] = data5[6];
            antiAim[ANTIAIM_DRAWREALAIM] = data5[7];
        }
        if (data[7]) {
            let data6 = data[7];
            instantchat[INSTANTCHAT_CHATBINDS] = data6[0];
            instantchat[INSTANTCHAT_CHATBINDSTEXTS] = data6[1];
            instantchat[INSTANTCHAT_ONKILL] = data6[2];
            instantchat[INSTANTCHAT_ONKILLTEXT] = data6[3];
            instantchat[INSTANTCHAT_ONDEATH] = data6[4];
            instantchat[INSTANTCHAT_ONDEATHTEXT] = data6[5];
            instantchat[INSTANTCHAT_AUTOTHANK] = data6[6];
            instantchat[INSTANTCHAT_AUTOTHANKTEXT] = data6[7];
        }
        if (data[8]) {
            let data7 = data[8];
            misc[MISC_AUTORELOAD] = data7[0];
            misc[MISC_PINGDISPLAY] = data7[1];
            misc[MISC_RENDERDISPLAY] = data7[2];
            misc[MISC_STATICHUD] = data7[3];
            misc[MISC_STATICHEALTH] = data7[4];
            misc[MISC_DISABLECLOSEPOPUP] = data7[5];
            misc[MISC_BETTERCRATEHP] = data7[6];
            misc[MISC_HIDECHATTING] = data7[7];
            misc[MISC_FFACLANDISPLAY] = data7[8];
            misc[MISC_SHOWFEATURES] = data7[9];
        }
        if (data[9]) {
            let data8 = data[9];
            advanced[ADVANCED_PINGCOUNT] = data8[0];
            advanced[ADVANCED_AIMCONSTANT] = data8[1];
            advanced[ADVANCED_AIMCONSTANTSMOOTH] = data8[2];
            advanced[ADVANCED_TPS] = data8[3];
            advanced[ADVANCED_OPTIMISEWALLCHECK] = data8[4];
            advanced[ADVANCED_PINGCOMP] = data8[5];
        }
        if (data._friends) friends = data._friends;
    },

    //line drawer wrapper
    drawLine = (start, entity, offset, width, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color || getColor(entity);
        ctx.lineWidth = width;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(entity.x + offset.x, entity.y + offset.y);
        ctx.stroke();
    },

    //line drawer wrapper but different
    drawLine2 = (entity, end, offset, width, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color || getColor(entity);
        ctx.lineWidth = width;
        ctx.moveTo(entity.x + offset.x, entity.y + offset.y);
        ctx.lineTo(entity.x + offset.x + end.x, entity.y + offset.y + end.y);
        ctx.stroke();
    },

    //circle drawer wrapper
    drawCircle = (entity, offset, radius, width, color) => {
        ctx.beginPath();
        ctx.strokeStyle = color || getColor(entity);
        ctx.lineWidth = width;
        ctx.moveTo(entity.x + offset.x + radius, entity.y + offset.y);
        ctx.arc(entity.x + offset.x, entity.y + offset.y, radius, 0, doublePI);
        ctx.stroke();
    },

    //circle drawer wrapper
    drawCircle2 = (entity, offset, radius, width, color) => {
        ctx.globalAlpha /= 2;
        drawCircle(entity, offset, radius, width, color);
        ctx.globalAlpha /= 2;
        drawCircle(entity, offset, radius - width, width, color);
        ctx.globalAlpha /= 2;
        drawCircle(entity, offset, radius - width * 2, width, color);
    },

    //text drawer wrapper
    drawText = (x, y, text, color) => {
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000';
        ctx.strokeText(text, x, y);
    },

    // Given three collinear points p, q, r, the function checks if
    // point q lies on line segment 'pr'
    CLLonSegment = (p0, p1, q0, q1, r0, r1) => {
        return (q0 <= Math.max(p0, r0) && q0 >= Math.min(p0, r0) &&
                q1 <= Math.max(p1, r1) && q1 >= Math.min(p1, r1));
    },

    // To find orientation of ordered triplet (p, q, r).
    // The function returns following values
    // 0 --> p, q and r are collinear
    // 1 --> Clockwise
    // 2 --> Counterclockwise
    CLLorientation = (p0, p1, q0, q1, r0, r1) => {

        // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
        // for details of below formula.
        let v = (q1 - p1) * (r0 - q0) -
                (q0 - p0) * (r1 - q1);
        
        if (v == 0) return 0; // collinear
        
        return (v > 0)? 1: 2; // clock or counterclock wise
    },

    // The main function that returns true if line segment Q
    // and P intersect.
    collisionLineLine = (p10, p11, q10, q11, p20, p21, q20, q21) => {

        // Find the four orientations needed for general and
        // special cases
        let o1 = CLLorientation(p10, p11, q10, q11, p20, p21),
            o2 = CLLorientation(p10, p11, q10, q11, q20, q21),
            o3 = CLLorientation(p20, p21, q20, q21, p10, p11),
            o4 = CLLorientation(p20, p21, q20, q21, q10, q11);
        
        // General case
        if (o1 != o2 && o3 != o4) return 1;
        
        // Special Cases
        return (
        // p1, q1 and p2 are collinear and p2 lies on segment p1q1
            (o1 == 0 && CLLonSegment(p10, p11, p20, p21, q10, q11))
        // p1, q1 and q2 are collinear and q2 lies on segment p1q1
         || (o2 == 0 && CLLonSegment(p10, p11, q20, q21, q10, q11))
        // p2, q2 and p1 are collinear and p1 lies on segment p2q2
         || (o3 == 0 && CLLonSegment(p20, p21, p10, p11, q20, q21))
        // p2, q2 and q1 are collinear and q1 lies on segment p2q2
         || (o4 == 0 && CLLonSegment(p20, p21, q10, q11, q20, q21)));
    },

    collisionLineCircle = (Ax, Ay, Bx, By, Cx, Cy, Cr) => {
        let ABx = Bx - Ax,
            ABy = By - Ay,
            ACx = Cx - Ax,
            ACy = Cy - Ay,
            temp = (ax * bx + ay * by) / (bx * bx + by * by),
            Dx = temp * ABx - Ax,
            Dy = temp * ABy - Ay,
            ADx = Dx - Ax,
            ADy = Dy - Ay,
            k = Math.abs(ABx) > Math.abs(ABy) ? ADx / ABx : ADy / ABy;

        // Check if D is off either end of the line segment
        if (k <= 0.0) {
            Dx = Ax;
            Dy = Ay;
        }
        if (k >= 1.0) {
            Dx = Bx;
            Dy = By;
        }

        return (Cx - Dx) ** 2 + (Cy - Dy) ** 2 < Cr ** 2;
    },

    //adds a toggleable camera fix
    fixCamera = () => {
        c2.update = () => {
            var player = RD.pool[c2.trackingId];
            if (c2.trackingId) {
                if (player.mouseAngle === undefined) player.mouseAngle = 0;
                if (esp[ESP_FIXCAMERA]) {
                    //we need to add the velocity to it because the tick function now draws after updating players
                    c2.x = (player.x + Math.round(player.spdX / advanced[ADVANCED_TPS])) - j40.x;
                    c2.y = (player.y + Math.round(player.spdY / advanced[ADVANCED_TPS])) - j40.y;
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
                var angleRad = player.mouseAngle * degToRad;
                if (c2.spdX > -22 && c2.spdX < 22) c2.x = j39 / 15 * Math.cos(angleRad) + (player.x - j40.x) - c2.spdX * 12;
                if (c2.spdY > -22 && c2.spdY < 22) c2.y = j39 / 15 * Math.sin(angleRad) + (player.y - j40.y) - c2.spdY * 12;
            }
        };
    },

    //handles upgrading
    upgradePerk = (upgrade, upgradeLevel) => {
        o3[upgradeLevel] = upgrade;
        RF.list[0].send(a59("upgrade", {upgrade, upgradeLevel}));
        c8[upgradeLevel] = 0;
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
    toggleUsernameInlist = (list, username) => {
        username = sanitiseName(username);
        let index = list.indexOf(username);

        //if the player doesnt exist in the list, add them
        if (index == -1) {
            list.push(username);

        //if the player does exist, delete them from the list
        } else if (index == list.length - 1){
            list.pop();
        } else {
            list[index] = list.pop();
        }

        saveSettings();
    },

    //apply styles to an element
    applyStyle = (element, style) => applyAttrbutes(element.style, style),

    applyAttrbutes = (object, attributes) => {
        for (let key in attributes) {
            object[key] = attributes[key];
        }
    },

    //very simple thing for making elements very quickly
    make = (type, style = {}, attributes = {}, babies = []) => {
        let element = document.createElement(type);
        applyStyle(element, style);
        applyAttrbutes(element, attributes);
        for (let baby of babies) element.append(baby);
        return element;
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

    //if a menu requires a canvas for whatever reason
    //this function would later be re-defined in the menu
    updateMenuCanvas = () => {},

    stopChatScrolling = () => {
        //surprisingly, clearTimeout doesn't throw an error if the argument is null...
        clearTimeout(chatScroll[CHATSCROLLER_TIMEOUT]);
        chatScroll[CHATSCROLLER_TIMEOUT] = null;
    },

    startChatScrolling = () => {
        stopChatScrolling();
        let chatScrollLoop = () => {
            let textFinal = '',
                text = chatScroll[CHATSCROLLER_TEXT] + chatScroll[CHATSCROLLER_SEPERATOR],
                index = chatScroll[CHATSCROLLER_INDEX],
                variation = chatScroll[CHATSCROLLER_VARIATION];
            if (text) {
                for (let i = 0; i < chatScroll[CHATSCROLLER_WIDTH]; i++) textFinal += text[(index + i) % text.length];

                //the .slice() exists because the game kicks you for sending messages with the same length often
                sendChatMessage(textFinal.slice(variation, textFinal.length - variation), 1);
            } else {
                //if the user is trying to chat-scroll literally nothing for some reason
                sendChatMessage(' '.repeat(variation + 1), 1);
            }
            chatScroll[CHATSCROLLER_INDEX] = (index + chatScroll[CHATSCROLLER_DIRECTION] + text.length) % text.length;
            chatScroll[CHATSCROLLER_VARIATION] = (variation + 1) % 3;
            chatScroll[CHATSCROLLER_TIMEOUT] = setTimeout(chatScrollLoop, chatScroll[CHATSCROLLER_INTERVAL]);
        };
        chatScrollLoop();
    },

    //pauses scrolling for some amount of time
    pauseChatScrolling = () => {
        if (!chatScroll[CHATSCROLLER_TIMEOUT]) return;
        stopChatScrolling();
        //to not conflict if this function was called another time
        let localRandom = Math.random(),
            chatBoxRandom = localRandom;
        setTimeout(() => chatBoxRandom == localRandom && startChatScrolling(), chatScroll[CHATSCROLLER_PAUSEPERIOD]);
    },

    removeChildren = element => {
        while (element.hasChildNodes()) element.removeChild(element.lastChild);
    },

    checkScrollable = (bool, element) => {
        //yes this works, no i will not elaborate
        bool = divs.content.scrollHeight > divs.content.clientHeight;
        element = divs.content.lastChild;
        //TODO: FIX FUCKUP WITH REFRESHMENUSELECT
        applyStyle(element, { 'border-bottom': bool ? '0px' : '2px solid #000', 'height': (pInt(element.style.height) - (4 - 2 * pInt(element.style['border-bottom'] ? element.style['border-bottom'] : element.style.border))) + 'px' });
    },

    createControlButton = (label, toggle) => {
        let controlNameDiv = make("div", { 'width': '240px' }, { 'innerText': label[0] }),
        controlButtonDiv = make("div", {
            'width': '45px',
            'height': '30px',
            'border': '4px solid #ffffff',
            'display': 'flex',
            'position': 'relative',
            'align-items': 'center',
            'border-radius': '7px',
            'justify-content': 'center',
            'background-color' :'#33dc'
        }, { 'onclick': () => { toggle(); saveSettings(); } }),
        controlDiv = make("div", {
            'width': '100%',
            'border-bottom': '2px solid #000000',
            'display': 'flex',
            'padding': '5px',
            'justify-content': 'space-between',
            'padding-bottom': '0px',
            'height': '40px'
        }, { 'title': label[1] }, [controlNameDiv, controlButtonDiv]);
        return controlDiv;
    },

    createControlToggle = (label, toggle, render) => {
        let controlNameDiv = make("div", { 'display': 'flex' }, { 'innerText': label[0] }),
        controlButtonDiv = make("div", {
            'width': '60px',
            'height': '30px',
            'border': '4px solid #ffffff',
            'display': 'flex',
            'position': 'relative',
            'align-items': 'center',
            'border-radius': '7px',
            'justify-content': 'center'
        }, {
            'onclick': () => {
                toggle();
                saveSettings();
                controlButtonDiv.update();
            }
        }),
        controlDiv = make("div", {
            'width': '100%',
            'border-bottom': '2px solid #000000',
            'display': 'flex',
            'padding': '5px',
            'justify-content': 'space-between',
            'padding-bottom': '0px',
            'height': '40px'
        }, { 'title': label[1] }, [controlNameDiv, controlButtonDiv]);
        (controlButtonDiv.update = () => {
            let bool = render();
            controlButtonDiv.innerText = bool ? 'On' : 'Off';
            controlButtonDiv.style['background-color'] = bool ? '#00ff00cc' : '#ff0000cc';
        })();
        return controlDiv;
    },

    createControlValue = (label, update, render) => {
        let controlValueNameDiv = make("div", {'margin-top': '5px','display': 'flex'}, { 'innerText': label[0] }),
        controlButtonLeftDiv = make("div", {
            'width': '30px',
            'height': '30px',
            'border': '3px solid #ffffff',
            'display': 'flex',
            'position': 'relative',
            'font-weight': 'bold',
            'align-items': 'center',
            'border-radius': '5px',
            'justify-content': 'center',
            'background-color': '#ffff00cc'
        }, { 'innerText': '-', 'onclick': () => {
            controlIndicatorDiv.j(update(-1));
            saveSettings();
        }}),
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
            'border-radius': '5px',
            'justify-content': 'center',
            'background-color': '#ffffffcc'
        }, {'onwheel': E => {
            controlIndicatorDiv.j(update(Math.sign(-E.deltaY)));
            saveSettings();
        }}),
        controlButtonRightDiv = make("div", {
            'width': '30px',
            'height': '30px',
            'border': '3px solid #ffffff',
            'display': 'flex',
            'position': 'relative',
            'font-weight': 'bold',
            'align-items': 'center',
            'border-radius': '5px',
            'justify-content': 'center',
            'background-color': '#ffff00cc'
        }, { 'innerText': '+', 'onclick': () => {
            controlIndicatorDiv.j(update(1));
            saveSettings();
        }}),
        controlButtonContainerDiv = make("div", {'display': 'flex', 'align-items': 'center', 'flex-direction': 'row'}, {}, [controlButtonLeftDiv, controlIndicatorDiv, controlButtonRightDiv]),
        controlValueDiv = make("div", {
            'width': '100%',
            'border-bottom': '2px solid #000000',
            'display': 'flex',
            'padding': '5px',
            'padding-top': '0px',
            'padding-bottom': '0px',
            'justify-content': 'space-between',
            'height': '40px'
        }, { 'title': label[1] }, [controlValueNameDiv, controlButtonContainerDiv]);

        //j = update
        //this is abstracted because closure compiler doesnt
        (controlIndicatorDiv.j = () => controlIndicatorDiv.innerText = render())();
        return controlValueDiv;
    },

    createControlDropdown = (label, subcontrols) => {
        let controlNameDiv = make("div", { 'display': 'flex' }, { 'innerText': label[0] }),
        controlButtonDiv = make("div", {
            'width': '45px',
            'height': '30px',
            'border': '4px solid #fff',
            'display': 'flex',
            'position': 'relative',
            'align-items': 'center',
            'border-radius': '7px',
            'justify-content': 'center',
            'background-color': '#888'
        }, { 'innerText': 'V' , 'onclick': () => checkScrollable(subcontrolsDiv.hidden = !subcontrolsDiv.hidden) }),
        controlDiv = make("div", {
            'width': '100%',
            'padding': '5px',
            'display': 'flex',
            'padding-bottom': '0px',
            'justify-content': 'space-between',
            'background-color': '#6666',
            'height': '40px'
        }, { 'title': label[1] }, [controlNameDiv, controlButtonDiv]),
        subcontrolsDiv = make('div', {
            'border-top': '2px solid #000',
            'border-left': '4px solid #000',
            'border-bottom': '4px solid #000'
        }, { 'hidden': true }, subcontrols);
        return make('div', { 'border-bottom': '2px solid #000' }, {}, [controlDiv, subcontrolsDiv]);
    },

    refreshMenu = menuID => {
        idRefreshMenu = 0;
        updateMenuCanvas = () => {};
        removeChildren(divs.content);

        //find out which menu to render
        //this really doesn't need to be like this but idc
        [   refreshMenuSelect,        refreshMenuGuide,       refreshMenuAimbot,
            refreshMenuESP,           refreshMenuInstantchat, refreshMenuMisc,
            refreshMenuPlayermanager, refreshMenuUpgrades,    refreshMenuScroller,
            refreshMenuAntiAim,       refreshMenuPerkBots,    refreshMenuPaint,
            refreshMenuRecorder,      refreshMenuTHNet,       refreshMenuAdvanced,
            refreshMenuCredits
        ][menuID](x=>divs.content.append(x));

        checkScrollable();
    },

    createMenu = () => {
        //custom scrollbar
        //i wish there were a better way...
        const style = make('style');
        style.textContent = 'img{width:100%;height:100%}::-webkit-scrollbar{width:16px}::-webkit-scrollbar-track{background:#000000;border-left:4px solid #000}::-webkit-scrollbar-thumb{background:#666666;border-left:4px solid #000}::-webkit-scrollbar-thumb:hover{background:#888888}';
        document.head.append(style);

        divs.menu = make("div", {
            'left': '5px',
            'width': '300px',
            'color': 'white',
            'border': '2px solid #000000',
            'border-radius': '5px',
            'z-index': '10',
            'position': 'absolute',
            'font-size': '20px',
            'font-family': 'Consolas, monospace',
            'user-select': 'none'
        }, {}, [
            divs.title = make("div", {
                'width': '100%',
                'height': '43px',
                'border': '2px solid #000000',
                'padding': '5px',
                'display': 'flex',
                'white-space': 'pre-wrap',
                'padding-right': '10px',
                'justify-content': 'space-between',
                'background-image': 'linear-gradient(to bottom, #800c 0%, #f00c 40%, #00fc 60%, #008c 100%)'
            }, {
                'innerText': 'TioHax Cheat Menu (T)',
                'onmousedown': e => {
                    moveMenu.offsetX = e.clientX - parseInt(divs.menu.style.left);
                    moveMenu.offsetY = e.clientY - parseInt(divs.menu.style.top);
                    moveMenu.enable = 1;
                },
                'onmouseup': () => moveMenu.enable = 0
            }),
            divs.content = make("div", {
                'width': '100%',
                'height': '520px',
                'border': '2px solid #000000',
                'overflow-y': 'scroll',
                'border-top': '2px solid #000000',
                'border-left': '2px solid #000000',
                'background-color': '#000000cc'
            })
        ]);
        divs.backbutton = make("div", {
            'color': '#000000',
            'width': '28px',
            'height': '28px',
            'border': '3.5px solid #000000',
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            'background-color': '#ffffff88',
            'border-radius': '10px'
        }, {
            'innerText': '<',
            'onclick': () => refreshMenu(0)
        });

        divs.title.prepend(divs.backbutton);

        if (isUserscript) divs.menu.append(make("div", {
            'color': '#000000',
            'width': '100%',
            'border': '2px solid #000000',
            'align-items': 'center',
            'padding-left': '5px',
            'justify-content': 'center',
            'background-image': 'linear-gradient(to bottom, #888c 0%, #fffc 50%, #888c 100%)'
        }, {
            'onclick': () => window.open('https://cheats.gatsio.repl.co/', '_blank').focus(),
            'innerHTML': 'You are using:<br><b style="color:red">TioHax Userscript Edition</b><br><span style="color:blue">Click here to get the standalone version!<span>'
        }));

        document.body.append(divs.menu);
        refreshMenu(0);

        applyStyle(divs.menu, { 'top': (Math.min(0.92 * window.innerHeight, window.innerHeight - 110) - pInt(divs.content.style.height)) / 3 + 'px' });
    },

    createChatbox = () => {
        let container = make('div'),
            title = make('div'),
            sendContainer = make('div')
        divs.chatbox = make('div');
        //TODO: FINISH
    },

    refreshMenuSelect = append => {
        for (let i in menuNames) {
            let menuDiv = make("div", {
                'width': '100%',
                'padding': '5px',
                'align-items': 'center',
                'border-bottom': '2px solid #000',
                'justify-content': 'center',
                'background-color': '#8888',
                'height': menuNames.length - 1 == i ? '38px' : '40px'
            }, {
                'innerText': menuNames[i],
                'onmouseover': () => menuDiv.style['background-color'] = '#888c',
                'onmouseout': () => menuDiv.style['background-color'] = '#8888',
                'onclick': () => refreshMenu(pInt(i) + 1),
            });

            append(menuDiv);
        }
    },

    //telling people how to use menu
    refreshMenuGuide = append => {
        //this was going to have submenus so it would be easier to navigate
        //then the cheat controls menu would have submenus aswell so it isnt just one disorganized mess
        for (let entry of guide) for (let i in entry) {
            let bool = i == 0;
            append(make("div", {
                'font-size': bool ? '30px' : i & 1 ? '25px' : '20px',
                'border-top': bool ? '4px solid #000' : '',
                'margin-top': bool ? '10px' : i & 1 ? '15px' : '5px',
                'padding-top': bool ? '10px' : '',
                'padding-left': '5px'
            }, { 'innerText': entry[i] }));
        }
    },

    //creates cheat controls
    refreshMenuAimbot = append => {
        let dropdowns = {
            [AIMBOT_DROPDOWN_GENERAL]: AIMBOT_ENABLE + AIMBOT_AIMSMOOTHING + AIMBOT_DISABLEWHENDASHING,
            [AIMBOT_DROPDOWN_ENHANCED]: AIMBOT_USEACCELERATION + AIMBOT_PINGCOMPENSATION,
            [AIMBOT_DROPDOWN_CURSORPROX]: AIMBOT_CURSORPROXIMITY + AIMBOT_CURSORPROXCOSENESS,
            [AIMBOT_DROPDOWN_SMART]: AIMBOT_WALLCHECK + AIMBOT_USEAHEAD,
            [AIMBOT_DROPDOWN_PRIORITY]: AIMBOT_RIGHTCLICKFRIEND + AIMBOT_IGNORECHATTING + AIMBOT_TARGETMODE + AIMBOT_AUXCLICKTARGET + AIMBOT_TARGETSONLY,
            [AIMBOT_DROPDOWN_TRIGGERBOT]: AIMBOT_TRIGGERBOT + AIMBOT_TRIGGERBOTWHENDOWN
        };

        for (let dropdown in dropdowns) {
            let controls = [];
            for (let setting of dropdowns[dropdown]) {
                controls.push(setting == AIMBOT_CURSORPROXCOSENESS
                            ? createControlValue(aimbotLabel[setting], i => aimbot[setting] = clamp(50, aimbot[setting] + 50 * i, 500), () => aimbot[setting])
                            : createControlToggle(aimbotLabel[setting], () => aimbot[setting] = !aimbot[setting], () => aimbot[setting])
                );
            }
            append(createControlDropdown(aimbotLabel[dropdown], controls));
        }
    },

    refreshMenuESP = append => {
        let dropdowns = {
            [ESP_DROPDOWN_CAMERA]: ESP_ZOOM + ESP_FIXCAMERA + ESP_CAMUSEREALPOSITION,
            [ESP_DROPDOWN_TRACERS]: ESP_TRACERSBODYENEMY + ESP_TRACERSCURSORENEMY + ESP_TRACERSWALLCHECK + ESP_TRACERSGUN + ESP_TRACERSGRENADES,
            [ESP_DROPDOWN_PLAYERSTATS]: ESP_SHOWHEALTH + ESP_SHOWARMOR + ESP_SHOWMAGS + ESP_SHOWGUNSTATUS + ESP_SHOWRANGE + ESP_INCLUDEYOU,
            [ESP_DROPDOWN_OTHER]: ESP_SHOWINVIS + ESP_REVEALTEAMS
        }

        for (let dropdown in dropdowns) {
            let controls = [];
            for (let setting of dropdowns[dropdown]) controls.push(createControlToggle(espLabel[setting], () => esp[setting] = !esp[setting], () => esp[setting]));
            append(createControlDropdown(espLabel[dropdown], controls));
        }
    },

    refreshMenuMisc = append => {
        for (let setting in misc) append(createControlToggle(miscLabel[setting], () => misc[setting] = !misc[setting], () => misc[setting]));
    },

    refreshMenuInstantchat = append => {
        for (let setting in instantchat) if (setting !== INSTANTCHAT_CHATBINDSTEXTS) {
            if ((INSTANTCHAT_ONKILLTEXT + INSTANTCHAT_ONDEATHTEXT + INSTANTCHAT_AUTOTHANKTEXT).includes(setting)) {
                let editAutoTextInput = make('input', {
                    'color': '#000000',
                    'width': '270px',
                    'height': '34px',
                    'border': '4px solid #ffffff',
                    'display': 'flex',
                    'position': 'relative',
                    'align-items': 'center',
                    'border-radius': '5px',
                    'justify-content': 'center',
                    'background-color': '#ffffffcc'
                }, {
                    'type': 'text',
                    'onfocus': () => textBoxFocused = 1,
                    'onblur': () => textBoxFocused = 0,
                    'oninput': () => {
                        editAutoTextInput.value = instantchat[setting] = editAutoTextInput.value.slice(0, setting === INSTANTCHAT_AUTOTHANKTEXT ? 32 : 38);
                        saveSettings();
                    },
                    'value': instantchat[setting]
                });
                append(make("div", {
                    'width': '100%',
                    'display': 'flex',
                    'padding': '5px',
                    'padding-top': '0px',
                    'border-bottom': '3px solid #000000',
                    'padding-bottom': '0px',
                    'justify-content': 'space-between',
                    'height': '40px'
                }, { 'title': instantchatLabel[setting][1] }, [editAutoTextInput]));
            } else {
                append(createControlToggle(instantchatLabel[setting], () => instantchat[setting] = !instantchat[setting], () => instantchat[setting]));
            }
        }
        let editBindInput = make('input', {
            'color': '#000000',
            'width': '270px',
            'height': '34px',
            'border': '4px solid #ffffff',
            'display': 'flex',
            'position': 'relative',
            'align-items': 'center',
            'border-radius': '5px',
            'justify-content': 'center',
            'background-color': '#ffffffcc'
        }, {
            'type': 'text',
            'onfocus': () => textBoxFocused = 1,
            'onblur': () => textBoxFocused = 0,
            'oninput': () => {
                if (selectedKey) {
                    instantchat[INSTANTCHAT_CHATBINDSTEXTS][selectedKey] = editBindInput.value = editBindInput.value.slice(0, 32);
                    //memory leak prevention
                    if (!instantchat[INSTANTCHAT_CHATBINDSTEXTS][selectedKey]) delete instantchat[INSTANTCHAT_CHATBINDSTEXTS][selectedKey];
                }
            },
            'value': ''
        }),
        editBindDiv = make("div", {
            'width': '100%',
            'display': 'flex',
            'padding': '5px',
            'padding-top': '2px',
            'border-bottom': '3px solid #000000',
            'padding-bottom': '0px',
            'background-color': '#88888888',
            'justify-content': 'space-between',
            'height': '40px'
        }, { 'title': 'Change the text you say when you press a key' }, [editBindInput]),
        bindSelectDiv = make("div", {
            'width': ' 100%',
            'display': 'grid',
            'grid-template-columns': 'auto auto auto auto auto auto auto auto auto auto'
        }), selectedBindDiv, selectedKey = 0;
        for (let validKey of [0, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 66, 67, 69, 70, 71, 72, 73, 74, 75, 76, 77, 79, 80, 81, 85, 86, 88, 89, 90]) {
            let bindKeyDiv = make("div", {
                'padding-left': '5px',
                'height': bindSelectDiv.width / 9,
                'align-items': 'center',
                'justify-content': 'center',
                'background-color': '#f80'
            }, {
                'innerText': validKey ? ' ' + keyCodeToLetter(validKey) : ' ',
                'onclick': () => {
                    let oldDiv = selectedBindDiv;
                    selectedBindDiv = bindKeyDiv;
                    selectedKey = validKey;
                    oldDiv.p();
                    bindKeyDiv.p();
                    editBindInput.value = instantchat[INSTANTCHAT_CHATBINDSTEXTS][validKey] || '';
                },
                //update
                'p': () => applyStyle(bindKeyDiv, {'border': '2px solid ' + (selectedBindDiv === bindKeyDiv ? '#ff0' : '#000')})
            });
            if (!validKey) selectedBindDiv = bindKeyDiv;
            bindKeyDiv.p();
            bindSelectDiv.append(bindKeyDiv);
        }
        append(bindSelectDiv);
        append(editBindDiv);
    },

    refreshMenuPlayermanager = append => {
        let list = playermanagerSelectedMenu ? targets : friends,
            otherList = playermanagerSelectedMenu ? friends : targets,
        controlAddButton = make("div", {
            'width': '50px',
            'height': '34px',
            'color': '#ffffff0',
            'border': '4px solid #ffffff',
            'display': 'flex',
            'position': 'relative',
            'align-items': 'center',
            'justify-content': 'center',
            'background-color': '#ff8800cc'
        }, {
            'innerText': 'Add',
            'onclick': () => {
                let name = sanitiseName(controlAddName.value);
                if (!list.includes(name)) {
                    toggleUsernameInlist(list, name);
                    if (otherList.includes(name)) toggleUsernameInlist(otherList, name);
                    checkScrollable(refreshMenu(6));
                    saveSettings();
                }
            }
        }),
        controlAddName = make('input', {
            'width': '210px',
            'height': '34px',
            'color': '#000000',
            'border': '4px solid #ffffff',
            'display': 'flex',
            'position': 'relative',
            'align-items': 'center',
            'justify-content': 'center',
            'background-color': '#ffffffcc'
        }, {
            'type': 'text',
            'onfocus': () => textBoxFocused = 1,
            'onblur': () => textBoxFocused = 0,
            'oninput': () => controlAddName.value = controlAddName.value.replace(/[^0-9a-zA-Z ]/g, '').slice(0, 12),
            'value': ''
        }),
        controlAdd = make("div", {
            'width': '100%',
            'display': 'flex',
            'padding': '5px',
            'padding-top': '2px',
            'border-bottom': '3px solid #000',
            'padding-bottom': '0px',
            'background-color': '#8888',
            'justify-content': 'space-between',
            'height': '40px'
        }, { 'title': 'Add a ' + (playermanagerSelectedMenu ? 'target' : 'friend') }, [controlAddButton, controlAddName]);
        append(make('div', { 'display': 'flex' }, {}, [
            make('div', {
                'width': '50%',
                'padding': '5px',
                'align-items': 'center',
                'border-bottom': '3px solid #000000',
                'border-right': '1px solid #000000',
                'padding-bottom': '0px',
                'padding-top': '0px',
                'justify-content': 'center',
                'background-color': '#88888888',
                'display': 'flex',
                'position': 'relative',
                'height': '40px'
            }, {
                'innerText': 'Friends',
                'title': 'Switch to list of ignored targets',
                'onclick': () => {
                    playermanagerSelectedMenu = 0;
                    refreshMenu(6);
                }
            }),
            make('div', {
                'width': '50%',
                'padding': '5px',
                'align-items': 'center',
                'border-bottom': '3px solid #000000',
                'border-left': '2px solid #000000',
                'padding-bottom': '0px',
                'padding-top': '0px',
                'justify-content': 'center',
                'background-color': '#88888888',
                'display': 'flex',
                'position': 'relative',
                'height': '40px'
            }, {
                'innerText': 'Targets',
                'title': 'Switch to list of prioritized targets',
                'onclick': () => {
                    playermanagerSelectedMenu = 1;
                    refreshMenu(6);
                }
            })
        ]));
        append(controlAdd);

        for (let username of list) {
            let entryNameDiv = make("div", {
                'width': '240px',
                'user-select': 'text'
            }, { 'innerText': username }),
            entryButtonDiv = make("div", {
                'width': '30px',
                'height': '30px',
                'border': '4px solid #ffffff',
                'display': 'flex',
                'position': 'relative',
                'align-items': 'center',
                'justify-content': 'center',
                'background-color': '#ff0000cc'
            }, {
                'innerText': 'X',
                'onclick': () => {
                    toggleUsernameInlist(list, username);
                    refreshMenu(6);
                }
            }),
            entryDiv = make("div", {
                'width': '100%',
                'display': 'flex',
                'padding': '5px',
                'border-bottom': '2px solid #000000',
                'padding-bottom': '0px',
                'height': '40px'
            }, {}, [entryNameDiv, entryButtonDiv]);

            append(entryDiv);
        }
    },

    //this menu was a serious pain in the ass
    refreshMenuUpgrades = append => {
        append(createControlToggle(autoUpgradesLabel[0], () => autoUpgrades[0] = !autoUpgrades[0], () => autoUpgrades[0]));

        let upgradeslotsDivs = [],
            perkSelectDiv = make("div", {
                'width': ' 100%',
                'display': 'grid',
                'grid-template-columns': 'auto auto auto auto auto'
            });

        for (let i = 1; i < 4; i++) {

            let upgradeNameDiv = make("div"),
            perkSlotImageDiv = make("div", {
                'width': '30px',
                'height': '30px',
                'border': '2px solid #000000',
                'padding': '0px',
                'vertical-align': '0px',
                'background-color': '#4448'
            }),
            upgradeSlotDiv = make("div", {
                'width': '100%',
                'padding': '5px',
                'display': 'flex',
                'border-bottom': '2px solid #000000',
                'padding-bottom': '0px',
                'justify-content': 'space-between',
                'height': '40px'
            }, {
                'onclick': () => {
                    perkSelectDiv.p(selectedPerkSlot = i);
                    for (let slot of upgradeslotsDivs) slot.f();
                }
            }, [upgradeNameDiv, perkSlotImageDiv]);

            //b = update
            //this is abstracted because closure compiler doesnt
            (upgradeSlotDiv.b = (perk, boolean) => {
                upgradeNameDiv.innerText = perkNames[perk] || 'No Perk Selected';
                removeChildren(perkSlotImageDiv);
                if (perk && j30[perk]) perkSlotImageDiv.append(dupeImg(j30[perk]));
            })(autoUpgrades[i], 1);

            //f = update visually
            //this is abstracted because closure compiler doesnt
            (upgradeSlotDiv.f = () => upgradeSlotDiv.style['background-color'] = i == selectedPerkSlot ? '#888c' : '#8886')();

            upgradeslotsDivs.push(upgradeSlotDiv);
        }

        //p = update
        //this is abstracted because closure compiler doesnt
        (perkSelectDiv.p = perkLevel => {
            removeChildren(perkSelectDiv);
            let perksToDisplay = perkLevel === 2 ? abilities : perks,
                perkLevelOther = 4 - perkLevel;
            for (let perk of perksToDisplay) {
                let perkImageDiv = make("div", {
                    'border': '2px solid ' + (autoUpgrades[perkLevel] === perk ? '#ffff00' : '#000000'),
                    'padding': '0px',
                    'height': perkSelectDiv.width / 4
                }, {
                    'onclick': () => {
                        //if this perk is already set, clear it
                        upgradeslotsDivs[perkLevel - 1].b(autoUpgrades[perkLevel] = autoUpgrades[perkLevel] === perk ? '' : perk);

                        //if the other setting is equal, clear it
                        if (perkLevelOther !== 2 && autoUpgrades[perkLevel] && autoUpgrades[perkLevelOther] === autoUpgrades[perkLevel]) upgradeslotsDivs[perkLevelOther - 1].b(autoUpgrades[perkLevelOther] = '');

                        //alternatively you can update just the perk selects that actually change but this is easier to do soo...
                        perkSelectDiv.p(perkLevel);

                        saveSettings();
                    }
                }, [j30[perk]]);
                perkSelectDiv.append(perkImageDiv);
            }
        })(selectedPerkSlot);
        for (let div of upgradeslotsDivs) append(div);
        append(perkSelectDiv);
    },

    refreshMenuScroller = append => {
        append(createControlToggle(scrollerLabel[enumsCharDict[9]], () => {
            if (chatScroll[CHATSCROLLER_TIMEOUT] == null) {
                startChatScrolling();
            } else {
                stopChatScrolling();
            }
        }, () => chatScroll[CHATSCROLLER_TIMEOUT]));

        //makes sure the values don't go past a certain unsafe point
        let clampValues = () => {
            chatScroll[CHATSCROLLER_WIDTH] = clamp(5, chatScroll[CHATSCROLLER_WIDTH], 30);
            chatScroll[CHATSCROLLER_DIRECTION] = clamp(-5, chatScroll[CHATSCROLLER_DIRECTION], 5);
            chatScroll[CHATSCROLLER_INTERVAL] = clamp(25, chatScroll[CHATSCROLLER_INTERVAL], 1000);
            chatScroll[CHATSCROLLER_SEPERATOR] = chatScroll[CHATSCROLLER_SEPERATOR].slice(0, 5);
            chatScroll[CHATSCROLLER_TEXT] = chatScroll[CHATSCROLLER_TEXT].slice(0, 9999);
            chatScroll[CHATSCROLLER_PAUSEPERIOD] = clamp(500, chatScroll[CHATSCROLLER_PAUSEPERIOD], 10000);
            saveSettings();
        };

        for (let attribute of [CHATSCROLLER_WIDTH, CHATSCROLLER_DIRECTION, CHATSCROLLER_INTERVAL, CHATSCROLLER_PAUSEPERIOD]) append(createControlValue(scrollerLabel[attribute], i => {
            chatScroll[attribute] += (CHATSCROLLER_PAUSEPERIOD == attribute ? 500 : CHATSCROLLER_INTERVAL == attribute ? 25 : 1) * i;
            clampValues();
        }, () => chatScroll[attribute] / (attribute == CHATSCROLLER_PAUSEPERIOD ? 1000 : 1)));

        for (let attribute of [CHATSCROLLER_SEPERATOR, CHATSCROLLER_TEXT]) {
            let controlTextNameDiv = make("div", {'margin-top': '3px', 'margin-right': '8px', 'display': 'flex'}, { 'innerText': scrollerLabel[attribute][0]}),
            controlTextInputDiv = make('input', {
                'width': attribute == CHATSCROLLER_TEXT ? 'calc(100% - 10px)' : '70px',
                'height': '34px',
                'color': '#000',
                'border': '4px solid #ffffff',
                'display': 'flex',
                'position': 'relative',
                'align-items': 'center',
                'justify-content': 'center',
                'background-color': '#ffffffcc'
            }, {
                'type': 'text',
                'oninput': () => {
                    chatScroll[attribute] = controlTextInputDiv.value;
                    clampValues();
                    controlTextInputDiv.value = chatScroll[attribute];
                },
                'onfocus': () => textBoxFocused = 1,
                'onblur': () => textBoxFocused = 0,
                'value': chatScroll[attribute]
            }),
            controlTextDiv = make("div", {
                'width': '100%',
                'display': 'flex',
                'padding': '5px',
                'padding-top': '2px',
                'border-bottom': '2px solid #000000',
                'padding-bottom': '0px',
                'justify-content': 'space-between',
                'height': '40px'
            }, { 'title': scrollerLabel[attribute][1] }, [controlTextNameDiv, controlTextInputDiv]);
            append(controlTextDiv);
        }
    },

    refreshMenuAntiAim = append => {
        let clampValues = () => {
            antiAim[ANTIAIM_ANGLESTART] = (360 + antiAim[ANTIAIM_ANGLESTART]) % 360;
            antiAim[ANTIAIM_ANGLERANGE] = (365 + antiAim[ANTIAIM_ANGLERANGE]) % 365;
            antiAim[ANTIAIM_SPINSPEED] = clamp(-120, antiAim[ANTIAIM_SPINSPEED], 120);
            antiAim[ANTIAIM_DELAY] = clamp(1, antiAim[ANTIAIM_DELAY], 60);
        };

        //toggleable settings
        for (let attribute of [ANTIAIM_RELOAD, ANTIAIM_SHOOT, ANTIAIM_IDLE, ANTIAIM_DRAWREALAIM]) append(createControlToggle(antiAimLabel[attribute], () => antiAim[attribute] = !antiAim[attribute], () => antiAim[attribute]));

        //number settings
        for (let attribute of [ANTIAIM_ANGLESTART, ANTIAIM_ANGLERANGE, ANTIAIM_SPINSPEED, ANTIAIM_DELAY]) append(createControlValue(antiAimLabel[attribute], i => clampValues(antiAim[attribute] += ((ANTIAIM_ANGLESTART + ANTIAIM_ANGLERANGE).includes(attribute) ? 5 : 1) * i), () => antiAim[attribute]));

        updateMenuCanvas = (me, offset, players, crates) => {
            if (divs.menu.hidden) return;
            let angle1 = (antiAim[ANTIAIM_ANGLESTART] + tickCount * antiAim[ANTIAIM_SPINSPEED]) * degToRad,
                angle2 = angle1 + antiAim[ANTIAIM_ANGLERANGE] * degToRad,
                length = me.radius * 1.5 + 20;
            drawLine2(me, {
                x: length * Math.sin(angle1),
                y: length * Math.cos(angle1)
            }, offset, 2, '#f00');
            drawLine2(me, {
                x: length * Math.sin(angle2),
                y: length * Math.cos(angle2)
            }, offset, 2, '#00f');
            ctx.lineWidth = 1;
            ctx.beginPath();
            //fuck this shit
            ctx.arc(me.x + offset.x, me.y + offset.y, length, -angle1 + doublePI / 4, -angle2 + doublePI / 4, true);
            ctx.stroke();
        };
        
    },

    refreshMenuPerkBots = append => {
        append(createControlDropdown(['KnifeBot (WIP)', 'Automatically shoots a knife at very near enemies, currently being worked on, dont use unless for bug hunting or playtesting'], [
            createControlToggle(perkBotsLabel[PERKBOTS_KNIFE], () => perkBots[PERKBOTS_KNIFE] = !perkBots[PERKBOTS_KNIFE], () => perkBots[PERKBOTS_KNIFE]),
            createControlValue(perkBotsLabel[PERKBOTS_KNIFEMAXRANGE], i => perkBots[PERKBOTS_KNIFEMAXRANGE] = clamp(20, perkBots[PERKBOTS_KNIFEMAXRANGE] + 10 * i, 300), () => perkBots[PERKBOTS_KNIFEMAXRANGE])
        ]));
    },

    refreshMenuPaint = append => {
        //a menu for changing model colors, similar to what public vaakir client has but extended
        //this is the only one i had made a concept design for
        //https://cdn.discordapp.com/attachments/828690456330108938/1005149323417370684/unknown.png
    },

    refreshMenuRecorder = append => {
        //a game recorder similar to nitrogem's recorder but it works offline and doesn't need an iframe to play
        //it back since it just plays back server packets while making the game think it is connected to one
    },

    refreshMenuTHNet = append => {
        let divs = [];
        append(createControlToggle(THNetLabel[THNET_ENABLE], () => {
            THNet[THNET_ENABLE] = !THNet[THNET_ENABLE];
            if (c3 !== null) {
                if (THNet[THNET_ENABLE]) {
                    connectToTHNet();
                } else if (THNet[THNET_SOCKET]) {
                    THNet[THNET_SOCKET].close();
                }
            }
        }, () => THNet[THNET_ENABLE]));
        for (let username of brothers) {
            let entryNameDiv = make("div", {
                'width': '240px',
                'user-select': 'text'
            }, { 'innerText': username }),
            entryDiv = make("div", {
                'width': '100%',
                'display': 'flex',
                'padding': '5px',
                'border-bottom': '2px solid #000000',
                'padding-bottom': '0px',
                'height': '40px'
            }, {}, [entryNameDiv]);
            divs.push(entryDiv);
        }
        append(createControlDropdown(THNetLabel[THNET_MEMBERS], divs));
    },

    refreshMenuAdvanced = append => {
        for (let setting in advanced) {
            let control;
            switch (setting) {
                case ADVANCED_TPS:
                    control = createControlToggle(advancedLabel[setting], () => advanced[setting] = 3.5 - advanced[setting], () => advanced[setting] === 1);
                    break;
                case ADVANCED_OPTIMISEWALLCHECK:
                    control = createControlToggle(advancedLabel[setting], () => advanced[setting] = !advanced[setting], () => advanced[setting]);
                    break;
                case ADVANCED_PINGCOUNT:
                    control = createControlValue(advancedLabel[setting], i => advanced[setting] = clamp(1, advanced[setting] + i, 50), () => advanced[setting]);
                    break;
                case ADVANCED_PINGCOMP:
                    control = createControlValue(advancedLabel[setting], i => advanced[setting] = clamp(1, advanced[setting] + i, 100), () => advanced[setting]);
                    break;
                default:
                    control = createControlValue(advancedLabel[setting], i => advanced[setting] = clamp(0.5, advanced[setting] + 0.05 * i, 2.5), () => advanced[setting]);
            }
            append(control);
        }
        append(createControlButton(['Disconnect', 'Disconnect from the current server'], () => {
            for (let server of RF.list) server.socket.close();
        }));
        //contains controls for changing specific stuff like the aimbots' aim constants, network settings, and so on
    },

    refreshMenuCredits = append => {
        for (let entry of credits) for (let i in entry) {
            let bool = i == 0;
            append(make("div", {
                'font-size': bool ? '30px' : i & 1 ? '25px' : '20px',
                'border-top': bool ? '4px solid #000000' : '',
                'margin-top': bool ? '10px' : i & 1 ? '15px' : '5px',
                'padding-top': bool ? '10px' : '',
                'padding-left': '5px'
            }, { 'innerText': entry[i] }));
        }
    },

    pingDisplay = () => {

        //starts at 5 padding so it isn't directly on the screen's edge, looks nicer
        let pingTextPadding = 5,
            fallbackText = 'Not Connected',
            pingSocket = RF.list[0] || {
                currentPing: fallbackText,
                [ATTRIBUTE_AVERAGEPING]: fallbackText,
                [ATTRIBUTE_MAXPING]: fallbackText,
                [ATTRIBUTE_MINPING]: fallbackText
            },
            pingTexts = [
                'Ping: ' + pingSocket.currentPing + ' ms',
                'Avg.: ' + Math.round(pingSocket[ATTRIBUTE_AVERAGEPING]) + ' ms',
                'Max:  ' + pingSocket[ATTRIBUTE_MAXPING] + ' ms',
                'Min:  ' + pingSocket[ATTRIBUTE_MINPING] + ' ms'
            ];

        //if we're in a game or not
        if (b21 || c28) {
            pingTextPadding += 10;
            
            //second padding for the VIP tag
            if (selfPremiumMember) pingTextPadding += 35;

            //second padding for the username text
            if (b3 || b4) {
                ctx.font = "14px Arial";
                pingTextPadding += Math.ceil(ctx.measureText((b3 ? 'Logged in' : 'Playing') + ' as ' + b4).width);
            }
        }
        ctx.font = 'bold 14px consolas';

        //draw the ping number
        for (let i = 0; i < pingTexts.length; i++) drawText(pingTextPadding, 15 + (i * 17), pingTexts[i], '#fff');

        //return the padding for the render time so we dont draw the render time text over server ping text
        return pingTextPadding + Math.ceil(ctx.measureText(pingTexts[2]).width);
    },

    getEnemies = (me, players) => {

        //two of those will be returned and one of those will be used in the distance check
        let enemies = [];

        for (let player of players) {
            //dont aimbot at invincible players
            if (player.invincible
            //dont aimbot at the developer of this cheat
            || player[ATTRIBUTE_USERNAMEHASH] === developerHash
            //dont aimbot at team mates
            || (player.teamCode && player.teamCode == me.teamCode)
            //dont aimbot at chatting people if that setting is enabled
            || (aimbot[AIMBOT_IGNORECHATTING] && player.chatBoxOpen)
            //dont aimbot at people the aimbot is not supposted to shoot at
            || friends.includes(sanitiseName(player.username))
            //dont aimbot at other tiohax users
            || brothers.includes(sanitiseName(player.username))) continue;
            enemies.push(player);
        }

        return enemies;
    },

    getDistanceSquared = (me, enemy, offset) => ((me.x - offset.x) - enemy.x) ** 2 + ((me.y - offset.y) - enemy.y) ** 2,

    //calculate where someone will be with respect to how long it takes to get there
    calcAheadness = (enemy, distance, includePrevPos, gun) => {

        let x = enemy.x,
            y = enemy.y;

        //mathematical
        distance = (Math.sqrt(distance) - offsets[gun]) / (velocities[gun] * (includePrevPos ? advanced[ADVANCED_AIMCONSTANTSMOOTH] : advanced[ADVANCED_AIMCONSTANT]));

        //aim a bit more ahead depending on the connection, since some server ticks may have happened during transport
        if (aimbot[AIMBOT_PINGCOMPENSATION]) distance += RF.list[0][ATTRIBUTE_AVERAGEPING] / advanced[ADVANCED_PINGCOMP];

        //the larger the distance, the more the velocity of the enemy needs to be applied
        x += enemy.spdX * distance;
        y += enemy.spdY * distance;

        //Formula for "Pos + Vel + Acc + Time => New Pos": (np = new pos, p = pos, v = vel, t = time, a = acc) np = (p) + (v * t) + (0.5 * a * t²)
        //TODO: fix when a player just stops going in one direction that the bot stops thinking it is ging in the opposite direction
        if (aimbot[AIMBOT_USEACCELERATION]) {
            //0.5 * 0.5 = 0.25
            //0.5 because halving the not fully completed average
            x += 0.25 * (enemy[ATTRIBUTE_ACCX] + enemy[ATTRIBUTE_PREVACCX]) * (distance ** 2)
            y += 0.25 * (enemy[ATTRIBUTE_ACCY] + enemy[ATTRIBUTE_PREVACCY]) * (distance ** 2)
        }

        return {x, y};
    },

    wouldHitWall = (me, enemy, crates, gun) => {
        let enemyPos = aimbot[AIMBOT_USEAHEAD] ? calcAheadness(enemy, getDistanceSquared(me, enemy, nullPos), !enemy.dashing && aimbot[AIMBOT_AIMSMOOTHING], gun) : enemy,
            relPos = {
                x: enemyPos.x - me.x,
                y: enemyPos.y - me.y
            },
            possibleAngle = Math.atan2(relPos.y, relPos.x) + Math.asin(18 / Math.sqrt(relPos.x ** 2 + relPos.y ** 2)),
            handAngle = 0 - (doublePI * 0.6 + possibleAngle),
            gunOffset = offsets[gun] + velocities[gun] - 14,
            gunAngle = 0 - (doublePI * 0.75 + possibleAngle),
            gunEnd = {
                x: me.x + (gun != 6) * Math.sin(handAngle) * me.radius + Math.sin(gunAngle) * gunOffset,
                y: me.y + (gun != 6) * Math.cos(handAngle) * me.radius + Math.cos(gunAngle) * gunOffset
            },
            hitCrates = [[gunEnd, enemyPos]],
            inclusionBox = {
                x: (gunEnd.x + enemyPos.x) / 2,
                y: (gunEnd.y + enemyPos.y) / 2,
                radius: Math.sqrt(getDistanceSquared(gunEnd.x, enemyPos.x, nullPos)) / 2
            };

        wallcheckoptimise: {
            for (let i = 0; i < crates.length; i++) {
                let crate = crates[i];

                //avoid calculating collisions if it would just be a waste
                if (!crate[ATTRIBUTE_BULLETCOLLISIONS] || getDistanceSquared(inclusionBox, crate, nullPos) > (inclusionBox.radius + crate[ATTRIBUTE_HITBOXRADIUS]) ** 2) continue;

                //if the crate intersects with the line, add them to the list of crates that have been hit
                //works by checking if the line from the gun end to the enemy position collides with any line from the crate hitbox
                for (let j = 0; j < crate[ATTRIBUTE_HITBOX].length; j++) {
                    if (collisionLineLine(
                        gunEnd.x, gunEnd.y,
                        enemyPos.x, enemyPos.y,
                        crate.x + crate[ATTRIBUTE_HITBOX][j][0], crate.y + crate[ATTRIBUTE_HITBOX][j][1],
                        crate.x + crate[ATTRIBUTE_HITBOX][j][2], crate.y + crate[ATTRIBUTE_HITBOX][j][3]
                    ) || collisionLineLine(
                        enemy.x, enemy.y,
                        enemyPos.x, enemyPos.y,
                        crate.x + crate[ATTRIBUTE_HITBOX][j][0], crate.y + crate[ATTRIBUTE_HITBOX][j][1],
                        crate.x + crate[ATTRIBUTE_HITBOX][j][2], crate.y + crate[ATTRIBUTE_HITBOX][j][3]
                    )) {
                        hitCrates.push(crate);
                        if (advanced[ADVANCED_OPTIMISEWALLCHECK]) break wallcheckoptimise;
                        break;
                    }
                }
            }
        }
        return hitCrates;
    },

    wouldHitFriend = () => {
        collisionLineCircle
    },

    //find nearest enemy
    //NOTE: all distances calculated here are left squared because it is not required for them to not be until later in aimTorwards(),
    //      and Math.sqrt() is slow as shit and this runs like 60 times a frame for each enemy nearby and thats gonna slow shit down
    getTarget = (me, offset, enemies, crates, minRange, maxRange, gun) => {

        //two of those will be returned and one of those will be used in the distance check
        let enemy = null, includeNonTargets = !aimbot[AIMBOT_TARGETSONLY],
            smallestDistanceToPoint = aimbot[AIMBOT_CURSORPROXIMITY] ? aimbot[AIMBOT_CURSORPROXCOSENESS] ** 2 : Infinity,
            distanceToMe, distanceToPoint, distance,
            c = {x: j9[0], y: j9[1]};

        for (let currentEnemy of enemies) {
            //compare distances and check if the current enemy to check is closer
            distanceToMe = getDistanceSquared(me, currentEnemy, nullPos);

            //or closer to the mouse if that setting is enabled
            if (aimbot[AIMBOT_CURSORPROXIMITY]) {
                distanceToPoint = getDistanceSquared(c, currentEnemy, offset);

                //draws lines from cursor to enemies
                if (esp[ESP_TRACERSCURSORENEMY]) drawLine(c, currentEnemy, offset, 1, '#888888');
            } else {
                distanceToPoint = distanceToMe;
            }

            if (distanceToPoint < smallestDistanceToPoint
            //if the enemy is too close for the gun to hit it
             && distanceToMe > minRange
            //if the enemy is too far for the gun to hit it
             && distanceToMe < maxRange
            //if focusing targets, only do further checks if the next enemy is a targetted one
             && (includeNonTargets || targets.includes(sanitiseName(currentEnemy.username)))
            ) {

                //only check if it hits crates if that setting is enabled else its wasted computing time
                let hitCrates = [];
                if (aimbot[AIMBOT_WALLCHECK]) {
                    hitCrates = wouldHitWall(me, currentEnemy, crates, gun);

                    //draw visualisers about which crate the raycast is hitting
                    if (esp[ESP_TRACERSWALLCHECK]) {
                        let pos = hitCrates[0];
                        ctx.globalAlpha = hitCrates.length > 1 ? 1 : 0.5;
                        ctx.strokeStyle = '#888888';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(pos[0].x + offset.x, pos[0].y + offset.y);
                        ctx.lineTo(pos[1].x + offset.x, pos[1].y + offset.y);
                        ctx.stroke();
                        ctx.globalAlpha = 0.5;
                        for (let i = 1; i < hitCrates.length; i++) hitCrates[i][METHOD_FILLHITBOX]();
                        ctx.globalAlpha = 1;
                    }
                }

                //if the raycast isnt hitting anything
                //NOTE: first hitCrates element is not a crate, it is the raycast line
                if (hitCrates.length < 2) {
                    if (aimbot[AIMBOT_TARGETMODE] && includeNonTargets && targets.includes(sanitiseName(currentEnemy.username))) includeNonTargets = 0;
                    smallestDistanceToPoint = distanceToPoint;
                    distance = distanceToMe;
                    enemy = currentEnemy;
                }
            }
        }

        //a visualiser so you know whats close to your cursor
        if (aimbot[AIMBOT_CURSORPROXIMITY]) {
            if (enemy) drawLine(c, enemy, offset, 2, '#888888');
            let radius = Math.sqrt(smallestDistanceToPoint);
            ctx.beginPath();
            ctx.moveTo(c.x + radius, c.y);
            ctx.arc(c.x, c.y, radius, 0, doublePI);
            ctx.stroke();
        }

        return {enemy, distance};
    },

    //the actual aimbot component
    aimTorwards = (enemy, offset, distance, gun) => {

        //offset required so the aimbot doesnt aim at some spot at the bottom right
        let aimX = enemy.x,
            aimY = enemy.y,

            //this can only be set to true in the block where it checks if the enemy is dashing so the aimbot doesnt shoot too far backwards
            includePrevPos = 0;

        //not accounting for velocity when the enemy is dashing is mostly a better idea
        if (!enemy.dashing) {
            includePrevPos = aimbot[AIMBOT_AIMSMOOTHING];
            let ahead = calcAheadness(enemy, distance, includePrevPos, gun);
            aimX = ahead.x;
            aimY = ahead.y;
        }

        //immitate mouse cursor movement
        let clientX = (includePrevPos ? (prevAimX + aimX) / 2 : aimX) + offset.x,
            clientY = (includePrevPos ? (prevAimY + aimY) / 2 : aimY) + offset.y

        prevAimX = aimX;
        prevAimY = aimY;
        return {clientX, clientY};
    },

    hideAim = (me, offset) => {
        if (0 === tickCount % antiAim[ANTIAIM_DELAY]) {
            let angle = (antiAim[ANTIAIM_ANGLESTART] + antiAim[ANTIAIM_ANGLERANGE] * Math.random() + tickCount * antiAim[ANTIAIM_SPINSPEED]) * degToRad,
                ahead = me.radius / 2;
            antiAim[ANTIAIM_SAVEDX] = me.x + offset.x + ahead * Math.sin(angle);
            antiAim[ANTIAIM_SAVEDY] = me.y + offset.y + ahead * Math.cos(angle);
        }
        a57({
            clientX: antiAim[ANTIAIM_SAVEDX],
            clientY: antiAim[ANTIAIM_SAVEDY]
        }, 1);
    },

    connectToTHNet = () => {
        THNet[THNET_SOCKET] = applyAttrbutes(new WebSocket('wss://cheats.gatsio.repl.co/' + sanitiseName(b4) +  '/' + encodeURIComponent(o4.server + '/' + c22)), {
            'onopen': event => {},
            'onmessage': event => {
                let data = event.data.split(' ');
                switch (pInt(data.shift())) {
                    case 0: //load new people into dict without dublicates
                        for (let user of data) {
                            user = user.replace('%20', ' ');
                            if (!brothers.includes(user)) brothers.push(user);
                        }
                        break;
                    case 1: //remove a person from the dict
                        let i = brothers.indexOf(data[0]);
                        if (brothers.length - 1 > i) {
                            brothers[i] = brothers.pop();
                        } else {
                            brothers.pop();
                        }
                        break;
                    case 2: //serverwide chat
                        //TODO: make corner-chatbox and let it pile up messages using TauComms framework
                        let user = data.shift().replace('%20', ' '),
                            msg = data.join(' ').
                            msgElement = make('p', {
                                'padding-left': '3px'
                            }, {
                                'innerText': user + ': ' + msg.replace('\n', ' ')
                            });
                        if (messageAutoScroll) messagesDiv.scroll({ top: msgElement.scrollHeight, behavior: 'instant' });
                        divs.chatbox.append(msgElement);
                }
            },
            'onerror': event => {},
            'onclose': event => {
                brothers = [];
                THNet[THNET_SOCKET] = null;
            }
        });
    },

    //implement simple antiafk
    //simply go to middle for a step
    onAFK = () => {
        let me = RD.pool[c3],
            horizontal = j11 / 2 - me.x,
            vertical = j12 / 2 - me.y,
            key = horizontal > vertical ?
                horizontal > 0 ? keyCodeMap[KEYCODE_A] : keyCodeMap[KEYCODE_D]
            :   horizontal > 0 ? keyCodeMap[KEYCODE_S] : keyCodeMap[KEYCODE_W];

        pressKey(key);
        releaseKey(key);
    },

    onKill = victim => instantchat[INSTANTCHAT_ONKILL]                     && sendChatMessage(instantchat[INSTANTCHAT_ONKILLTEXT].replace('[[ENEMY]]', sanitiseName(victim.replace('Guest ', '')))),
    onDeath= killer => instantchat[INSTANTCHAT_ONDEATH]                    && sendChatMessage(instantchat[INSTANTCHAT_ONDEATHTEXT].replace('[[ENEMY]]', sanitiseName(killer.replace('Guest ', '')))),
    onHeal = patient=> instantchat[INSTANTCHAT_AUTOTHANK] && patient == c3 && sendChatMessage(instantchat[INSTANTCHAT_AUTOTHANKTEXT]);

    //this is the DRM!
    setInterval(console.dir, 10000, "GATS.io TioHax Menu\nMade by Taureon." + (DRMuser ? "\nLent to " + DRMuser + "." : ""));

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

    RB.prototype[METHOD_FILLHITBOX] = function () {
        let relPos = c2.getRelPos(this);
        ctx.beginPath();
        ctx.moveTo(this[ATTRIBUTE_HITBOX][0][0] + relPos.x, this[ATTRIBUTE_HITBOX][0][1] + relPos.y);
        for (let i = 1; i < 4; i++) ctx.lineTo(this[ATTRIBUTE_HITBOX][i][0] + relPos.x, this[ATTRIBUTE_HITBOX][i][1] + relPos.y);
        ctx.closePath();
        ctx.fill();
    };

    //dont forget to make METHOD_STROKEHITBOX
    // RB.prototype[METHOD_STROKEHITBOX] = function () {
    //     for (let i = 0; i < 4; i++) {
    //         ctx.strokeStyle = ['#f00', '#ff0', '#0f0', '#00f'][i];
    //         ctx.beginPath();
    //         ctx.moveTo(this[ATTRIBUTE_HITBOX][i][0] + this.x + offset.x, this[ATTRIBUTE_HITBOX][i][1] + this.y + offset.y);
    //         ctx.lineTo(this[ATTRIBUTE_HITBOX][i][2] + this.x + offset.x, this[ATTRIBUTE_HITBOX][i][3] + this.y + offset.y);
    //         ctx.stroke();
    //     }
    // };

    //because generating the hitbox everytime a hit calculation needs to be done is terrible so it's done everytime it spawns or gets updated instead
    RB.prototype[METHOD_MAKEHITBOX] = function () {

        //this line exists because `this.angle` is weird
        let angle = 0 - (this.angle * degToRad - Math.PI / 2),

            //move the hitbox a bit forward because client-side position of this is wrong if it's a shield
            offsetvals = {
                x: this[ATTRIBUTE_HITBOXFORWARDOFFSET] * Math.sin(angle),
                y: this[ATTRIBUTE_HITBOXFORWARDOFFSET] * Math.cos(angle)
            },

            //generate the relative corners
            points = [
                Math.atan2(    this[ATTRIBUTE_WIDTH],     this[ATTRIBUTE_HEIGHT]) + angle,
                Math.atan2(0 - this[ATTRIBUTE_WIDTH],     this[ATTRIBUTE_HEIGHT]) + angle,
                Math.atan2(0 - this[ATTRIBUTE_WIDTH], 0 - this[ATTRIBUTE_HEIGHT]) + angle,
                Math.atan2(    this[ATTRIBUTE_WIDTH], 0 - this[ATTRIBUTE_HEIGHT]) + angle
            ],

            //should rather be called something else but it is the distance from the center to a corner so it still works.
            distance = Math.sqrt(this[ATTRIBUTE_WIDTH] ** 2 + this[ATTRIBUTE_HEIGHT] ** 2);

        //turn the 4 corners into 4 lines, which will be used to do raycast calculations
        for (let i = 0; i < 4; i++) {
            points[i] = {
                x: offsetvals.x + distance * Math.sin(points[i]),
                y: offsetvals.y + distance * Math.cos(points[i])
            };
        }
        this[ATTRIBUTE_HITBOX] = [
            [points[0].x, points[0].y, points[1].x, points[1].y],
            [points[1].x, points[1].y, points[2].x, points[2].y],
            [points[2].x, points[2].y, points[3].x, points[3].y],
            [points[3].x, points[3].y, points[0].x, points[0].y]
        ];

        this[ATTRIBUTE_HITBOXOFFSET] = offsetvals;
        this[ATTRIBUTE_HITBOXRADIUS] = distance;
    };

    RB.prototype.activate = function (data) {
        this.parent = data.parentId;
        this.type = data.type;
        this.x = data.x / 10;
        this.y = data.y / 10;
        this.angle = data.angle;
        this.maxHp = data.maxHp;
        this.hp = data.hp;
        this.isPremium = data.isPremium;
        this.model = a11(this.type, this.isPremium);
        this[ATTRIBUTE_WIDTH] = 0;
        this[ATTRIBUTE_HEIGHT] = 0;
        this[ATTRIBUTE_HITBOXFORWARDOFFSET] = 0;
        this[ATTRIBUTE_BULLETCOLLISIONS] = 0;
        switch (this.type) {
            case "crate":
                this[ATTRIBUTE_WIDTH] = 45;
                this[ATTRIBUTE_HEIGHT] = 45;
                this[ATTRIBUTE_BULLETCOLLISIONS] = 1;
                break;
            case "longCrate":
                this[ATTRIBUTE_WIDTH] = 45;
                this[ATTRIBUTE_HEIGHT] = 20;
                this[ATTRIBUTE_BULLETCOLLISIONS] = 1;
                break;
            case "userCrate":
            case "premiumCrate":
                this[ATTRIBUTE_WIDTH] = 15;
                this[ATTRIBUTE_HEIGHT] = 15;
                this[ATTRIBUTE_BULLETCOLLISIONS] = 1;
                break;
            case "shield":
                this[ATTRIBUTE_WIDTH] = 30;
                this[ATTRIBUTE_HEIGHT] = 10;
                this[ATTRIBUTE_HITBOXFORWARDOFFSET] = 33;
                this[ATTRIBUTE_BULLETCOLLISIONS] = 1;
                break;
        }
        this.activated = 1;
        this[METHOD_MAKEHITBOX]();
    };

    RB.prototype.update = function () {
        if (this.type == "shield") {
            var parent = RD.pool[this.parent];
            if (parent) {
                var angle = parent.playerAngle * degToRad; 
                this.x = parent.x + parent.spdX / advanced[ADVANCED_TPS] + Math.cos(angle);
                this.y = parent.y + parent.spdY / advanced[ADVANCED_TPS] + Math.sin(angle);
                this.angle = parent.playerAngle;
            }
        }
    };

    RB.prototype.applyUpdate = function (data) {
        this.x = data.x / 10;
        this.y = data.y / 10;
        this.angle = data.angle;
        if (data.hp !== undefined && data.hp != "") this.hp = pInt(data.hp);
        this[METHOD_MAKEHITBOX]();
    };

    //both of those to reset the acceleration values aswell
    RD.prototype.activate = async function(data, bool) {
        this.class = data.class;
        this.color = data.color;
        this.x = parseFloat(data.x / 10);
        this.y = parseFloat(data.y / 10);
        this[ATTRIBUTE_PREVACCX] = this[ATTRIBUTE_PREVACCY] = this[ATTRIBUTE_ACCX] = this[ATTRIBUTE_ACCY] = 0;
        this.radius = pInt(data.radius / 10);
        this.playerAngle = pInt(data.playerAngle);
        this.hp = pInt(data.hp);
        this.hpRadius = this.hp * this.radius / 100;
        this.armorAmount = pInt(data.armorAmount);
        this.shootingAnimation = a6("shooting", this.class);
        this.ghillie = data.ghillie;
        this.maxBullets = data.maxBullets;
        this.invincible = data.invincible;
        this[ATTRIBUTE_USERNAMEHASH] = hashString(sanitiseName(this[ATTRIBUTE_TAGGEDNAME] = this.username = formatUserName(data.username)));
        this.isLeader = pInt(data.isLeader);
        this.isPremiumMember = pInt(data.isPremiumMember);
        this.teamCode = pInt(data.teamCode);
        this.chatBoxOpen = pInt(data.chatBoxOpen);
        this.activated = 1;
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
        if (c22 == 'FFA' && !this[ATTRIBUTE_TAGGEDNAME].startsWith('Guest ')) {
            if (this.username in clanTagCache) {
                if (clanTagCache[this.username]) this[ATTRIBUTE_TAGGEDNAME] = '[' + clanTagCache[this.username] + '] ' + this[ATTRIBUTE_TAGGEDNAME];   
            } else {
                let clanTag = await fetchFromServer('clanof/' + this[ATTRIBUTE_TAGGEDNAME]);
                if (clanTagCache[this.username] = clanTag) this[ATTRIBUTE_TAGGEDNAME] = '[' + clanTag + '] ' + this[ATTRIBUTE_TAGGEDNAME];
            }
        }
    };

    RD.prototype.applyFirstPersonUpdateData = function (data) {
        if (data.currentBullets !== undefined && data.currentBullets != "") this.currentBullets = parseInt(data.currentBullets);
        if (data.score !== undefined && data.score != "") this.score = parseInt(data.score);
        if (data.kills !== undefined && data.kills != "") this.kills = parseInt(data.kills);
        if (data.rechargeTimer !== undefined) c9 = {current: parseInt(data.rechargeTimer) * advanced[ADVANCED_TPS], total: parseInt(data.rechargeTimer) * advanced[ADVANCED_TPS]};
        if (data.maxBullets !== undefined && data.maxBullets != "") this.maxBullets = parseInt(data.maxBullets);
        if (data.c2 !== undefined && data.c2 != "") {
            j7 = data.c2.split("x")[0];
            j8 = data.c2.split("x")[1];
            a1();
        }
        if (data.thermal !== undefined && data.thermal != "") this.thermal = parseInt(data.thermal);
        if (data.numExplosivesLeft !== undefined && data.numExplosivesLeft != "") this.numExplosivesLeft = parseInt(data.numExplosivesLeft);
    };
    RD.prototype.update = function () {
        this.updateHpRadius();
        if (this.hp > 0) {
            this.x += Math.round(this.spdX / advanced[ADVANCED_TPS]);
            this.y += Math.round(this.spdY / advanced[ADVANCED_TPS]);
        }
        this.updateChatMessage();
    };

    //keep track of acceleration
    RD.prototype.applyPrimaryUpdate = function(data) {
        this.x = parseFloat(data.x / 10);
        this.y = parseFloat(data.y / 10);
        let spdX = parseFloat(data.spdX / 10);
        let spdY = parseFloat(data.spdY / 10);
        this[ATTRIBUTE_PREVACCX] = this[ATTRIBUTE_ACCX];
        this[ATTRIBUTE_PREVACCY] = this[ATTRIBUTE_ACCY];
        this[ATTRIBUTE_ACCX] = spdX - this.spdX;
        this[ATTRIBUTE_ACCY] = spdY - this.spdY;
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

    //yes i could use addEventListener but I felt like doing it this way anyway
    document.onkeydown = keyEvent => {

        //prevents stupidness
        if (textBoxFocused && !keyEvent[ATTRIBUTE_ISFROMCHEAT]) return;

        let msg = instantchat[INSTANTCHAT_CHATBINDSTEXTS][keyEvent.keyCode];

        //if the key code is the key code used to toggle the menu
        if ((!(j46 || c4) && keyEvent.keyCode == keyCodeMap[KEYCODE_T])
        //if the chatbox is closed and if we are in a game
         || (c4 && !j46 && (msg || Object.values(keyCodeMap).includes(keyEvent.keyCode)))
         ) {
            keyEvent.preventDefault();
            switch (keyEvent.keyCode) {
                case keyCodeMap[KEYCODE_A]:
                case keyCodeMap[KEYCODE_ARROWLEFT]:
                    RF.list[0].send(a59("key-press", {inputId: 0, state: 1}));
                    RF.list[0].send(a59("key-press", {inputId: 1, state: 0}));
                    break;
                case keyCodeMap[KEYCODE_D]:
                case keyCodeMap[KEYCODE_ARROWRIGHT]:
                    RF.list[0].send(a59("key-press", {inputId: 1, state: 1}));
                    RF.list[0].send(a59("key-press", {inputId: 0, state: 0}));
                    break;
                case keyCodeMap[KEYCODE_W]:
                case keyCodeMap[KEYCODE_ARROWUP]:
                    RF.list[0].send(a59("key-press", {inputId: 2, state: 1}));
                    RF.list[0].send(a59("key-press", {inputId: 3, state: 0}));
                    break;
                case keyCodeMap[KEYCODE_S]:
                case keyCodeMap[KEYCODE_ARROWDOWN]:
                    RF.list[0].send(a59("key-press", {inputId: 3, state: 1}));
                    RF.list[0].send(a59("key-press", {inputId: 2, state: 0}));
                    break;
                case keyCodeMap[KEYCODE_R]:
                    RF.list[0].send(a59("key-press", {inputId: 4, state: 1}));
                    break;
                case keyCodeMap[KEYCODE_SPACE]:
                    RF.list[0].send(a59("key-press", {inputId: 5, state: 1}));
                    break;
                case keyCodeMap[KEYCODE_N]:
                    o10.push({type: 8, content: c37 = !c37, initTime: Date.now()});
                    break;
                case keyCodeMap[KEYCODE_T]:
                    divs.menu.hidden = !divs.menu.hidden;
                    break;
                //if the key is assigned a chat bind, say something in chat
                default:   
                    if (instantchat[INSTANTCHAT_CHATBINDS] && msg) {
                        let padding = ' '.repeat(chatbindSpaceCount = (chatbindSpaceCount + 1) & 1);
                        sendChatMessage(padding + msg + padding);
                    }
            }
        }

        let chatboxContainer = document.getElementById("chatboxContainer"),
            chatbox = document.getElementById("chatbox");

        //handle enter press
        if (keyEvent.keyCode == keyCodeMap[KEYCODE_ENTER] && c4 && !c28) {
            //get chat input value
            j47 = chatbox.value;

            //if there is a chat input value, send it as a chat message
            if (j46 && j47 != "") {
                sendChatMessage(j47.replace(/,/g, "~").substring(0, 30));
                chatboxContainer.style.display = "none";
                chatbox.value = j47 = "";

            //if no chat input value, close the chat input
            } else if (j46 && j47 == "") {
                chatboxContainer.style.display = "none";
            } else if (!j46) {
                chatboxContainer.style.display = "inline-block";
                chatbox.focus();
            }
            RF.list[0].send(a59("focus"));
            j46 = !j46;
            if (!misc[MISC_HIDECHATTING]) RF.list[0].send(a59("key-press", {inputId: 7, state: j46 * 1}));
        }

        //if ESC key pressed, simply close the chat input
        if (keyEvent.keyCode == keyCodeMap[KEYCODE_ESC] && j46) {
            chatboxContainer.style.display = "none";
            j46 = 0;
            if (!misc[MISC_HIDECHATTING]) RF.list[0].send(a59("key-press", {inputId: 7, state: 0}));
        }
    };

    a57 = (event, isBot, isKnife) => {
        let relPos = c2.getRelPos(RD.pool[c3]);
        if (!isBot) {
            relPos.x *= j6;
            relPos.y *= j5;
        }
        relPos.x -= event.clientX;
        relPos.y -= event.clientY;
        let mouseAngle = Math.atan2(relPos.y, relPos.x) / degToRad + 180,
            playerAngle = mouseAngle + (isKnife ? 0 : Math.asin(18 / Math.sqrt(relPos.x ** 2 + relPos.y ** 2)) / degToRad),
            me = RD.pool[c3];
        j16 = [Math.round(relPos.x), Math.round(relPos.y), Math.round(mouseAngle)];
        if (!playerAngle && playerAngle !== 0) playerAngle = mouseAngle;
        me.mouseAngle = Math.round(mouseAngle);
        me.playerAngle = Math.round(playerAngle);
        j9 = [event.clientX, event.clientY];
        if (esp[ESP_CAMUSEREALPOSITION]) {
            relPos.x += event.clientX - cursor.x;
            relPos.y += event.clientY - cursor.y;
            me.mouseAngle = Math.atan2(relPos.y, relPos.x) / degToRad + 180;
        }
        j39 = Math.sqrt(relPos.x ** 2 + relPos.y ** 2);
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
                    if (THNet[THNET_ENABLE] && THNet[THNET_SOCKET] === null) connectToTHNet();
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
            if (esp[ESP_ZOOM] && (j7 != 1920 || j8 != 1080)) {
                normalCameraScale.width = j7;
                normalCameraScale.height = j8;
                j7 = 1920;
                j8 = 1080;
                a1();
            } else if (!esp[ESP_ZOOM] && (j7 == 1920 && j8 == 1080)) {
                j7 = normalCameraScale.width;
                j8 = normalCameraScale.height;
                a1();
            }

            //shows landmines
            for (let i in landMine[0]) landMine[0][i][1][3] = esp[ESP_SHOWINVIS] ? '#000000' : '#e8e8ed';

            j17 = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            c2.update();
            a16(ctx, c2);
            for (var i in RA.pool) {
                let entity = RA.pool[i];
                if (!entity.activated || entity.type != "landMine") continue;
                entity.update();
                entity.draw(ctx, c2);
            }
            for (var i in RC.pool) {
                let bullet = RC.pool[i];
                if (!bullet.activated) continue;
                bullet.update();
                bullet.draw(ctx, c2);
            }
            for (var i in RB.pool) {
                let crate = RB.pool[i];
                if (!crate.activated) continue;
                crate.update();
                crate.draw(ctx, c2);
                if (!crate[ATTRIBUTE_HITBOX]) crate[METHOD_MAKEHITBOX]();
            }
            for (var i in RA.pool) {
                let entity = RA.pool[i];
                if (!entity.activated || entity.type == "landMine") continue;
                if (!entity[ATTRIBUTE_TIMEALIVEEXTRA]) entity[ATTRIBUTE_TIMEALIVEEXTRA] = 0;
                entity.update();
                entity.draw(ctx, c2);
            }
            for (var i in RD.pool) {
                let player = RD.pool[i];
                if (!player.activated || (c28 && player.id == c3)) continue;
                player.update();
                player.drawBody(ctx, c2);
                player.drawGun(ctx, c2);
            }
            for (var i in RA.pool) if (RA.pool[i].activated) RA.pool[i].drawEmission(ctx, c2);
            for (var i in j27) {
                var hitParticle = j27[i];
                if (hitParticle.c42++ < 5) {
                    j26(c2, hitParticle.x, hitParticle.y);
                } else {
                    delete hitParticle[i];
                }
            }
            a55(ctx, c2);
            //underscore to prevent variable name collision
            var _me = RD.pool[c3];
            if (misc[MISC_STATICHUD]) {
                c5 = _me.hp;
                c6 = _me.armorAmount;
                c7 = _me.score;
            }
            if (autoUpgrades[0]) autoUpgrade(_me);

            //fixes hud visual glitches
            //for some reason this works without major errors?
            j9 = [cursor.x, cursor.y];

            a9(_me);
            a100(_me);
            a13(ctx, c8);
            a44(ctx, j38);
        }
        a113();
        a56();

        //:trolleybus:
        j9[0] /= j6;
        j9[1] /= j5;

        //server latency display
        ctx.font = 'bold 14px consolas';
        if (misc[MISC_PINGDISPLAY]) renderDisplayPadding += pingDisplay() + 5;

        //draw the time taken to draw everything in the last frame
        if (misc[MISC_RENDERDISPLAY]) {
            drawText(renderDisplayPadding, 15, 'Render time: ' + renderTime + 'ms', '#fff');
        }

        //only do shit when in a game, else the cheat breaks
        if (c2) {
            ctx.font = 'bold 20px consolas';
            if (misc[MISC_SHOWFEATURES]) {
                let maxX = window.innerWidth - 5,
                    maxY = Math.floor(0.8662 * window.innerHeight),
                    things = {
                        'Player Attributes': esp[ESP_SHOWHEALTH] || esp[ESP_SHOWARMOR] || esp[ESP_SHOWMAGS] || esp[ESP_SHOWGUNSTATUS] || esp[ESP_SHOWRANGE],
                        'FFA Clan Display': misc[MISC_FFACLANDISPLAY],
                        'Chat Scroller': chatScroll[CHATSCROLLER_TIMEOUT],
                        'Invis Reveal': esp[ESP_SHOWINVIS] || esp[ESP_REVEALTEAMS],
                        'Auto Reload': misc[MISC_AUTORELOAD],
                        'Triggerbot': aimbot[AIMBOT_ENABLE] && aimbot[AIMBOT_TRIGGERBOT],
                        'Anti Aim': antiAim[ANTIAIM_RELOAD] || antiAim[ANTIAIM_SHOOT] || antiAim[ANTIAIM_IDLE],
                        'Aimbot': aimbot[AIMBOT_ENABLE],
                        'Zoom': esp[ESP_ZOOM] || esp[ESP_FIXCAMERA],
                        'ESP': esp[ESP_TRACERSBODYENEMY] || esp[ESP_TRACERSCURSORENEMY] || esp[ESP_TRACERSWALLCHECK] || esp[ESP_TRACERSGUN] || esp[ESP_TRACERSGRENADES]
                    },
                    colors = [
                               '#f0f',
                              '#80f',
                             '#00f',
                            '#0ff',
                           '#0f0',
                          '#ff0',
                         '#f80',
                        '#f00',
                        '#888',
                        '#000'
                    ], i = 0;
                for (let thing in things) {
                    if (things[thing]) {
                        drawText(maxX - ctx.measureText(thing).width, maxY - 10, thing, colors[i]);
                        maxY -= 20;
                    }
                    i++;
                }
            }

            //important variable declarations
            let players = [], crates = [],
                me = RD.pool[c3],
                playerScreenPos = c2.getRelPos(me),
                offset = {x: playerScreenPos.x - me.x, y: playerScreenPos.y - me.y},
                animationSubtraction = Math.ceil(RF.list[0][ATTRIBUTE_AVERAGEPING] / 2.5);

            //get all RELEVANT players and crates
            for (let player of getPool(RD)) if (player.activated && (esp[ESP_INCLUDEYOU] || player.id != me.id) && player.hp != 0) players.push(player);
            for (let crate of getPool(RB)) if (crate.activated) crates.push(crate);

            //draw tracers
            for (let player of players) {

                //if they have no bullets and they arent reloading, assume they have max bullets
                //because the server doesnt send accurate currentbullets info unless the other players update their bullet count in any way
                if (!player.reloading && player.currentBullets == 0) player.currentBullets = player.maxBullets;

                //the tracer
                if (esp[ESP_TRACERSBODYENEMY]) drawLine(playerScreenPos, player, offset, 1);

                let ringColor;
                //congrats, you're playing with the dev of this cheat
                if (player[ATTRIBUTE_USERNAMEHASH] == developerHash) {
                    ctx.globalAlpha = third * 2;
                    ringColor = 'blue';

                //make a light blue circle to signify fellow tiohax users
                } else if (brothers.includes(sanitiseName(player.username))) {
                    ctx.globalAlpha = third;
                    ringColor = 'blue';

                //make a dark circle to tell friends apart
                } else if (targets.includes(sanitiseName(player.username))) {
                    ctx.globalAlpha = 0.5;
                    ringColor = 'red';

                //make a dark circle to tell friends apart
                } else if (friends.includes(sanitiseName(player.username))) {
                    ctx.globalAlpha = 0.5;
                    ringColor = '#000';

                //show that they wont be shot at because they are chatting and the ignorechatting option is enabled
                } else if (aimbot[AIMBOT_IGNORECHATTING] && player.chatBoxOpen) {
                    ctx.globalAlpha = third;
                    ringColor = '#000';
                }

                if (ringColor) drawCircle(player, offset, player.radius * 1.4, 5, ringColor);

                //dont make the health value text transparent
                ctx.globalAlpha = 1;

                //draw the health values (hp and armor) either above or below the player
                //could be more elegant, but ehh
                    let x = player.x + offset.x - player.radius,
                        y = player.y + offset.y - (player.radius + 6);

                    //move health text further down if the player is chatting and above the upper half of the screen
                    //figuring out the exact offset values took 2 whole days of trial and error for some reason.
                if (esp[ESP_SHOWHEALTH]) {
                    drawText(x, y, player.hp, getColor(player));
                    y -= 20;
                }
                if (esp[ESP_SHOWARMOR]) {
                    drawText(x, y, player.armorAmount, '#666');
                    y -= 20;
                }
                if (esp[ESP_SHOWMAGS]) {
                    drawText(x, y, player.currentBullets + '/' + player.maxBullets, '#000');
                    y -= 20;
                }
                if (esp[ESP_SHOWGUNSTATUS]) {
                    drawText(x, y, player.shooting ? 'SHOOTING'
                                 : player.reloading ? 'RELOADING ' + percentify(player.reloadingAnimation ? player.reloadingFrame / (player.reloadingAnimation.length - animationSubtraction) : 0)
                                 : 'IDLE', '#888');
                }
                if (esp[ESP_SHOWRANGE]) {

                    let gun = gunMap[player.class],
                        bulletPathLength = ranges[gun] * velocities[gun];
                    ctx.globalAlpha = 1;
                    drawCircle2(player, offset, Math.sqrt((bulletPathLength * mathSin) ** 2 + (bulletPathLength * 0.5 + player.radius) ** 2), 3);
                    ctx.globalAlpha = 1;
                    drawCircle2(player, offset, Math.sqrt((bulletPathLength * 1.5 * mathSin) ** 2 + (bulletPathLength * 0.75 + player.radius) ** 2), 3);
                    ctx.globalAlpha = 1;
                }
            }

            //draw team affiliations of various stuff
            if (esp[ESP_REVEALTEAMS]) {
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
                        if (esp[ESP_TRACERSGRENADES] && item.timeAlive < item.travelTime) {
                            let factor = (item.travelTime - (item.timeAlive + item[ATTRIBUTE_TIMEALIVEEXTRA])) * advanced[ADVANCED_TPS];
                            item[ATTRIBUTE_TIMEALIVEEXTRA] += third;
                            drawLine2(item, {x: item.spdX * factor, y: item.spdY * factor}, offset, 1);
                        }
                    }
                }

                //reveal team affiliations of knifes
                for (let knife of getPool(RC)) if (knife.activated && knife.isKnife) drawCircle(knife, offset, 5, 2);
            }

            if (!perkBots[PERKBOTS_KNIFETICK]) a57({
                clientX: cursor.x / j6,
                clientY: cursor.y / j5
            }, 1);

            //no need to get a target if the setting isnt even activated
            let target = {},
                enemies = getEnemies(me, players),
                gun = gunMap[c1.weapon];
            if (aimbot[AIMBOT_ENABLE]) {

                //visual indicator that aimbot is enabled
                drawCircle(me, offset, 10, 2, '#000');

                //visual indicator that target mode is enabled
                if (aimbot[AIMBOT_TARGETMODE]) drawCircle(me, offset, 12, 2, 'gray');

                //if there is an enemy to rudely stare at, then look at them
                if (!(me.dashing && aimbot[AIMBOT_DISABLEWHENDASHING])) {

                    target = getTarget(me, offset, enemies, crates, gunMinRange, Infinity, gun);

                    if (target.enemy) {

                        //figure out the angle to aim at so our shots hit the enemy, hopefully
                        if (!perkBots[PERKBOTS_KNIFETICK]) a57(aimTorwards(target.enemy, offset, target.distance, gun), 1);

                        //draw a thicker tracer to indicate that this is the one the aimbot is aiming at
                        //literally just draw a second line over the thinner one
                        if (esp[ESP_TRACERSBODYENEMY]) drawLine(playerScreenPos, target.enemy, offset, 3);
                    }
                }
            }

            if (aimbot[AIMBOT_ENABLE] && aimbot[AIMBOT_WALLCHECK] && aimbot[AIMBOT_TRIGGERBOT]) {
                let gun = gunMap[c1.weapon],
                    bulletPathLength = ranges[gun] * velocities[gun] * ((o3[1] === perks[8] || o3[3] === perks[8]) ? 1.5 : 1),
                    rangeSquared = (bulletPathLength * mathSin) ** 2 + (bulletPathLength * 0.5 + me.radius) ** 2;

                drawCircle(me, offset, Math.sqrt(rangeSquared), 1, '#000');

                if (target && target.distance < rangeSquared && !(aimbot[AIMBOT_TRIGGERBOTWHENDOWN] && !cursor.isPressed)) {
                    startGunfire();
                } else {
                    stopGunfire();
                }
            }

            if (perkBots[PERKBOTS_KNIFE] && o3[2] === abilities[3] && c9.total - c9.current - animationSubtraction / 16 < 0) {
                let range = me.radius + perkBots[PERKBOTS_KNIFEMAXRANGE];
                drawCircle(me, offset, range, 3, '#f88');

                let target = getTarget(me, offset, enemies, crates, me.radius ** 2, range ** 2, 6);
                if (target.enemy && target.distance < range ** 2) {
                    a57(aimTorwards(target.enemy, offset, target.distance, 6), 1, 1);
                    if (perkBots[PERKBOTS_KNIFETICK]) pressKey(keyCodeMap[KEYCODE_SPACE]);
                    perkBots[PERKBOTS_KNIFETICK] = 1;

                } else {
                    perkBots[PERKBOTS_KNIFETICK] = 0;
                }
            } else {
                perkBots[PERKBOTS_KNIFETICK] = 0;
            }

            //the  H A N D  of  P O W E R R R R R
            gun = gunMap[c1.weapon];
            let newAngle = (me.playerAngle + 210) * -degToRad,
                gunOffset = offsets[gun] + velocities[gun] - 14,
                gunAngle = (me.playerAngle + 270) * -degToRad,
                hand = {
                    x: playerScreenPos.x + Math.sin(newAngle) * me.radius,
                    y: playerScreenPos.y + Math.cos(newAngle) * me.radius
                },
                gunEnd = {
                    x: hand.x + Math.sin(gunAngle) * gunOffset,
                    y: hand.y + Math.cos(gunAngle) * gunOffset
                };

            //draw a laser from the gun to the mouse cursor
            if (esp[ESP_TRACERSGUN]) {
                //scuffed
                drawLine2(hand, {x: j9[0] - hand.x, y: j9[1] - hand.y}, nullPos, 1, '#000');
                drawCircle(gunEnd, nullPos, 1, 2, 'red');
            }

            gunMinRange = (me.x + offset.x - gunEnd.x) ** 2 + (me.y + offset.y - gunEnd.y) ** 2;

            if (antiAim[ANTIAIM_DRAWREALAIM]) {
                if (me.shooting && me.shootingAnimation) {
                    me.shootingFrame--;
                    if (me.shootingFrame == -1) me.shootingFrame =+ me.shootingAnimation.length;
                } else if (me.reloading && me.reloadingAnimation) {
                    me.reloadingFrame--;
                    if (me.reloadingFrame == -1) me.reloadingFrame =+ me.reloadingAnimation.length;
                }
                me.drawGun(ctx, c2);
            }

            //if we are reloading and that setting is enabled, just spin so hopefully the enemy doesnt see how long it is until we finished reloading
            if (!(me.dashing || perkBots[PERKBOTS_KNIFETICK])) {
                if ((antiAim[ANTIAIM_IDLE]      && !(me.reloading || me.shooting || cursor.isShooting)) 
                    || (antiAim[ANTIAIM_RELOAD] && me.reloading && me.reloadingAnimation && (me.reloadingFrame < me.reloadingAnimation.length - animationSubtraction)) 
                    || (antiAim[ANTIAIM_SHOOT]  && me.shooting  && me.shootingAnimation  && (me.shootingFrame  < me.shootingAnimation.length  - animationSubtraction))
                ) hideAim(me, offset);
            }

            //update the server with our new aiming direction
            a37();

            //auto reload the gun if: not fully reloaded, not currently reloading, there are no enemies nearby, the player isnt shooting for no reason
            //reloads by pressing R to tell game to reload the gun
            if (misc[MISC_AUTORELOAD] && !(enemies.length || j18.x || j18.y || me.shooting || me.reloading || me.maxBullets == me.currentBullets)) pressKey(keyCodeMap[KEYCODE_R]);

            //if any menu is needing a canvas right now
            updateMenuCanvas(me, offset, players, crates);
        }

        tickCount++;

        //simplified next tick delay function
        if (RF.list[0]) RF.list[0].check();

        //guarantees that the next tick will happen in 16 since when this tick started
        renderTime = Date.now() - start;
        setTimeout(a41, (40 / advanced[ADVANCED_TPS]) - renderTime);
    };

    //make the hack menu
    loadSettings();
    createMenu();

    //get average recent ping instead of a very fluctuating value
    //also max ping and min ping aswell
    //used for the aimbot setting that accounts for server latency
    RF.prototype.a74 = function () {
        this.pingReceivedTime = Date.now();
        this.currentPing = (this.pingReceivedTime - this.pingSentTime) >> 1; //divides by 2 and also rounds in the same operation!
        ++this.numSuccessfulPings;
        if (!this[ATTRIBUTE_PINGS]) this[ATTRIBUTE_PINGS] = [];
        this[ATTRIBUTE_PINGS].push(this.currentPing);
        if (this[ATTRIBUTE_PINGS].length > advanced[ADVANCED_PINGCOUNT]) this[ATTRIBUTE_PINGS].shift();
        this[ATTRIBUTE_AVERAGEPING] = 0;
        for (let ping of this[ATTRIBUTE_PINGS]) this[ATTRIBUTE_AVERAGEPING] += ping;
        this[ATTRIBUTE_AVERAGEPING] /= this[ATTRIBUTE_PINGS].length;
        this[ATTRIBUTE_MINPING] = Math.min(...this[ATTRIBUTE_PINGS]);
        this[ATTRIBUTE_MAXPING] = Math.max(...this[ATTRIBUTE_PINGS]); //lag spikes? L
    };

    //make sure that when the socket gets created that it is already hooked
    RF.prototype.createGameSocket = function () {
        this.socket = new WebSocket(this.connectHostname);
        this.socket.binaryType = "arraybuffer";
        this.pingSentTime = (new Date).getTime();
        this.socket.onopen = function () {
            console.log("Created game connection to: " + this.displayHostname);
            if (this.socket == null) return;
            this.socket.onmessage = function (wsMsgEvent) {
                if (recorder[RECORDER_ISRECORDING]) recorder[RECORDER_CURRENT].push([Date.now(), wsMsgEvent.data]);
                b18(wsMsgEvent);
            };
        }.bind(this);
        this.socket.onclose = function () {
            if (THNet[THNET_SOCKET]) THNet[THNET_SOCKET].close();
            console.log("Game connection closed");
            this.close();
            a45();
        }.bind(this);
    };

    //better display for crate healths
    RB.prototype.draw = function(ctx, camera) {
        if (!this.model) return;
        if (this.model.length > 1) {
            this.animationFrame < this.model.length - 1 ? this.animationFrame++ : this.animationFrame = 0;
            a38(ctx, camera, this.getAttr(), this.angle, this.model[this.animationFrame]);
        } else if (this.type == "userCrate") {
            let hpPercent = this.hp / this.maxHp,
                model = this.model;

            //to be honiest this just looks way nicer.
            if (misc[MISC_BETTERCRATEHP]) {
                let color = this.isPremium ? [ 240, 186, 55 ] : [ 83, 198, 140 ];
                model[0][1][1][3] = '#';
                for (let value of color) model[0][1][1][3] += lerpR(255, value, hpPercent).toString(16);
            } else {
                if (this.isPremium) {
                    model[0][1][1][3] = hpPercent < 0.8 ? hpPercent < 0.6 ? hpPercent < 0.4 ? hpPercent < 0.2 ? "#faf2de" : "#f5e1b3" :  "#f0d492" : "#f5cd6e" : "#f0ba37";
                } else {
                    model[0][1][1][3] = hpPercent < 0.8 ? hpPercent < 0.6 ? hpPercent < 0.4 ? hpPercent < 0.2 ? "#ecf9f2" : "#c6ecd9" :  "#9fdfbf" : "#79d2a6" : "#53c68c";
                }
            }
            a38(ctx, camera, this.getAttr(), this.angle, model[0]);

        } else {
            a38(ctx, camera, this.getAttr(), this.angle, this.model[0]);
        }
    };

    //bullets
    RC.prototype.draw = function(ctx, camera) {
        if (!this.activated) return;
        if (this.isKnife) {
            this.animationFrame < this.model.length - 1 ? this.animationFrame++ : this.animationFrame = 0;
            a38(ctx, camera, this.getAttr(), this.angle, this.model[this.animationFrame]);
        } else {
            ctx.strokeStyle = "#000000";
            if (this.silenced && !esp[ESP_SHOWINVIS]) {
                ctx.strokeStyle = "#D3D3DA"
            } else if (this.ownerId == c3 || this.teamCode > 0 && this.teamCode == RD.pool[c3].teamCode) {
                ctx.strokeStyle = "#107a24"
            } else if (RD.pool[c3].thermal) {
                ctx.strokeStyle = "#ff0000"
            }
            var relPos = camera.getRelPos(this.getAttr()),
                endX = relPos.x + this.length * Math.cos(this.angle * Math.PI / 180),
                endY = relPos.y + this.length * Math.sin(this.angle * Math.PI / 180);
            j21(ctx, relPos.x, relPos.y, endX, endY, this.width);
        }
    };

    //players
    RD.prototype.drawBody = function (j58, camera) {
        var relPos = camera.getRelPos(this.getAttr());
        if (!(this.ghillie && !esp[ESP_SHOWINVIS]) || this.spdX != 0 || this.spdY != 0 || this.beingHit || this.shooting) {
            if (this.isLeader) {
                ctx.globalAlpha = 0.3;
                ctx.strokeStyle = this.color.a;
                ctx.lineWidth = 10;
                j22(ctx, relPos.x, relPos.y, this.radius * 1.65)
            }
            ctx.globalAlpha = this.invincible ? 0.3 : 1;
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.isPremiumMember ? "#000" : "#666";
            ctx.fillStyle = this.isPremiumMember ? "#000" : "#666";
            j22(ctx, relPos.x, relPos.y, this.radius + 1);
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.color.b;
            ctx.fillStyle = this.color.b;
            j22(ctx, relPos.x, relPos.y, this.radius - this.armorAmount / 10);
            ctx.fill();
            if (this.dashing) {
                ctx.strokeStyle = "#bababa";
                j21(ctx, relPos.x     , relPos.y     , relPos.x      - this.spdX * 5, relPos.y      - this.spdY * 5, 1);
                j21(ctx, relPos.x     , relPos.y + 20, relPos.x      - this.spdX * 5, relPos.y + 20 - this.spdY * 5, 1);
                j21(ctx, relPos.x     , relPos.y - 20, relPos.x      - this.spdX * 5, relPos.y - 20 - this.spdY * 5, 1);
                j21(ctx, relPos.x + 20, relPos.y     , relPos.x + 20 - this.spdX * 5, relPos.y      - this.spdY * 5, 1);
                j21(ctx, relPos.x - 20, relPos.y     , relPos.x - 20 - this.spdX * 5, relPos.y      - this.spdY * 5, 1);
            }
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.color.a;
            ctx.fillStyle = this.color.a;
            j22(ctx, relPos.x, relPos.y, this.hpRadius + 1);
            ctx.fill();
            if (c37 && this.id != c3) {
                ctx.fillStyle = this.isPremiumMember ? "#000" : "#666";
                ctx.font = "bold 12px Arial";
                ctx.textAlign = "center";
                let usedName = misc[MISC_FFACLANDISPLAY] ? this[ATTRIBUTE_TAGGEDNAME] : this.username,
                    textWidth = ctx.measureText(usedName).width;
                if (this.isPremiumMember) {
                    ctx.globalAlpha = 0.75;
                    ctx.fillText(usedName, relPos.x - 9, relPos.y + this.radius * 1.75);
                    drawImage(j30.vip, relPos.x + textWidth / 2 - 6, relPos.y + this.radius * 1.75 - 9, 18, 10);
                    ctx.globalAlpha = 1;
                } else {
                    ctx.fillText(usedName, relPos.x, relPos.y + this.radius * 1.75);
                }
                ctx.textAlign = "start";
            }
            ctx.globalAlpha = 1;
        } else if (this.id != c3 && RD.pool[c3].thermal == 1) {
            if (this.teamCode > 0 && this.teamCode == RD.pool[c3].teamCode) {
                ctx.strokeStyle = "#107a24";
                ctx.font = "bold 12px Arial";
                ctx.textAlign = "center";
                ctx.fillStyle = "#107a24";
                ctx.fillText(this.username, relPos.x, relPos.y + this.radius * 1.75);
                ctx.textAlign = "start";
            } else {
                ctx.strokeStyle = "#ff0000";
            }
        } else {
            ctx.strokeStyle = "#efeff5";
            ctx.lineWidth = 2;
            j22(ctx, relPos.x, relPos.y, this.radius);
            ctx.fillStyle = "#efeff5";
            ctx.fill();
        }
        if (c37) {
            var chatMessage = this.j47;
            //TODO: custom chatting message indicator
            if (chatMessage == "" && this.chatBoxOpen) chatMessage = "...";
            //TODO: setting that turns this off
            if (chatMessage[chatMessage.length - 1] == " ") chatMessage = chatMessage.substring(0, chatMessage.length - 1);
            //TODO: add muting system
            if (!chatMessage.length) return;
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            var textWidth = ctx.measureText(chatMessage).width;
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = this.isPremiumMember ? "#000" : "#7a7a7a";
            ctx.fillRect(relPos.x - textWidth / 2 - 3, relPos.y + this.radius * 2.7 - 13, textWidth + 6, 18);
            ctx.globalAlpha = 1;
            ctx.fillStyle = this.isPremiumMember ? "#deb34c" : "#FFF";
            ctx.fillText(chatMessage, relPos.x, relPos.y + this.radius * 2.7);
            ctx.textAlign = "start";
        }
    };

    //option to disable health radius change animations
    RD.prototype.updateHpRadius = function() {
        var hpRadius = Math.round(this.hp * (this.radius - this.armorAmount / 10 - 1) / 100);
        if (misc[MISC_STATICHEALTH]) {
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
        this[ATTRIBUTE_TIMEALIVEEXTRA] = 0;
        this.timeAlive++;
    };

    //keeping track of the mouse's actual position
    document.onmousemove = mouseEvent => {
        cursor.x = mouseEvent.clientX;
        cursor.y = mouseEvent.clientY;
        if (moveMenu.enable) applyStyle(divs.menu, {
            left: (mouseEvent.clientX - moveMenu.offsetX) + 'px',
            top: (mouseEvent.clientY - moveMenu.offsetY) + 'px'
        });
    };

    //fix a bug related to aiming
    a37 = ()=>{
        //thank you dygn for coding packet sending in such a weird way
        let str = a60("mouse-move", {mouseX: j16[0], mouseY: j16[1], mouseAngle: j16[2]});

        //convert string to bytes then send
        //j15 isnt used anywhere so we can reuse it for whatever purpose
        if (RF.list[0] !== undefined && str !== j15) RF.list[0].send(a66(j15 = str));
    };

    //this disables ad related functions and a few others
    a36=a119=a78=a79=a80=()=>{};

    //this removes ad elements
    for (let ad of j36) {
        //to make it work with Gats.io Adblocker without it crashing
        let element = document.getElementById(ad.pl);
        if (element) element.remove();
    }

    //if the player is loading the cheat while in a game
    if (c2) fixCamera();

    //make the reconnect button... yknow... ACTUALLY RECONNECT INSTEAD OF RELOADING THE WEBSITE LIKE A NORMAL GAME
    reloadGame = () => a120(o4.server, c22);

    a36 = () => {
        c8 = {1: 0, 2: 0, 3: 0};
        o3 = {1: "", 2: "", 3: ""};
        a2("c1", c1.weapon + "," + c1.armor + "," + c1.armorBtn + "," + c1.color, 365);
    };

    //removes adblock check and also fixes stupidness about the auto upgrader
    play = () => {
        if (RF.list[0] === undefined) return;
        if (!c4) {
            var selection = {class: c1.weapon, armor: c1.armor, color: c1.color};
            RF.list[0].send(a59("c1", selection));
        }
        b21 = true;
        a36();
    };

    //adds hooks for mouse presses
    canvas.onmouseup = gameMouseUp;
    canvas.onmousedown = gameMouseDown;
    document.onmouseup=()=>{};
    document.onmousedown=()=>{};

    //this popup is FUCKING ANNOYING I SWEAR TO GOD
    window.onbeforeunload = event => {
        if (!misc[MISC_DISABLECLOSEPOPUP] && b3) {
            event.preventDefault();
            return event.returnValue = "You're still logged in. Are you sure you want to leave?";
        }
    };

    //no idea why the reconnect screen doesnt have server select but this function mod adds that now
    //it also stops the game from killing several modals if the user is interacting with them
    a45 = () => {
        !b15 && a93();
        a4();
        a75();
        b4 = null;
        b38 = null;
        selfPremiumMember = 0;
        b3 = 0;
        b2 = 0;
        b1 = 0;
        $("#hostServerTabLi").hide();
        $("#playButton").hide();
        document.getElementById("gametypeDropdown").style.display = "block";
        document.getElementById("serversBtn").style.display = "flex";
        a99();
    }

    //if loading during a game, hook the game socket
    if (RF.list && RF.list[0] && RF.list[0].socket && RF.list[0].socket.url == RF.list[0].connectHostname) RF.list[0].socket.onmessage = function (wsMsgEvent) {
        if (recorder[RECORDER_ISRECORDING]) recorder[RECORDER_CURRENT].push([Date.now(), wsMsgEvent.data]);
        b18(wsMsgEvent);
    };

    //instant reconnect attempt on load
    if (document.getElementById('reconnectButton').style.display == 'block') reloadGame();

    //just making some stuff look better
    applyStyle(document.getElementById("playButton"), {
        'height': '55px',
        'margin-top': '0px',
        'border-width': '4px'
    });
    applyStyle(document.getElementById("reconnectButton"), {
        'height': '55px',
        'margin-top': '0px',
        'border-width': '4px',
        'border-color': '#767676'
    });
})();
