function getCard(pw1) {
    var s = '';
    var pw = pw1.trim();
    if (pw.length == 9) {
        var s1 = pw.substr(2, 2);
        if (s1.substr(0, 1) == '0') {
            s = s1.substr(1, 1);
        } else {
            s = s1;
        }
    }

    return s;
}

function getPon(pw1) {
    var s = '';
    var pw = pw1.trim();
    if (pw.length == 9) {
        var s1 = pw.substr(4, 2);
        if (s1.substr(0, 1) == '0') {
            s = s1.substr(1, 1);
        } else {
            s = s1;
        }
    }

    return s;
}

function getID(pw1) {
    var s = '';
    var pw = pw1.trim();
    if (pw.length == 9) {
        var s1 = pw.substr(6, 3);
        if (s1.substr(0, 2) == '00') {
            s = s1.substr(2, 1);
        } else {
            if (s1.substr(0, 1) == '0') {
                s = s1.substr(1, 2);
            } else {
                s = s1;
            }
        }
    }

    return s;
}
function getInfoOLT(ip) {
    //   document.getElementById('txtvlan').value = ip;
    //  alert(ip.length)
    var chuoiid = document.getElementById('idPassword').value;
    //  alert(ip);
    var slid_ip = chuoiid + '_' + ip;
    if (chuoiid.length == 9 && ip.length == 11) {
        $.ajax({
            url: '/getVlanNet/' + slid_ip,
            type: 'GET',
            success: function (res) {
                $('#idvlanmytv').val(res.VlanVod);
                $('#idvlanGNMS').val(res.VlanGNMS);
                $('#idvlanNet').val(res.VlanNet);
            },
            error: function (err) {},
        });
    } else if (ip.length == 11) {
        $.ajax({
            url: '/getInfoOLT/' + ip,
            type: 'GET',
            success: function (res) {
                $('#idvlanmytv').val(res.VlanVod);
                $('#idvlanGNMS').val(res.VlanGNMS);
            },
            error: function (err) {
                $('#idvlanmytv').val('loi');
            },
        });
    }
}
function getVlanNet(chuoiid) {
    var ip = document.getElementById('idIPOLT').value;
    //  alert(ip);
    var slid_ip = chuoiid + '_' + ip;
    if (chuoiid.length == 9 && ip.length == 11) {
        $.ajax({
            url: '/getVlanNet/' + slid_ip,
            type: 'GET',
            success: function (res) {
                $('#idvlanmytv').val(res.VlanVod);
                $('#idvlanGNMS').val(res.VlanGNMS);
                $('#idvlanNet').val(res.VlanNet);
                //alert(res.VlanNet);
            },
            error: function (err) {},
        });
    }
}

