function XoaONU_OLT_HW (card, pon,id, srvPortID_MYTV) {
   
      s= "config\r\n" 
       + "btv\r\n"
       + "multicast-vlan 99\r\n"
       + "undo igmp multicast-vlan member service-port " + srvPortID_MYTV + "\r\n"
       + "quit\r\n"
       + "btv\r\n"
       + "igmp user delete service-port "+ srvPortID_MYTV + "\r\n"
       + "y\r\n"
       + "quit\r\n"
       + "undo service-port " + srvPortID_MYTV + "\r\n"
       + "undo service-port " + srvPortID_MYTV + "\r\n"
       + "undo service-port " + srvPortID_MYTV + "\r\n"
       + "undo service-port " + srvPortID_MYTV + "\r\n"
       + "undo service-port " + srvPortID_MYTV + "\r\n"
       + "interface gpon 0/" + card + "\r\n"
       + "ont delete " + pon + " " + id + "\r\n"
       + "\r\n"
       + "return";
      return s;
}
     
function khaiONU_OLT_HW( card,  pon,  id,  pw){
      s = "config\r\n"
        + "interface gpon 0/" + card + "\r\n"
        + "ont add "+ pon + " " + id +"  password-auth " + pw + " always-on omci ont-lineprofile-name HSI_MYTV_VOIP ont-srvprofile-id 7\r\n"
        + "\r\n"
        + "return\r\n"
        return s;
}
  
function khaiNet_OLT_HW( card,  pon,  id,  vlanNet,  vlanql, srvPortID_NET, srvPortID_GNMS){
      s = "service-port " + srvPortID_NET + " vlan " + vlanNet + " gpon 0/" + card + "/" + pon + " ont " + id + " gemport 1 multi-service user-vlan 11 tag-transform translate inbound traffic-table name Fiber300M outbound traffic-table name Fiber300M\r\n"
         + "service-port " + srvPortID_GNMS + " vlan " + vlanql + " gpon 0/" + card + "/" + pon + " ont " + id + " gemport 5 multi-service user-vlan 4000 tag-transform translate inbound traffic-table name TR069 outbound traffic-table name TR069\r\n"      
         + "\r\n"
         + "return\r\n" ;
        return s;
}
function khaiMyTV_OLT_HW( card,  pon,  id,  vlanVod, srvPortID_MYTV){
      s = "config\r\n" 
         + "service-port " + srvPortID_MYTV + " vlan " + vlanVod +" gpon 0/" + card + "/" + pon + " ont " + id +" gemport 2 multi-service user-vlan 12 tag-transform translate inbound traffic-table name IPTV outbound traffic-table name IPTV \r\n"
         + "btv\r\n"
         + "igmp user add service-port " + srvPortID_MYTV + "\r\n"
         + "\r\n"
         + "quit\r\n"
         + "multicast-vlan 99\r\n"
         + "igmp multicast-vlan member service-port "+ srvPortID_MYTV + "\r\n"
         + "\r\n"
         + "return\r\n"
        return s;
} 
function khaiIMS_HW_Igate( card,  pon,  id, srvPortID_IMS){
      s = "config\r\n" 
         + "service-port " + srvPortID_IMS + " vlan 1401 gpon 0/" + card + "/" + pon + " ont " + id + " gemport 3 multi-service user-vlan 13 tag-transform translate inbound traffic-table name VOIP outbound traffic-table name VOIP\r\n"
         + "\r\n" 
         + "return\r\n";
        return s;
}
/*
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
     + "wan-ip 1 mode pppoe username "  + accnet + " password" + passnet + " vlan-profile HSI_PPPOE host 1\r\n"
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
    
 */