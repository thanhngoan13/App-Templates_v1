
   function khaiCSDL_OLT_ALU( card,  pon,  id,  vlan) {

        var s = "// Khai báo profile \r\n" +
        "configure qos profiles ingress-qos VPN_TC2 dot1-p0-tc 2 dot1-p1-tc 2 dot1-p2-tc 2 dot1-p3-tc 2 dot1-p4-tc 2 dot1-p5-tc 2 dot1-p6-tc 2 dot1-p7-tc 2\r\n"
       + "configure qos profiles shaper FiberVPN_2M_CSDL committed-info-rate 0 committed-burst-size 0 excess-info-rate 2048 type singletokenbucketgpon\r\n" +
       "configure qos profiles bandwidth FiberVPN_2M_CSDL committed-info-rate 2048 assured-info-rate 2048 excessive-info-rate 2560 delay-tolerance 4  \r\n"
       + "exit all\r\n" +
    
       "\r\n\r\n" +
       "//Khai bao vlan \r\n" +
       "configure vlan id " + vlan + " mode residential-bridge name \"CSDLDC\" new-broadcast enable unknown-unicast pt2ptgem-flooding in-qos-prof-name name:VPN_TC2\r\n" +
        "configure service vpls " + vlan + " customer 1 v-vpls vlan " + vlan + " create \r\n" +
        "configure service vpls " + vlan + " description \"CSDLDC\"\r\n" +
        "configure service vpls " + vlan + " sap lag-1:" + vlan + " create\r\n" +
        "configure service vpls " + vlan + " sap lt:1/1/" + card + ":" + vlan + " create\r\n" +
        "configure service vpls " + vlan + " no shutdown\r\n" +
        "exit all \r\n" +
        "\r\n\r\n//Khai cau hinh port \r\n" +
        "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue 2 bandwidth-profile name:FiberVPN_2M_CSDL bandwidth-sharing uni-sharing\r\n" +
        "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 2 shaper-profile name:FiberVPN_2M_CSDL\r\n"+
        "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1\r\n"
        + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 15 tag single-tagged network-vlan " + vlan + " vlan-scope local\r\n" +
        "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 max-unicast-mac 20 \r\n"
        + "exit all ";
    
    ;
    return s;
    }
    
    //khai megawan modem igate 
    function khaiMegawan_OLT_ALU( card,  pon,  id,  vlan,  tocdo,  tenkenh)
    {
         tocdoprofile = tocdo * 1024;
         tocdokh = (int)(tocdoprofile * 1.1);
         s = "================//Khai profile//======================= \r\n" +
            "configure qos profiles ingress-qos VPN_TC2 dot1-p0-tc 2 dot1-p1-tc 2 dot1-p2-tc 2 dot1-p3-tc 2 dot1-p4-tc 2 dot1-p5-tc 2 dot1-p6-tc 2 dot1-p7-tc 2\r\n" +
            "configure qos profiles shaper FiberVPN_" + tocdo + "M committed-info-rate 0 committed-burst-size 0 excess-info-rate " + tocdokh + " type singletokenbucketgpon\r\n" +
            "configure qos profiles bandwidth FiberVPN_" + tocdo + "M committed-info-rate 0 assured-info-rate " + tocdoprofile + " excessive-info-rate " + tocdokh + " delay-tolerance 8\r\n" +
            "===================// khai vlan (nếu phần tốc độ đã khai thì khai phần dưới)//======================\r\n" +
            "configure vlan id " + vlan + " mode residential-bridge name \"" + tenkenh + "\" new-broadcast enable unknown-unicast pt2ptgem-flooding in-qos-prof-name name:VPN_TC2\r\n" +
            "configure service vpls " + vlan + " customer 1 v-vpls vlan " + vlan + " create\r\n" +
            "configure service vpls "+vlan+" description \"" + tenkenh + "\"\r\n" +
            "configure service vpls " + vlan + " sap lag-1:" + vlan + " create\r\n" +
            "configure service vpls " + vlan + " sap lt:1/1/" + card + ":" + vlan + " create\r\n" +
            "configure service vpls " + vlan + " no shutdown\r\n" +
            "exit all\r\n" +
            "===================//cấu hình ONT//======================\r\n" +
            "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue 2 bandwidth-profile name:FiberVPN_" + tocdo + "M bandwidth-sharing uni-sharing\r\n" +
            "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 2 shaper-profile name:FiberVPN_" + tocdo + "M\r\n" +
             "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1\r\n"+
            "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 15 tag single-tagged network-vlan " + vlan + " vlan-scope local\r\n" +
            "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 max-unicast-mac 20\r\n" +
            "exit all";
        return s;
    }
    
    //ham khai camera ha tien vlan 3594  cho modem igate 
    function khaiCamera_vlan3594_OLT_ALU( card,  pon,  id,  vlan,  tocdo,  tenkenh)
    {
         tocdoprofile = tocdo * 1024;
         tocdokh = (int)(tocdoprofile * 1.1);
           "configure qos profiles ingress-qos VPN_TC2 dot1-p0-tc 2 dot1-p1-tc 2 dot1-p2-tc 2 dot1-p3-tc 2 dot1-p4-tc 2 dot1-p5-tc 2 dot1-p6-tc 2 dot1-p7-tc 2\r\n" +
                    "configure qos profiles shaper CAMERA_CAT15M committed-info-rate 0 committed-burst-size 0 excess-info-rate 15000 type singletokenbucketgpon\r\n" +
                    "configure qos profiles bandwidth CAMERA_CAT15M committed-info-rate 0 assured-info-rate 15000 excessive-info-rate 15000 delay-tolerance 8\r\n" +
                    "exit all\r\n" +
                     "===================// khai vlan (nếu phần tốc độ đã khai thì khai phần dưới)//======================\r\n" +
                   "configure vlan id " + vlan + " mode residential-bridge name \"CAMERA_CAT15M\" new-broadcast enable unknown-unicast pt2ptgem-flooding in-qos-prof-name name:VPN_TC2\r\n" +
                 "configure service vpls " + vlan + " customer 1 v-vpls vlan " + vlan + " create\r\n" +
            "configure service vpls "+vlan+" description \"CAMERA_CAT15M\"\r\n" +
            "configure service vpls " + vlan + " sap lag-1:" + vlan + " create\r\n" +
            "configure service vpls " + vlan + " sap lt:1/1/" + card + ":" + vlan + " create\r\n" +
            "configure service vpls " + vlan + " no shutdown\r\n" +
            "exit all\r\n" +
            "===================//cấu hình ONT//======================\r\n" +
            "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue 2 bandwidth-profile name:CAMERA_CAT15M bandwidth-sharing uni-sharing\r\n" +
            "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 2 shaper-profile name:CAMERA_CAT15M\r\n" +
             "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1\r\n" +
            "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 15 tag single-tagged network-vlan " + vlan + " vlan-scope local\r\n" +
            "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 max-unicast-mac 20\r\n" +
            "exit all";
        return s;
    }
    
    
    function khaiCamera_vlan3594_HT_OLT_ALU( card,  pon,  id,  vlan,  tocdo,  tenkenh)
    {
         tocdoprofile = tocdo * 1024;
         tocdokh = (int)(tocdoprofile * 1.1);
         s = "================//Khai profile//======================= \r\n" +
           "configure qos profiles ingress-qos VPN_TC2 dot1-p0-tc 2 dot1-p1-tc 2 dot1-p2-tc 2 dot1-p3-tc 2 dot1-p4-tc 2 dot1-p5-tc 2 dot1-p6-tc 2 dot1-p7-tc 2\r\n" +
                    "configure qos profiles shaper CAMERA_CAT15M committed-info-rate 0 committed-burst-size 0 excess-info-rate 15000 type singletokenbucketgpon\r\n" +
                    "configure qos profiles bandwidth CAMERA_CAT15M committed-info-rate 0 assured-info-rate 15000 excessive-info-rate 15000 delay-tolerance 8\r\n" +
                    "exit all\r\n" +
                     "===================// khai vlan (nếu phần tốc độ đã khai thì khai phần dưới)//======================\r\n" +
                   "configure vlan id " + vlan + " mode residential-bridge name \"CAMERA_CAT15M\" new-broadcast enable unknown-unicast pt2ptgem-flooding in-qos-prof-name name:VPN_TC2\r\n" +
                 "configure service vpls " + vlan + " customer 1 v-vpls vlan " + vlan + " create\r\n" +
            "configure service vpls "+vlan+" description \"CAMERA_CAT15M\"\r\n" +
            "configure service vpls " + vlan + " sap lag-1:" + vlan + " create\r\n" +
            "configure service vpls " + vlan + " sap lt:1/1/" + card + ":" + vlan + " create\r\n" +
            "configure service vpls " + vlan + " no shutdown\r\n" +
            "exit all\r\n" +
            "===================//cấu hình ONT//======================\r\n" +
            "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue 4 bandwidth-profile name:CAMERA_CAT15M bandwidth-sharing uni-sharing\r\n" +
            "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 4 shaper-profile name:CAMERA_CAT15M\r\n" +
             "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1\r\n"+
            "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 15 tag single-tagged network-vlan " + vlan + " vlan-scope local\r\n" +
            "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 max-unicast-mac 20\r\n" +
            "exit all";
        return s;
    }
    
    function khaiCamera_Vlink_OLT_ALU( card,  pon,  id,  vlan)
            {
                 s = "// Khai báo profile \r\n" +
                          "configure qos profiles ingress-qos VPN_TC2 dot1-p0-tc 2 dot1-p1-tc 2 dot1-p2-tc 2 dot1-p3-tc 2 dot1-p4-tc 2 dot1-p5-tc 2 dot1-p6-tc 2 dot1-p7-tc 2\r\n" +
                            "configure qos profiles shaper CAMERA_CAT15M committed-info-rate 0 committed-burst-size 0 excess-info-rate 15000 type singletokenbucketgpon\r\n" +
                            "configure qos profiles bandwidth CAMERA_CAT15M committed-info-rate 0 assured-info-rate 15000 excessive-info-rate 15000 delay-tolerance 8\r\n" +
                            "exit all\r\n" +
                             "===================// khai vlan (nếu phần tốc độ đã khai thì khai phần dưới)//======================\r\n" +
                           "configure vlan id " + vlan + " mode residential-bridge name \"CAMERA_CAT15M\" new-broadcast enable unknown-unicast pt2ptgem-flooding in-qos-prof-name name:VPN_TC2\r\n" +
                         "configure service vpls " + vlan + " customer 1 v-vpls vlan " + vlan + " create\r\n" +
                    "configure service vpls "+vlan+" description \"CAMERA_CAT15M\"\r\n" +
                    "configure service vpls " + vlan + " sap lag-1:" + vlan + " create\r\n" +
                    "configure service vpls " + vlan + " sap lt:1/1/" + card + ":" + vlan + " create\r\n" +
                    "configure service vpls " + vlan + " no shutdown\r\n" +
                    "exit all\r\n" +
    
                            "//Khai cau hinh port \r\n" +
                            "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue 2 bandwidth-profile name:CAMERA_CAT15M  bandwidth-sharing uni-sharing\r\n" +
                            "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 2 shaper-profile name:CAMERA_CAT15M\r\n"
                            + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1\r\n"
                             + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id " + vlan + "\r\n"
                              + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 pvid " + vlan + "\r\n"
                                + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 max-unicast-mac 20\r\n"
                            + "exit all ";
    
                ;
                return s;
            }
    
     //khai camera vlan 3594 olt ha tien 
     function khaiCamera_Vlink_HT_OLT_ALU( card,  pon,  id,  vlan)
     {
          s = "// Khai báo profile \r\n" +
                     "configure qos profiles ingress-qos VPN_TC2 dot1-p0-tc 2 dot1-p1-tc 2 dot1-p2-tc 2 dot1-p3-tc 2 dot1-p4-tc 2 dot1-p5-tc 2 dot1-p6-tc 2 dot1-p7-tc 2\r\n" +
                     "configure qos profiles shaper CAMERA_CAT15M committed-info-rate 0 committed-burst-size 0 excess-info-rate 15000 type singletokenbucketgpon\r\n" +
                     "configure qos profiles bandwidth CAMERA_CAT15M committed-info-rate 0 assured-info-rate 15000 excessive-info-rate 15000 delay-tolerance 8\r\n" +
                     "exit all\r\n" +
                     "exit all\r\n" +
    
                    "===================// khai vlan (nếu phần tốc độ đã khai thì khai phần dưới)//======================\r\n" +
                    "configure vlan id " + vlan + " mode residential-bridge name \"CAMERA_CAT15M\" new-broadcast enable unknown-unicast pt2ptgem-flooding in-qos-prof-name name:VPN_TC2\r\n" +
                  "configure service vpls " + vlan + " customer 1 v-vpls vlan " + vlan + " create\r\n" +
             "configure service vpls "+vlan+" description \"CAMERA_CAT15M\"\r\n" +
             "configure service vpls " + vlan + " sap lag-1:" + vlan + " create\r\n" +
             "configure service vpls " + vlan + " sap lt:1/1/" + card + ":" + vlan + " create\r\n" +
             "configure service vpls " + vlan + " no shutdown\r\n" +
             "exit all\r\n" +
    
                     "//Khai cau hinh port \r\n" +
                     "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue 4 bandwidth-profile name:CAMERA_CAT15M  bandwidth-sharing uni-sharing\r\n" +
                     "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 4 shaper-profile name:CAMERA_CAT15M\r\n"
                     + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1\r\n"
                      + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id " + vlan + "\r\n"
                       + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 pvid " + vlan + "\r\n"
                         + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 max-unicast-mac 20\r\n"
                     + "exit all ";
    
         ;
         return s;
     }
    
      //ham khai megawan vlink 1000
      function khaiMegawan_Vlink1000_OLT_ALU( card,  pon,  id,  vlan,  tocdo,  tenkenh)
      {
           tocdoprofile = tocdo * 1024;
           tocdokh = (int)(tocdoprofile * 1.1);
           s = "================//Khai profile//======================= \r\n" +
              "configure qos profiles ingress-qos VPN_TC2 dot1-p0-tc 2 dot1-p1-tc 2 dot1-p2-tc 2 dot1-p3-tc 2 dot1-p4-tc 2 dot1-p5-tc 2 dot1-p6-tc 2 dot1-p7-tc 2\r\n" +
              "configure qos profiles shaper FiberVPN_" + tocdo + "M committed-info-rate 0 committed-burst-size 0 excess-info-rate " + tocdokh + " type singletokenbucketgpon\r\n" +
              "configure qos profiles bandwidth FiberVPN_" + tocdo + "M committed-info-rate 0 assured-info-rate " + tocdoprofile + " excessive-info-rate " + tocdokh + " delay-tolerance 8\r\n" +
              "===================// khai vlan (nếu phần tốc độ đã khai thì khai phần dưới)//======================\r\n" +
              "configure vlan id " + vlan + " mode residential-bridge name \"" + tenkenh + "\" new-broadcast enable unknown-unicast pt2ptgem-flooding in-qos-prof-name name:VPN_TC2\r\n" +
              "configure service vpls " + vlan + " customer 1 v-vpls vlan " + vlan + " create\r\n" +
              "configure service vpls "+vlan+" description \"" + tenkenh + "\"\r\n" +
              "configure service vpls " + vlan + " sap lag-1:" + vlan + " create\r\n" +
              "configure service vpls " + vlan + " sap lt:1/1/" + card + ":" + vlan + " create\r\n" +
              "configure service vpls " + vlan + " no shutdown\r\n" +
              "exit all\r\n" +
              "===================//cấu hình ONT//======================\r\n" +
              "//Khai cau hinh port \r\n" +
                      "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue 2 bandwidth-profile name:FiberVPN_" + tocdo + "M  bandwidth-sharing uni-sharing\r\n" +
                      "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 2 shaper-profile name:FiberVPN_" + tocdo + "M\r\n"
                      + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1\r\n"
                       + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id " + vlan + "\r\n"
                        + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 pvid " + vlan + "\r\n"
                          + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 max-unicast-mac 20\r\n"
                      + "exit all ";
          return s;
      }
    
      function XoaONU_OLT_ALU (card, pon,id) {
        var s = "configure equipment ont interface 1/1/" + card + "/" + pon + "/" + id + " admin-state down\r\n"
                + "configure equipment ont no interface 1/1/" + card + "/" + pon + "/" + id + "\r\n"
               + "exit all\r\n";
        return s;
    }
    
    
    function khaiONU_OLT_ALU( card,  pon,  id,  pw)
    {
    
         s = "configure equipment ont interface 1/1/" + card + "/" + pon + "/" + id + " sw-ver-pland DISABLED "
        + "subslocid " + pw + " sw-dnload-version disabled enable-aes enable\r\n"
        + "configure equipment ont slot 1/1/" + card + "/" + pon + "/" + id + "/14 planned-card-type veip "
        + "plndnumdataports 1 plndnumvoiceports 0 port-type uni admin-state up\r\n"
        + "configure interface port uni:1/1/" + card + "/" + pon + "/" + id + "/14/1 admin-up\r\n"
        + "exit all\r\n";
        return s;
    }
    
    function khaiNet_OLT_ALU( card,  pon,  id,  vlanNet,  vlanql)
    {
         
    
        s = "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 0 shaper-profile name:Fiber300M\r\n"
               + "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue"
               + " 0 bandwidth-profile name:Fiber300M bandwidth-sharing uni-sharing\r\n"
               + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1\r\n"
               + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 11 tag single-tagged network-vlan " + vlanNet + " vlan-scope local\r\n"
               + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 max-unicast-mac 20\r\n"
              + "configure bridge port  1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 4000 tag single-tagged network-vlan " + vlanql + " vlan-scope local\r\n"
               + "exit all\r\n";
    
    
    
    
        return s;
    }
    
    //Khai net vlan 1000
    
    function khaiNetVlan1000_OLT_ALU( card,  pon,  id,  vlanNet,  vlanql)
    {
      
    
        s = "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 0 shaper-profile name:Fiber300M\r\n"
               + "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue"
               + " 0 bandwidth-profile name:Fiber300M bandwidth-sharing uni-sharing\r\n"
               + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1\r\n"
               + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 11 tag single-tagged network-vlan " + vlanNet + " vlan-scope local\r\n"
               + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 max-unicast-mac 20\r\n" +
               "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 pvid 11\r\n"
    
               + "exit all\r\n";
    
    
    
    
        return s;
    }
    
    function KhaiVlanQL_OLT_ALU( card,  pon,  id,  vlanql)
            {
                 s = "configure bridge port  1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 4000 tag single-tagged network-vlan " + vlanql + " vlan-scope local\r\n";
                return s;
    
            }
    
    
            function khaiMyTV_OLT_ALU( card,  pon,  id,  vlanVod)
            {
    
                 s = "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 4 shaper-profile name:IPTV_down_22M\r\n"
              + "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue 4 bandwidth-profile name:IPTV_up bandwidth-sharing uni-sharing\r\n"
              + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 12 tag single-tagged network-vlan " + vlanVod + " vlan-scope local\r\n"
    
              + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 12 max-unicast-mac 10\r\n"
              + "configure  igmp channel vlan:1/1/" + card + "/" + pon + "/" + id + "/14/1:12 max-num-group 10\r\n"
              + "exit all";
                return s;
            }    
            
            function khaiONU_240_OLT_ALU( card,  pon,  id,  pw)
            {
    
                 s = "configure equipment ont interface 1/1/" + card + "/" + pon + "/" + id + " sw-ver-pland DISABLED subslocid " + pw + "  sw-dnload-version disabled enable-aes enable  sn-bundle-ctrl unbundle voip-allowed enable\r\n"
                  + "configure equipment ont interface 1/1/" + card + "/" + pon + "/" + id + " admin-state up\r\n"
                  + "configure equipment ont slot 1/1/" + card + "/" + pon + "/" + id + "/1 planned-card-type 10_100base plndnumdataports 4 plndnumvoiceports 0 port-type uni admin-state up\r\n" +
                  "exit all\r\n";
    
                return s;
    
            }
    
            function khaiNet_240_OLT_ALU( card,  pon,  id,  vlanNet,  vlanql)
            {
    
                 s = "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/1/1 queue 0 shaper-profile name:Fiber300M\r\n"
               + "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/1/1 upstream-queue 0 bandwidth-profile name:Fiber300M bandwidth-sharing uni-sharing\r\n"
               + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/1/1\r\n"
               + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/1/1 vlan-id 11 tag single-tagged network-vlan " + vlanNet + " vlan-scope local\r\n"
               + "configure  interface port uni:1/1/" + card + "/" + pon + "/" + id + "/1/1 admin-up\r\n"
               + "configure  interface port uni:1/1/" + card + "/" + pon + "/" + id + "/1/2 admin-up\r\n"
               + "configure  interface port uni:1/1/" + card + "/" + pon + "/" + id + "/1/3 admin-up\r\n"
               + "configure  interface port uni:1/1/" + card + "/" + pon + "/" + id + "/1/4 admin-up\r\n"
               + "exit all\r\n";
                ;
    
                return s;
            }
    
            function khaiMyTV_240( card,  pon,  id,  vlanVod)
            {
    
             s = "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/1/4 queue 4 shaper-profile name:IPTV_down_22M\r\n"
              + "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/1/4 upstream-queue 4 bandwidth-profile name:IPTV_up bandwidth-sharing uni-sharing\r\n"
              + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/1/4 max-unicast-mac 20\r\n"
              + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/1/4 vlan-id " + vlanVod + "\r\n"
              + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/1/4 pvid " + vlanVod + "\r\n"
              + "configure  igmp channel vlan:1/1/" + card + "/" + pon + "/" + id + "/1/4:" + vlanVod + " max-num-group 254\r\n"
              + "exit all\r\n";
    
                return s;
    
            }
    
            function khaiIMS( card,  pon,  id,  filexml)
            {
                 s = "configure equipment ont slot 1/1/" + card + "/" + pon + "/" + id + "/2 planned-card-type pots plndnumdataports 0 plndnumvoiceports 2 admin-state up\r\n"
                            + "configure voice ont pots 1/1/" + card + "/" + pon + "/" + id + "/2/[1...2] admin-state unlocked\r\n"
                            + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/vuni\r\n"
                            + "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/voip upstream-queue 3 bandwidth-profile name:VoIP_IMS \r\n"
                            + "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/voip queue 3 shaper-profile name:VoIP_IMS\r\n"
                            + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/voip vlan-id 1401\r\n"
                            + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/voip pvid 1401\r\n"
                            + "configure voice ont service 1/1/" + card + "/" + pon + "/" + id + "/1 dhcp enabled voip-mode sip2 mgc-udp-port 5060 conf-method "
                            + "ftp ftp-serv-ip-addr 10.146.239.254 ftp-user-name omc ftp-passwd plain:123456 conf-file-name " + filexml + ".xml vlan 1401 admin-state unlocked\r\n"
                    ;
                return s;
    
            }
    
            function khaiIMS_ALU_IgateO40( card,  pon,  id)
            {
                 s = "configure interface port uni:1/1/" + card + "/" + pon + "/" + id + "/14/1 admin-up\r\n"
                           + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 max-unicast-mac 10\r\n"
                           + "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 queue 3 shaper-profile name:VoIP_IMS\r\n"
                           + "configure qos interface 1/1/" + card + "/" + pon + "/" + id + "/14/1 upstream-queue 3 bandwidth-profile name:VoIP_IMS\r\n"
                           + "configure bridge port 1/1/" + card + "/" + pon + "/" + id + "/14/1 vlan-id 13 tag single-tagged network-vlan 1401 vlan-scope local\r\n";
                ;
                return s;
            }