$(document).ready(function () {
    $('.selectOLT').hide();
    //Validate
    $('#khaibaothuebao').validate({
        rules:{
            name: "required",
            SLID:{
                required: true,
                minlength: 9,
                maxlength: 9
            },
            VlanNet: "required",
            ipOlt: "required"
        },
        messages: {
            name: "Vui lòng nhập tên!",
            SLID: {
              required: "Vui lòng nhập SLID",
              minlength: "Độ dài tối thiểu 9 kí tự",
              maxlength: "Độ tài tối đa 9 kí tự"
            },
            VlanNet: "Vui lòng nhập VLAN NET",
            ipOlt: "Vui lòng nhập IP OLT"
          }
    });
    
    $('#typeOLT').change(function () {
        var typeOLT = $('#typeOLT option:selected');
         switch (typeOLT.text()) {
            case 'Alcatel':
                // console.log(typeOLT.text());
                $('.selectOLT').hide();
                break;
            case 'ZTE':
                // console.log(typeOLT.text());
                $('.selectOLT').show();
                break;
            case 'ZTE-Mini':
                // console.log(typeOLT.text());
                $('.selectOLT').show();
                break;
            case 'HUAWEI':
                // console.log(typeOLT.text());
                $('.selectOLT').hide();
                break;
            case 'DASAN':
                 console.log(typeOLT.text());
                $('.selectOLT').hide();
                break;         
        } 
    });
    //
    //Khai tất cả net, mytv
    $('#btn-createAll').click(function () {
        var typeOLT = $('#typeOLT option:selected');
        var typeModem = $('#typeModem option:selected');
        var vlanNet = $('#idvlanNet').val();
        var vlanMytv = $('#idvlanmytv').val();
        var vlanGNMS = $('#idvlanGNMS').val();
        var SLID = $('#idPassword').val();
        var card = getCard(SLID);
        var pon = getPon(SLID);
        var id = getID(SLID);
        var usernet = $('#idUser').val();
        var passnet = 'kgg123';
        var srvPortID_MYTV = ((parseInt(card) - 1)*1024) + (parseInt(pon)*64) + parseInt(id) + 30000;
        var srvPortID_IMS = ((parseInt(card) - 1)*1024) + (parseInt(pon)*64) + parseInt(id) + 10000;
        var srvPortID_GNMS = ((parseInt(card) - 1)*1024) + (parseInt(pon)*64) + parseInt(id) + 20000;
        var srvPortID_NET = ((parseInt(card) - 1)*1024) + (parseInt(pon)*64) + parseInt(id);  
        var idPassword = $('#idPassword')
            .val()
            .replace(/00/, '/')
            .replace(/0/g, '/');
        if (typeOLT.length > 0 || typeModem.length > 0) {
            if (typeOLT.text() == 'HUAWEI') {
                switch (typeModem.text()) {
                    case 'ALU-240':
                        $('#outputCLI').html(
  
                        );
                        break;
                    case 'Vlink1000':
                        $('#outputCLI').html(
 
                        );
                        break;
                    default:
                        $('#outputCLI').html(
                            XoaONU_OLT_HW(card, pon,id, srvPortID_MYTV)
                            + "\r\n"
                            + khaiONU_OLT_HW( card,  pon,  id,  SLID) 
                            + "\r\n" 
                            + khaiNet_OLT_HW( card,  pon,  id,  vlanNet,  vlanGNMS, srvPortID_NET, srvPortID_GNMS) 
                            + "\r\n"
                            + khaiMyTV_OLT_HW( card,  pon,  id,  vlanMytv, srvPortID_MYTV)
                        );
                        break;
                }  
            }
            if (typeOLT.text() == 'ZTE') {
                switch (typeModem.text()) {
                    case 'ALU-240':
                        $('#outputCLI').html(
  
                        );
                        break;
                    case 'Vlink1000':
                        $('#outputCLI').html(
 
                        );
                        break;
                    case 'F600':
                        $('#outputCLI').html(
                            khaiNet_OLT_ZTE_F600( card,  pon,  id,  vlanNet,  vlanql, usernet, passnet)
                        );
                        break;
                    default:
                        $('#outputCLI').html(
                            XoaONU_OLT_ZTE(card, pon, id)
                            + "\r\n"
                            + khaiONU_OLT_ZTE(card, pon, id) 
                            + "\r\n" 
                            + khaiNet_OLT_ZTE(card, pon, id, vlanNet, vlanGNMS) 
                            + "\r\n"
                            + khaiMyTV_OLT_ZTE(card, pon, id, vlanMytv)
                        );
                        break;
                }
            }
            if(typeOLT.text() == 'Alcatel') {
                switch (typeModem.text()) {
                    case 'ALU-240':
                        $('#outputCLI').html(
                            XoaONU_OLT_ALU(card, pon, id) 
                            + "\r\n"
                            + khaiONU_240_OLT_ALU(card, pon, id) 
                            + "\r\n"
                            + khaiNet_240_OLT_ALU(card, pon, id, vlanNet, vlanGNMS)
                            + "\r\n"
                            + khaiMyTV_240(card, pon, id, vlanMytv)
                        );
                        break;
                    case 'Vlink1000':
                        $('#outputCLI').html(
                            XoaONU_OLT_ALU(card, pon, id) 
                            + "\r\n"
                            + khaiONU_OLT_ALU(card, pon, id) 
                            + "\r\n" 
                            + khaiNetVlan1000_OLT_ALU(card, pon, id, vlanNet, vlanGNMS)
                        );
                        break;
                    default:
                        $('#outputCLI').html(
                            XoaONU_OLT_ALU(card, pon, id)
                            + "\r\n"
                            + khaiONU_OLT_ALU(card, pon, id) 
                            + "\r\n" 
                            + khaiNet_OLT_ALU(card, pon, id, vlanNet, vlanGNMS) 
                            + "\r\n"
                            + khaiMyTV_OLT_ALU(card, pon, id, vlanMytv)
                        );
                        break;
                }
            }
            if(typeOLT.text() == 'DASAN') {
                switch (typeModem.text()) {
                    case 'ALU-240':
                        $('#outputCLI').htm("");
                        break;
                    case 'Vlink1000':
                        $('#outputCLI').html("");
                        break;
                    default:
                        $('#outputCLI').html(
                            XoaONU_OLT_DSA(card, pon, id)
                            + "\r\n"
                            + khaiONU_OLT_DSA(card, pon, id, SLID) 
                            + "\r\n" 
                            + khaiNet_OLT_DSA(card, pon, id, vlanNet, vlanGNMS) 
                        );
                        break;
                }
            }
            if(typeOLT.text() == 'ZTE-Mini') {
                switch (typeModem.text()) {
                    case 'ALU-240':
                        $('#outputCLI').htm("");
                        break;
                    case 'Vlink1000':
                        $('#outputCLI').html("");
                        break;
                    default:
                        $('#outputCLI').html(
                            XoaONU_OLT_ZTEMini(card, pon, id)
                            + "\r\n"
                            + khaiONU_OLT_ZTEMini(card, pon, id, SLID,typeModem.text()) 
                            + "\r\n" 
                            + khaiNet_OLT_ZTEMini(card, pon, id, vlanNet, vlanGNMS) 
                        );
                        break;
                }
            }
        }
    });
    //Xóa ONT
    $('#btn-del').click(function () {
        var typeOLT = $('#typeOLT option:selected');
        var typeModem = $('#typeModem option:selected');
        var vlanNet = $('#idvlan').val();
        var vlanMytv = $('#idvlanmytv').val();
        var SLID = $('#idPassword').val();
        var idPassword = $('#idPassword')
            .val()
            .replace(/00/, '/')
            .replace(/0/g, '/');

        var card = getCard(SLID);
        var pon = getPon(SLID);
        var id = getID(SLID);
        var srvPortID_MYTV = ((parseInt(card) - 1)*1024) + (parseInt(pon)*64) + parseInt(id) + 30000;       
            switch (typeOLT.text()) {
                case 'ZTE':
                    $('#outputCLI').html(XoaONU_OLT_ZTE(card, pon, id));
                    break;
                case 'ZTE-Mini':
                    $('#outputCLI').html(XoaONU_OLT_ZTEMini(card, pon, id));
                    break;
                case 'HUAWEI':                    
                    $('#outputCLI').html(XoaONU_OLT_HW(card, pon, id, srvPortID_MYTV));
                    break;                   
                case 'DASAN':
                    $('#outputCLI').html(XoaONU_OLT_DSA(card, pon, id));
                    break;              
                default:
                    $('#outputCLI').html(XoaONU_OLT_ALU(card, pon, id));
                    break;
            }
    });
    //Khai ONT
    $('#btn-create-onu').click(function () {
        var typeOLT = $('#typeOLT option:selected');
        var typeModem = $('#typeModem option:selected');
        var vlanNet = $('#idvlan').val();
        var vlanMytv = $('#idvlanmytv').val();
        var SLID = $('#idPassword').val();

        var card = getCard(SLID);
        var pon = getPon(SLID);
        var id = getID(SLID);
        var srvPortID_MYTV = ((parseInt(card) - 1)*1024) + (parseInt(pon)*64) + parseInt(id) + 30000;  
        var idPassword = $('#idPassword')
            .val()
            .replace(/00/, '/')
            .replace(/0/g, '/');
        if (typeOLT.length > 0 && typeModem.length > 0) {
            if(typeOLT.text() == 'ZTE'){
                console.log(typeOLT.text());
                switch (typeModem.text()) {
                    
                    case 'ALU-240':
                        $('#outputCLI').html(khaiONU_240_OLT_ZTE(card, pon, id));
                        break;
                
                    default:
                        console.log(typeModem.text());
                        $('#outputCLI').html(khaiONU_OLT_ZTE(card, pon, id, SLID, typeModem.text()));
                        break;
                        
                }
            } 
            if(typeOLT.text()=='HUAWEI'){
                switch (typeModem.text()) {
                    case 'ALU-240':
                         $('#outputCLI').html(""); 
                        break;
                
                    default:
                        $('#outputCLI').html(khaiONU_OLT_HW(card, pon, id, SLID));
                        break;
                }               

            }
            if (typeOLT.text() == 'Alcatel') {
                switch (typeModem.text()) {
                    case 'ALU-240':
                        $('#outputCLI').html(khaiONU_240_OLT_ALU(card, pon, id));
                        break;                
                    default:
                        $('#outputCLI').html(khaiONU_OLT_ALU(card, pon, id));
                        break;
                }
            }
            if(typeOLT.text() == 'DASAN'){

                switch (typeModem.text()) {
                    case "":
                        
                        break;
                
                    default:
                        $('#outputCLI').html(
                            khaiONU_OLT_DSA(card, pon, id, SLID)
                        );                        
                        break;
                }
            } 
            if(typeOLT.text() == 'ZTE-Mini'){

                switch (typeModem.text()) {
                    case "":
                        
                        break;
                
                    default:
                        $('#outputCLI').html(
                            khaiONU_OLT_ZTEMini(card, pon, id, SLID, typeModem.text())
                        );                        
                        break;
                }
            } 
        }
    });
    //Khai NET
    $('#btn-net').click(function () {
        var typeOLT = $('#typeOLT option:selected');
        var typeModem = $('#typeModem option:selected');
        var usernet = $('#idUser').val();
        var passnet = 'kgg123';
        var vlanNet = $('#idvlanNet').val();
        var vlanGNMS = $('#idvlanGNMS').val();
        var vlanMytv = $('#idvlanmytv').val();
        var SLID = $('#idPassword').val();
        var card = getCard(SLID);
        var pon = getPon(SLID);
        var id = getID(SLID);
        var srvPortID_NET = ((parseInt(card) - 1)*1024) + (parseInt(pon)*64) + parseInt(id);  
        var srvPortID_GNMS = ((parseInt(card) - 1)*1024) + (parseInt(pon)*64) + parseInt(id) + 20000;
        var idPassword = $('#idPassword')
            .val()
            .replace(/00/, '/')
            .replace(/0/g, '/');
        if (typeOLT.length > 0 || typeModem.length > 0) {
            if(typeOLT.text() == 'ZTE'){
            switch (typeModem.text()) {
                case 'ALU-240':
                    $('#outputCLI').html(
                        khaiNet_240_OLT_ZTE(card, pon, id, vlanNet, vlanGNMS)
                    );
                    break;
                case 'Vlink1000':
                    $('#outputCLI').html(
                        
                    ); 
                    break;
                case 'F600':
                    $('#outputCLI').html(
                        khaiNet_OLT_ZTE_F600(card, pon, id, vlanNet, vlanGNMS, usernet, passnet)
                    );
                    break;    

                default:
                    $('#outputCLI').html(
                        khaiNet_OLT_ZTE(card, pon, id, vlanNet, vlanGNMS)
                    );
                    break;
            }
            }
            if(typeOLT.text() == 'HUAWEI'){

                switch (typeModem.text()) {
                    case "":
                        
                        break;
                
                    default:
                        $('#outputCLI').html(
                            khaiNet_OLT_HW(card, pon, id, vlanNet, vlanGNMS, srvPortID_NET, srvPortID_NET, srvPortID_GNMS)
                        );                        
                        break;
                }
            }
            if(typeOLT.text() == 'DASAN'){

                switch (typeModem.text()) {
                    case "":
                        
                        break;
                
                    default:
                        $('#outputCLI').html(
                            khaiNet_OLT_DSA(card, pon, id, vlanNet, vlanGNMS)
                        );                        
                        break;
                }
            }
            if(typeOLT.text() == 'ZTE-Mini'){

                switch (typeModem.text()) {
                    case "":
                        
                        break;
                
                    default:
                        $('#outputCLI').html(
                            khaiNet_OLT_ZTEMini(card, pon, id, vlanNet, vlanGNMS)
                        );                        
                        break;
                }
            }
            if(typeOLT.text() == 'Alcatel') {
                switch (typeModem.text()) {
                    case 'ALU-240':
                        $('#outputCLI').html(
                            khaiNet_240_OLT_ALU(card, pon, id, vlanNet, vlanGNMS)
                        );                       
                        break;
                    case 'Vlink1000':
                        $('#outputCLI').html(
                            khaiNetVlan1000_OLT_ALU(card, pon, id, vlanNet, vlanGNMS)
                        );
                        break;
                
                    default:
                        $('#outputCLI').html(
                            khaiNet_OLT_ALU(card, pon, id, vlanNet, vlanGNMS)
                        );
                        break;
                }
            }
        }
    });
    //Khai MyTV
    $('#btn-mytv').click(function () {
        var typeOLT = $('#typeOLT option:selected');
        var typeModem = $('#typeModem option:selected');
        var vlanNet = $('#idvlan').val();
        var vlanMytv = $('#idvlanmytv').val();
        var SLID = $('#idPassword').val();

        var vlanNet = $('#idvlanNet').val();
        var vlanGNMS = $('#idvlanGNMS').val();
        var vlanMytv = $('#idvlanmytv').val();
        var SLID = $('#idPassword').val();

        var card = getCard(SLID);
        var pon = getPon(SLID);
        var id = getID(SLID);
        var srvPortID_MYTV = ((parseInt(card) - 1)*1024) + (parseInt(pon)*64) + parseInt(id) + 30000;  
        var idPassword = $('#idPassword')
            .val()
            .replace(/00/, '/')
            .replace(/0/g, '/');
        if (typeOLT.length > 0 || typeModem.length > 0) {
            if(typeOLT.text() == 'ZTE'){
                switch (typeModem.text()) {
                    case 'Vlink1000':
                        $('#outputCLI').html("");
                        break;
                    case 'ALU-240':
                        $('#outputCLI').html(khaiMyTV_240(card, pon, id, vlanMytv));
                        break;
                    default:
                        $('#outputCLI').html(khaiMyTV_OLT_ZTE(card, pon, id, vlanMytv));
                        break;
                }
            }
            if(typeOLT.text() == 'HUAWEI'){
                switch (typeModem.text()) {
                    case 'Vlink1000':
                        $('#outputCLI').html("");
                        break;
                
                    default:
                        $('#outputCLI').html(                            
                            khaiMyTV_OLT_HW(card, pon, id, vlanMytv, srvPortID_MYTV)
                        );
                        break;
                }

            }
            if(typeOLT.text() == 'Alcatel'){

                $('#outputCLI').html(khaiMyTV_OLT_ALU(card, pon, id, vlanMytv));
            }
            if(typeOLT.text() == 'DASAN'){

                switch (typeModem.text()) {
                    case "":
                        
                        break;
                
                    default:
                        $('#outputCLI').html(
                            khaiMyTV_OLT_DSA(card, pon, id, vlanNet)
                        );                        
                        break;
                }
            }
            if(typeOLT.text() == 'ZTE-Mini'){

                switch (typeModem.text()) {
                    case "":
                        
                        break;
                
                    default:
                        $('#outputCLI').html(
                            khaiMyTV_OLT_ZTEMini(card, pon, id, vlanMytv)
                        );                        
                        break;
                }
            }
        }
    });
    //Khai IMS
    $('#btn-ims').click(function () {
        var typeOLT = $('#typeOLT option:selected');
        var typeModem = $('#typeModem option:selected');
        var vlanNet = $('#idvlan').val();
        var vlanMytv = $('#idvlanmytv').val();
        var SLID = $('#idPassword').val();

        var vlanNet = $('#idvlanNet').val();
        var vlanGNMS = $('#idvlanGNMS').val();
        var vlanMytv = $('#idvlanmytv').val();
        var SLID = $('#idPassword').val();

        var card = getCard(SLID);
        var pon = getPon(SLID);
        var id = getID(SLID);
        var srvPortID_IMS = ((parseInt(card) - 1)*1024) + (parseInt(pon)*64) + parseInt(id) + 10000;  
        var idPassword = $('#idPassword')
            .val()
            .replace(/00/, '/')
            .replace(/0/g, '/');
        if (typeOLT.length > 0 || typeModem.length > 0) {
            if(typeOLT.text() == 'ZTE'){
                switch (typeModem.text()) {
                    case  'Vlink1000':
                        $('#outputCLI').html("");
                        break;
                
                    default:
                        $('#outputCLI').html(khaiIMS_ZTE_IgateO40(card, pon, id));
                        break;
                }
            } 
            if(typeOLT.text() == 'HUAWEI'){
            switch (typeModem.text()) {
                case 'Vlink1000':
                    $('#outputCLI').html("");
                    break;
            
                default:
                    $('#outputCLI').html(khaiIMS_HW_Igate(card, pon, id, srvPortID_IMS));
                    break;
            }
            } 
            if(typeOLT.text() == 'Alcatel'){

                $('#outputCLI').html(khaiIMS_ALU_IgateO40(card, pon, id, vlanMytv));
            }
            if(typeOLT.text() == 'DASAN'){

                switch (typeModem.text()) {
                    case "":
                        
                        break;
                
                    default:
                        $('#outputCLI').html(
                            khaiIMS_DSA_IgateO40(card, pon, id, vlanNet)
                        );                        
                        break;
                }
            }
            if(typeOLT.text() == 'ZTE-Mini'){

                switch (typeModem.text()) {
                    case "":
                        
                        break;
                
                    default:
                        $('#outputCLI').html(
                            khaiIMS_ZTE_IgateO40(card, pon, id)
                        );                        
                        break;
                }
            }
        }
    });
    //Khai Megawan
    $('#btn-megawan').click(function () {
        $('#outputCLI').html('Coming soon');
    });
    //Khai CSDL_DC
    $('#btn-csdl-dc').click(function () {
        $('#outputCLI').html('Coming soon');
    });
});
