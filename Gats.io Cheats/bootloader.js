(async function(){

    //domain check
    if (!location.host == 'gats.io' && !location.host == 'gats2.com') return alert('[TioHax Bootloader] Invalid Domain, please run it at either gats.io or gats2.com');

    try {
        let itemName = 'TioHax_bootloader',
            storedCode = localStorage.getItem(itemName),

        //fetch a string from the server
        _fetch = (path, options) => new Promise((Resolve) => fetch('https://cheats.gatsio.repl.co/' + path, options).then(res => res.text()).then(Resolve)),
        
        version = await _fetch('version'),

        //updates the client
        update = async () => {
            try {
                storedCode[1] = await _fetch('code');
            } catch (err) { /* do fuck */ }
            localStorage.setItem(itemName, JSON.stringify(storedCode));
        };

        //this is not the first time it has been run, but are we still up to date?
        if (storedCode) {
            storedCode = JSON.parse(storedCode);
            
            //we are not up to date, lets update
            if (storedCode[0] !== version) {
                storedCode[0] = version;
                await update();
            }

        //if this is the first time that the bootloader has been run
        } else {
            storedCode = [version];
            await update();
        }

        //we are done, time to run it
        eval(storedCode[1] || 'alert("TioHax could not be loaded. Please contact Taureon to solve this.")');

    //if an error happened, make an alert about it
    } catch (err) {
        alert('[TioHax Bootloader] An error appeared:\n' + err.message);
    }
})();