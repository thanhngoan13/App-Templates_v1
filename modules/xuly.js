class xuly {
    getCard(pw1) {
        var s = "";
        var pw = pw1.trim();
        if (pw.length == 9) {
            var s1 = pw.substr(2, 2);
            if (s1.substr(0, 1) == "0") {
                s = s1.substr(1, 1);
            }
            else {
                s = s1;
            }
        }

        return s;
    }


    getPon(pw1) {
        var s = "";
        var pw = pw1.trim();
        if (pw.length == 9) {
            var s1 = pw.substr(4, 2);
            if (s1.substr(0, 1) == "0") {
                s = s1.substr(1, 1);
            }
            else {
                s = s1;
            }
        }

        return s;
    }

    getID(pw1) {
        var s = "";
        var pw = pw1.trim();
        if (pw.length == 9) {
            var s1 = pw.substr(6, 3);
            if (s1.substr(0, 2) == "00") {
                s = s1.substr(2, 1);
            }
            else {
                if (s1.substr(0, 1) == "0") {
                    s = s1.substr(1, 2);
                }
                else {
                    s = s1;
                }
            }
        }

        return s;
    }
}

module.exports = new xuly;