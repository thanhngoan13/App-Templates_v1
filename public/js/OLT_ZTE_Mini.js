  
function XoaONU_OLT_ZTEMini (card, pon,id) {
      s= "conf terminal\r\n"
           + "interface gpon_olt-1/3/"+ card + "/" + pon + "\r\n"
           + "no onu " + id + "\r\n"
           + "exit\r\n";
      return s;
}
    
function khaiONU_OLT_ZTEMini( card,  pon,  id,  pw, typeModem){
      s =  "interface gpon_olt-1/3/" + pon + "\r\n"
          + "no shutdown\r\n" 
          + "onu " + id + " type " + typeModem +" pw " + pw + "\r\n"
          + "exit\r\n";
        return s;
}
    
function khaiNet_OLT_ZTEMini( card,  pon,  id,  vlanNet,  vlanql){
      s =  "interface gpon_onu-1/3/" + pon + ":" + id + "\r\n"
         + "vport-mode manual\r\n"
         + "tcont 1 name HSI profile T4_300M\r\n"
         + "sn-bind enable both\r\n"
         + "gemport 1 name HSI tcont 1\r\n"
         + "vport 1 map-type vlan\r\n"
         + "vport-map 1 1 vlan 11\r\n"
         + "exit\r\n"
         + "pon-onu-mng gpon_onu-1/3/" + pon + ":" + id + "\r\n"
         + "service 1 gemport 1 vlan 11\r\n"
         + "wan-ip ipv4 mode pppoe vlan-profile HSI host 1\r\n"
         + "wan 1 service internet host 1\r\n"
         + "exit\r\n"
         + "interface vport-1/3/" + pon + "." + id +":1\r\n"
         + "service-port 1 user-vlan 11 vlan " + vlanNet + " ingress G_300M egress G_300M\r\n"
         + "exit\r\n"
         + "interface gpon_onu-1/3/" + pon + ":" + id + "\r\n"
         + "gemport 7 name TR069 tcont 1\r\n"
         + "sn-bind enable both\r\n"
         + "gemport 7 name TR069 tcont 1\r\n"
         + "vport-map 1 7 vlan 4000\r\n"
         + "exit\r\n"
         + "pon-onu-mng gpon_onu-1/3/" + pon + ":" + id + "\r\n"
         + "service 7 gemport 7 vlan 4000\r\n"
         + "exit\r\n"
         + "interface vport-1/3/" + pon + "." + id +":1\r\n"
         + "service-port 7 user-vlan 4000 vlan " + vlanql + "\r\n"
         + "exit\r\n";
        return s;
}
function khaiMyTV_OLT_ZTEMini( card,  pon,  id,  vlanVod){
      s = "interface gpon_onu-1/3/" + pon + ":" + id + "\r\n"
         + "vport-mode manual\r\n"
         + "tcont 2 name IPTV profile T2_512K\r\n"
         + "sn-bind enable both\r\n"
         + "gemport 2 name IPTV tcont 2\r\n"
         + "vport 1 map-type vlan\r\n"
         + "vport-map 1 2 vlan 12\r\n"
         + "exit\r\n"
         + "pon-onu-mng gpon_onu-1/3/" + pon + ":" + id + "\r\n"
         + "mvlan 12\r\n"
         + "service 2 gemport 2 vlan 12\r\n"
         + "wan 2 ethuni 4 ssid 4 service other mvlan 12\r\n"
         + "exit\r\n"
         + "interface vport-1/3/" + pon + "." + id +":1\r\n"
         + "service-port 2 user-vlan 12 vlan " + vlanVod + "\r\n"
         + "exit\r\n" 
         + "igmp mvlan 99\r\n"
         + "receive-port vport-1/3/" + pon + "." + id +":1\r\n"
         + "exit\r\n";
        return s;
}    

function khaiIMS_ZTE_IgateO40( card,  pon,  id){
      s = "interface gpon_onu-1/3/" + pon + ":" + id + "\r\n"
         + "vport-mode manual\r\n"
         + "tcont 3 name VOIP profile T1_80K\r\n"
         + "sn-bind enable both\r\n"
         + "gemport 3 name VOIP tcont 3\r\n"
         + "vport 1 map-type vlan\r\n"
         + "vport-map 1 3 vlan 13\r\n"
         + "exit\r\n"
         + "pon-onu-mng gpon_onu-1/3/" + pon + ":" + id + "\r\n"
         + "service 3 gemport 3 vlan 13\r\n"
         + "exit\r\n"
         + "interface vport-1/3/" + pon + "." + id +":1\r\n"
         + "service-port 3 user-vlan 13 vlan 1401\r\n"
         + "exit\r\n";      
        return s;
}

    

