  
function XoaONU_OLT_DSA (card, pon,id) {
      s= "configure t\r\n"
       + "gpon\r\n"
       + "gpon-olt " + pon + "\r\n"
       + "no onu " + id + "\r\n"
       + "end\r\n";
      return s;
}
    
function khaiONU_OLT_DSA( card,  pon,  id,  pw){
      s = "configure t\r\n"
        + "gpon\r\n"
        + "gpon-olt " + pon + "\r\n"
        + "onu add " + id + " registration-id " + pw + "\r\n"
        + "end\r\n";
        return s;
}
    
function khaiNet_OLT_DSA( card,  pon,  id,  vlanNet,  vlanql){
      s = "configure t\r\n"
        + "gpon\r\n"
        + "gpon-olt " + pon + "\r\n"
        + "onu-profile " + id + " HSI_MYTV_VOIP_ONU\r\n"  
        + "olt onu-rate-limit " + id + " downstream 300000 vid " + vlanNet + "\r\n"
        + "end\r\n";
       
        return s;
}
  
function khaiMyTV_OLT_DSA( card,  pon,  id,  vlanNet){
      s = "configure t\r\n"
        + "gpon\r\n"
        + "gpon-olt " + pon + "\r\n"
        + "onu-profile " + id + " HSI_MYTV_VOIP_ONU\r\n"  
        + "olt onu-rate-limit " + id + " downstream 300000 vid " + vlanNet + "\r\n"
        + "end\r\n";
        return s;
}    

function khaiIMS_DSA_IgateO40( card,  pon,  id, vlanNet){
      s = "configure t\r\n"
        + "gpon\r\n"
        + "gpon-olt " + pon + "\r\n"
        + "onu-profile " + id + " HSI_MYTV_VOIP_ONU\r\n"  
        + "olt onu-rate-limit " + id + " downstream 300000 vid " + vlanNet + "\r\n"
        + "end\r\n";
        return s;
}

    

