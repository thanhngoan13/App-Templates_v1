  
function XoaONU_OLT_ZTE (card, pon,id) {
      s= "conf terminal\r\n"
           + "interface gpon-olt_1/"+ card + "/" + pon + "\r\n"
           + "no onu " + id + "\r\n"
           + "exit\r\n";
      return s;
}
    
function khaiONU_OLT_ZTE( card,  pon,  id,  pw, typeModem){
      s =  "interface gpon-olt_1/" + card + "/" + pon + "\r\n"
          + "no shutdown\r\n" 
          + "onu " + id + " type " + typeModem +" pw " + pw + "\r\n"
          + "exit\r\n";
        return s;
}
    
function khaiNet_OLT_ZTE( card,  pon,  id,  vlanNet,  vlanql){
      s =  "interface gpon-onu_1/" + card + "/" + pon + ":" + id +"\r\n"
         + "tcont 1 name HSI profile T4_300M\r\n"
         + "gemport 1 name HSI tcont 1\r\n"
         + "gemport 1 traffic-limit upstream G_300M downstream G_300M\r\n"
         + "service-port 1 vport 1 user-vlan 11 vlan " + vlanNet + "\r\n"
         + "port-identification format VNPT vport 1\r\n"
         + "pppoe-intermediate-agent enable vport 1\r\n"
         + "pppoe-intermediate-agent trust true replace vport 1\r\n"
         + "exit\r\n"
         + "pon-onu-mng gpon-onu_1/" + card + "/" + pon + ":" + id +"\r\n"
         + "service 1 gemport 1 vlan 11\r\n"
         + "wan 1 service internet host 1\r\n"
         + "wan-ip 1 mode pppoe  vlan-profile HSI_PPPOE host 1\r\n"
         + "firewall enable level medium\r\n"
         + "exit\r\n"
         + "interface gpon-onu_1/" + card + "/" + pon + ":" + id + "\r\n"
         + "gemport 7 name TR069 tcont 1\r\n"
         + "switchport mode hybrid vport 7\r\n"
         + "service-port 7 vport 7 user-vlan 4000 vlan " + vlanql + "\r\n"
         + "exit\r\n"
         + "pon-onu-mng gpon-onu_1/" + card + "/" + pon + ":" + id + "\r\n"
         + "service 7 gemport 7 vlan 4000\r\n"
         + "exit\r\n"; 
        return s;
}
function khaiNet_OLT_ZTE_F600( card,  pon,  id,  vlanNet,  vlanql, accnet, passnet){
  s =  "interface gpon-onu_1/" + card + "/" + pon + ":" + id +"\r\n"
     + "tcont 1 name HSI profile T4_300M\r\n"
     + "gemport 1 name HSI tcont 1\r\n"
     + "gemport 1 traffic-limit upstream G_300M downstream G_300M\r\n"
     + "service-port 1 vport 1 user-vlan 11 vlan " + vlanNet + "\r\n"
     + "port-identification format VNPT vport 1\r\n"
     + "pppoe-intermediate-agent enable vport 1\r\n"
     + "pppoe-intermediate-agent trust true replace vport 1\r\n"
     + "exit\r\n"
     + "pon-onu-mng gpon-onu_1/" + card + "/" + pon + ":" + id +"\r\n"
     + "service 1 gemport 1 vlan 11\r\n"
     + "wan 1 service internet host 1\r\n"
     + "wan-ip 1 mode pppoe username "  + accnet + " password " + passnet + " vlan-profile HSI_PPPOE host 1\r\n"
     + "firewall enable level medium\r\n"
     + "exit\r\n"
     + "interface gpon-onu_1/" + card + "/" + pon + ":" + id + "\r\n"
     + "gemport 7 name TR069 tcont 1\r\n"
     + "switchport mode hybrid vport 7\r\n"
     + "service-port 7 vport 7 user-vlan 4000 vlan " + vlanql + "\r\n"
     + "exit\r\n"
     + "pon-onu-mng gpon-onu_1/" + card + "/" + pon + ":" + id + "\r\n"
     + "service 7 gemport 7 vlan 4000\r\n"
     + "exit\r\n"; 
    return s;
}

function KhaiVlanQL_OLT_ZTE( card,  pon,  id,  vlanql){
      s = "interface gpon-onu_1/" + card + "/" + pon + ":" + id +"\r\n"
        + "gemport 7 name TR069 tcont 1\r\n"
        + "switchport mode hybrid vport 7\r\n"
        + "service-port 7 vport 7 user-vlan 4000 vlan " + vlanql +"\r\n"
        + "exit\r\n"
        + "pon-onu-mng gpon-onu_1/" + card + "/" + pon + ":" + id +"\r\n"
        + "service 7 gemport 7 vlan 4000\r\n"
        + "exit\r\n";
        return s;
}
    
    
function khaiMyTV_OLT_ZTE( card,  pon,  id,  vlanVod){
      s = "interface gpon-onu_1/" + card + "/" + pon + ":" + id +"\r\n"
        + "tcont 2 name IPTV profile T2_512K\r\n"
        + "gemport 2 name IPTV tcont 2\r\n"
        + "gemport 2 traffic-limit upstream G_IPTV downstream G_HD\r\n"
        + "service-port 2 vport 2 user-vlan 12 vlan " + vlanVod +"\r\n"
        + "exit\r\n"
        + "igmp mvlan 99 receive-port gpon-onu_1/" + card + "/" + pon + ":" + id + " vport 2\r\n"
        + "pon-onu-mng gpon-onu_1/" + card + "/" + pon + ":" + id +"\r\n"
        + "service 2 gemport 2 vlan 12\r\n"
        + "mvlan 12\r\n"
        + "wan 2 ethuni 4 ssid 4 service other mvlan 12\r\n"
        + "exit\r\n"
        + "exit\r\n";
        return s;
}    

function khaiIMS_ZTE_IgateO40( card,  pon,  id){
      s = "interface gpon-onu_1/" + card + "/" + pon + ":" + id +"\r\n"
        + "sn-bind enable both\r\n"
        + "tcont 3 name VoIP profile T1_80K\r\n"
        + "gemport 3 name VoIP tcont 3\r\n"
        + "gemport 3 traffic-limit upstream VoIP_1M downstream VoIP_1M\r\n"
        + "switchport mode hybrid vport 3\r\n"
        + "service-port 3 vport 3 user-vlan 13 vlan 1401\r\n"
        + "dhcpv4-l2-relay-agent enable vport 3\r\n"
        + "dhcpv4-l2-relay-agent trust true replace vport 3\r\n"
        + "exit\r\n"
        + "pon-onu-mng gpon-onu_1/" + card + "/" + pon + ":" + id +"\r\n"
        + "service 3 gemport 3 vlan 13\r\n"
        + "exit\r\n"
        + "exit\r\n";
        return s;
}

    

