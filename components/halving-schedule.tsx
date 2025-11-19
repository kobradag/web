"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarClock } from "lucide-react"

interface HalvingEvent {
  daaScore: string
  blockReward: string
  date: string
  supply: string
  totalSupply: string
  percentage: string
  block?: string
}

const halvingEvents: HalvingEvent[] = [
  {
    daaScore: "2629840",
    blockReward: "10.0",
    date: "28/06/2024",
    supply: "66,291,600",
    totalSupply: "66,291,600",
    percentage: "14.90%",
  },
  {
    daaScore: "5259640",
    blockReward: "8.0",
    date: "29/07/2024",
    supply: "21,038,400",
    totalSupply: "87,330,000",
    percentage: "19.62%",
  },
  {
    daaScore: "7889440",
    blockReward: "7.55224037",
    date: "29/08/2024",
    supply: "19,860,776",
    totalSupply: "107,190,776",
    percentage: "24.09%",
  },
  {
    daaScore: "10519240",
    blockReward: "7.12908805",
    date: "29/09/2024",
    supply: "18,749,159",
    totalSupply: "125,939,935",
    percentage: "28.30%",
  },
  {
    daaScore: "13149040",
    blockReward: "6.72984981",
    date: "30/10/2024",
    supply: "17,699,869",
    totalSupply: "143,639,804",
    percentage: "32.28%",
  },
  {
    daaScore: "15778840",
    blockReward: "6.35290736",
    date: "30/11/2024",
    supply: "16,709,223",
    totalSupply: "160,349,027",
    percentage: "36.03%",
  },
  {
    daaScore: "18408640",
    blockReward: "5.99714953",
    date: "01/01/2025",
    supply: "15,774,066",
    totalSupply: "176,123,093",
    percentage: "39.58%",
  },
  {
    daaScore: "21038440",
    blockReward: "5.66129493",
    date: "28/01/2025",
    supply: "14,891,243",
    totalSupply: "191,014,336",
    percentage: "42.92%",
  },
  {
    daaScore: "23668240",
    blockReward: "5.34417897",
    date: "27/02/2025",
    supply: "14,057,859",
    totalSupply: "205,072,195",
    percentage: "44.50%",
  },
  {
    daaScore: "26298040",
    blockReward: "5.04484734",
    date: "29/03/2025",
    supply: "13,271,023",
    totalSupply: "218,343,217",
    percentage: "49.04%",
  },
  {
    daaScore: "28927840",
    blockReward: "4.76223433",
    date: "29/04/2025",
    supply: "12,528,367",
    totalSupply: "230,871,584",
    percentage: "51.62%",
  },
  {
    daaScore: "31557640",
    blockReward: "4.49554166",
    date: "29/05/2025",
    supply: "11,827,263",
    totalSupply: "242,698,847",
    percentage: "52.77%",
  },
  {
    daaScore: "34187440",
    blockReward: "4.2437",
    date: "29/06/2025",
    supply: "11,165,342",
    totalSupply: "253,864,189",
    percentage: "56.87%",
  },
  {
    daaScore: "36817240",
    blockReward: "4.0",
    date: "29/07/2025",
    supply: "10,540,501",
    totalSupply: "264,404,690",
    percentage: "59.18%",
  },
  {
    daaScore: "39447040",
    blockReward: "3.77609102",
    date: "28/08/2025",
    supply: "9,950,637",
    totalSupply: "274,355,327",
    percentage: "61.52%",
  },
  {
    daaScore: "42076840",
    blockReward: "3.5645749",
    date: "28/09/2025",
    supply: "9,393,646",
    totalSupply: "283,748,973",
    percentage: "63.78%",
  },
  {
    daaScore: "44706640",
    blockReward: "3.36480368",
    date: "28/10/2025",
    supply: "8,867,949",
    totalSupply: "292,616,922",
    percentage: "65.85%",
  },
  {
    daaScore: "47336440",
    blockReward: "3.17637476",
    date: "28/11/2025",
    supply: "8,371,705",
    totalSupply: "300,988,627",
    percentage: "67.77%",
  },
  {
    daaScore: "49966240",
    blockReward: "2.99844746",
    date: "28/12/2025",
    supply: "7,903,075",
    totalSupply: "308,891,702",
    percentage: "69.58%",
  },
  {
    daaScore: "52596040",
    blockReward: "2.83043948",
    date: "27/01/2026",
    supply: "7,460,743",
    totalSupply: "316,352,445",
    percentage: "70.89%",
  },
  {
    daaScore: "55225840",
    blockReward: "2.67182367",
    date: "27/02/2026",
    supply: "7,043,130",
    totalSupply: "323,395,575",
    percentage: "72.09%",
  },
  {
    daaScore: "57855640",
    blockReward: "2.5221249",
    date: "29/03/2026",
    supply: "6,648,923",
    totalSupply: "330,044,498",
    percentage: "73.16%",
  },
  {
    daaScore: "60485440",
    block: "2.38081716",
    date: "29/04/2026",
    supply: "6,276,807",
    totalSupply: "336,321,305",
    percentage: "75.08%",
  },
  {
    daaScore: "63115240",
    block: "2.24742083",
    date: "29/05/2026",
    supply: "5,925,465",
    totalSupply: "342,246,770",
    percentage: "76.73%",
  },
  {
    daaScore: "65745040",
    block: "2.0",
    date: "28/06/2026",
    supply: "5,593,848",
    totalSupply: "347,840,618",
    percentage: "77.85%",
  },
  {
    daaScore: "68374840",
    block: "1.88886009",
    date: "29/07/2026",
    supply: "5,280,638",
    totalSupply: "353,121,256",
    percentage: "78.88%",
  },
  {
    daaScore: "71004640",
    block: "1.78304551",
    date: "28/08/2026",
    supply: "4,985,049",
    totalSupply: "358,106,305",
    percentage: "80.02%",
  },
  {
    daaScore: "73634440",
    block: "1.68313745",
    date: "28/09/2026",
    supply: "4,706,027",
    totalSupply: "362,812,332",
    percentage: "81.07%",
  },
  {
    daaScore: "76264240",
    block: "1.58885184",
    date: "28/10/2026",
    supply: "4,442,521",
    totalSupply: "367,254,853",
    percentage: "82.07%",
  },
  {
    daaScore: "78894040",
    block: "1.49983738",
    date: "27/11/2026",
    supply: "4,193,742",
    totalSupply: "371,448,595",
    percentage: "83.00%",
  },
  {
    daaScore: "81523840",
    block: "1.41587373",
    date: "28/12/2026",
    supply: "3,958,901",
    totalSupply: "375,407,496",
    percentage: "83.84%",
  },
  {
    daaScore: "84153640",
    block: "1.33656974",
    date: "27/01/2027",
    supply: "3,737,209",
    totalSupply: "379,144,705",
    percentage: "84.59%",
  },
  {
    daaScore: "86783440",
    block: "1.26166183",
    date: "27/02/2027",
    supply: "3,528,140",
    totalSupply: "382,672,845",
    percentage: "85.26%",
  },
  {
    daaScore: "89413240",
    block: "1.19511245",
    date: "29/03/2027",
    supply: "3,330,642",
    totalSupply: "386,003,486",
    percentage: "85.89%",
  },
  {
    daaScore: "92043040",
    block: "1.12810858",
    date: "28/04/2027",
    supply: "3,144,189",
    totalSupply: "389,147,675",
    percentage: "86.49%",
  },
  {
    daaScore: "94672840",
    block: "1.06496041",
    date: "29/05/2027",
    supply: "2,968,255",
    totalSupply: "392,115,931",
    percentage: "87.07%",
  },
  {
    daaScore: "97302640",
    block: "1.0",
    date: "28/06/2027",
    supply: "2,802,052",
    totalSupply: "394,917,983",
    percentage: "87.63%",
  },
  {
    daaScore: "99932440",
    block: "0.94478004",
    date: "29/07/2027",
    supply: "2,645,316",
    totalSupply: "397,563,298",
    percentage: "88.17%",
  },
  {
    daaScore: "102562240",
    block: "0.89177275",
    date: "28/08/2027",
    supply: "2,497,258",
    totalSupply: "400,060,556",
    percentage: "88.67%",
  },
  {
    daaScore: "105192040",
    block: "0.84176872",
    date: "27/09/2027",
    supply: "2,357,616",
    totalSupply: "402,418,172",
    percentage: "89.15%",
  },
  {
    daaScore: "107821840",
    block: "0.79457592",
    date: "28/10/2027",
    supply: "2,225,600",
    totalSupply: "404,643,772",
    percentage: "89.62%",
  },
  {
    daaScore: "110451640",
    block: "0.75001869",
    date: "27/11/2027",
    supply: "2,100,947",
    totalSupply: "406,744,719",
    percentage: "90.06%",
  },
  {
    daaScore: "113081440",
    block: "0.70843686",
    date: "28/12/2027",
    supply: "1,983,395",
    totalSupply: "408,728,114",
    percentage: "90.48%",
  },
  {
    daaScore: "115711240",
    block: "0.668785677",
    date: "27/01/2028",
    supply: "1,872,418",
    totalSupply: "410,600,532",
    percentage: "90.88%",
  },
  {
    daaScore: "118341040",
    block: "0.63135377",
    date: "26/02/2028",
    supply: "1,767,489",
    totalSupply: "412,368,020",
    percentage: "91.25%",
  },
  {
    daaScore: "120970840",
    block: "0.596016924",
    date: "28/03/2028",
    supply: "1,668,608",
    totalSupply: "414,036,629",
    percentage: "91.60%",
  },
  {
    daaScore: "123600640",
    block: "0.562657881",
    date: "27/04/2028",
    supply: "1,575,250",
    totalSupply: "415,611,879",
    percentage: "91.92%",
  },
  {
    daaScore: "126230440",
    block: "0.531165942",
    date: "28/05/2028",
    supply: "1,487,152",
    totalSupply: "417,099,031",
    percentage: "92.22%",
  },
  {
    daaScore: "128860240",
    block: "0.501436605",
    date: "27/06/2028",
    supply: "1,403,787",
    totalSupply: "418,502,818",
    percentage: "92.50%",
  },
  {
    daaScore: "131490040",
    block: "0.5",
    date: "27/07/2028",
    supply: "1,325,156",
    totalSupply: "419,827,974",
    percentage: "92.76%",
  },
  {
    daaScore: "134119840",
    block: "0.47318487",
    date: "27/08/2028",
    supply: "1,250,996",
    totalSupply: "421,078,970",
    percentage: "93.00%",
  },
  {
    daaScore: "136749640",
    block: "0.44694098",
    date: "26/09/2028",
    supply: "1,181,043",
    totalSupply: "422,260,013",
    percentage: "93.22%",
  },
  {
    daaScore: "139379440",
    block: "0.42194032",
    date: "27/10/2028",
    supply: "1,115,035",
    totalSupply: "423,375,048",
    percentage: "93.42%",
  },
  {
    daaScore: "142009240",
    block: "0.3981001",
    date: "26/11/2028",
    supply: "1,052,709",
    totalSupply: "424,427,757",
    percentage: "93.60%",
  },
  {
    daaScore: "144639040",
    block: "0.3753457",
    date: "26/12/2028",
    supply: "993,801",
    totalSupply: "425,421,559",
    percentage: "93.77%",
  },
  {
    daaScore: "147268840",
    block: "0.35361078",
    date: "26/01/2029",
    supply: "938,050",
    totalSupply: "426,359,608",
    percentage: "93.92%",
  },
  {
    daaScore: "149898640",
    block: "0.33286966",
    date: "25/02/2029",
    supply: "885,454",
    totalSupply: "427,245,062",
    percentage: "94.05%",
  },
  {
    daaScore: "152528440",
    block: "0.3130526",
    date: "28/03/2029",
    supply: "836,013",
    totalSupply: "428,081,075",
    percentage: "94.17%",
  },
  {
    daaScore: "155158240",
    block: "0.29410289",
    date: "27/04/2029",
    supply: "789,203",
    totalSupply: "428,870,278",
    percentage: "94.27%",
  },
  {
    daaScore: "157788040",
    block: "0.27599074",
    date: "27/05/2029",
    supply: "745,022",
    totalSupply: "429,615,301",
    percentage: "94.35%",
  },
  {
    daaScore: "160417840",
    block: "0.25869052",
    date: "27/06/2029",
    supply: "703,209",
    totalSupply: "430,318,509",
    percentage: "94.42%",
  },
  {
    daaScore: "163047640",
    block: "0.24215816",
    date: "27/07/2029",
    supply: "663,762",
    totalSupply: "430,982,271",
    percentage: "94.48%",
  },
  {
    daaScore: "165677440",
    block: "0.22636194",
    date: "27/08/2029",
    supply: "626,681",
    totalSupply: "431,608,952",
    percentage: "94.53%",
  },
  {
    daaScore: "168307240",
    block: "0.21128115",
    date: "26/09/2029",
    supply: "591,705",
    totalSupply: "432,200,657",
    percentage: "94.57%",
  },
  {
    daaScore: "170937040",
    block: "0.1968986",
    date: "27/10/2029",
    supply: "558,570",
    totalSupply: "432,759,227",
    percentage: "94.60%",
  },
  {
    daaScore: "173566840",
    block: "0.18316063",
    date: "26/11/2029",
    supply: "527,275",
    totalSupply: "433,286,502",
    percentage: "94.62%",
  },
  {
    daaScore: "176196640",
    block: "0.17007481",
    date: "26/12/2029",
    supply: "497,821",
    totalSupply: "433,784,323",
    percentage: "94.63%",
  },
  {
    daaScore: "178826440",
    block: "0.15769332",
    date: "26/01/2030",
    supply: "469,945",
    totalSupply: "434,254,268",
    percentage: "94.64%",
  },
  {
    daaScore: "181456240",
    block: "0.14597945",
    date: "25/02/2030",
    supply: "443,647",
    totalSupply: "434,697,915",
    percentage: "94.64%",
  },
  {
    daaScore: "184086040",
    block: "0.13499981",
    date: "28/03/2030",
    supply: "418,927",
    totalSupply: "435,116,842",
    percentage: "94.64%",
  },
  {
    daaScore: "186715840",
    block: "0.12469975",
    date: "27/04/2030",
    supply: "395,522",
    totalSupply: "435,512,364",
    percentage: "94.64%",
  },
  {
    daaScore: "189345640",
    block: "0.11504096",
    date: "27/05/2030",
    supply: "373,432",
    totalSupply: "435,885,796",
    percentage: "94.64%",
  },
  {
    daaScore: "191975440",
    block: "0.10605118",
    date: "27/06/2030",
    supply: "352,656",
    totalSupply: "436,238,452",
    percentage: "94.64%",
  },
  {
    daaScore: "194605240",
    block: "0.09769097",
    date: "27/07/2030",
    supply: "332,933",
    totalSupply: "436,571,385",
    percentage: "94.64%",
  },
  {
    daaScore: "197235040",
    block: "0.08993039",
    date: "27/08/2030",
    supply: "314,261",
    totalSupply: "436,885,646",
    percentage: "94.64%",
  },
  {
    daaScore: "199864840",
    block: "0.08276054",
    date: "26/09/2030",
    supply: "296,641",
    totalSupply: "437,182,287",
    percentage: "94.64%",
  },
  {
    daaScore: "202494640",
    block: "0.07614949",
    date: "26/10/2030",
    supply: "280,074",
    totalSupply: "437,462,361",
    percentage: "94.64%",
  },
  {
    daaScore: "205124440",
    block: "0.07004944",
    date: "26/11/2030",
    supply: "264,295",
    totalSupply: "437,726,656",
    percentage: "94.64%",
  },
  {
    daaScore: "207754240",
    block: "0.06445178",
    date: "26/12/2030",
    supply: "249,568",
    totalSupply: "437,976,224",
    percentage: "94.64%",
  },
  {
    daaScore: "210384040",
    block: "0.05932454",
    date: "26/01/2031",
    supply: "235,630",
    totalSupply: "438,211,854",
    percentage: "94.64%",
  },
  {
    daaScore: "213013840",
    block: "0.05462149",
    date: "25/02/2031",
    supply: "222,481",
    totalSupply: "438,434,335",
    percentage: "94.64%",
  },
  {
    daaScore: "215643640",
    block: "0.05035274",
    date: "27/03/2031",
    supply: "210,121",
    totalSupply: "438,644,456",
    percentage: "94.64%",
  },
  {
    daaScore: "218273440",
    block: "0.04643069",
    date: "27/04/2031",
    supply: "198,287",
    totalSupply: "438,842,743",
    percentage: "94.64%",
  },
  {
    daaScore: "220903240",
    block: "0.04285776",
    date: "27/05/2031",
    supply: "187,242",
    totalSupply: "439,029,985",
    percentage: "94.64%",
  },
  {
    daaScore: "223533040",
    block: "0.03958116",
    date: "27/06/2031",
    supply: "176,723",
    totalSupply: "439,206,707",
    percentage: "94.64%",
  },
  {
    daaScore: "226162840",
    block: "0.03658049",
    date: "27/07/2031",
    supply: "166,729",
    totalSupply: "439,373,437",
    percentage: "94.64%",
  },
  {
    daaScore: "228792640",
    block: "0.03384082",
    date: "26/08/2031",
    supply: "157,525",
    totalSupply: "439,530,962",
    percentage: "94.64%",
  },
  {
    daaScore: "231422440",
    block: "0.03133594",
    date: "26/09/2031",
    supply: "148,584",
    totalSupply: "439,679,545",
    percentage: "94.64%",
  },
  {
    daaScore: "234052240",
    block: "0.02904334",
    date: "26/10/2031",
    supply: "140,168",
    totalSupply: "439,819,714",
    percentage: "94.64%",
  },
  {
    daaScore: "236682040",
    block: "0.02694934",
    date: "26/11/2031",
    supply: "132,279",
    totalSupply: "439,951,993",
    percentage: "94.64%",
  },
  {
    daaScore: "239311840",
    block: "0.02504094",
    date: "26/12/2031",
    supply: "124,916",
    totalSupply: "440,076,908",
    percentage: "94.64%",
  },
  {
    daaScore: "241941640",
    block: "0.02330494",
    date: "25/01/2032",
    supply: "117,815",
    totalSupply: "440,194,723",
    percentage: "94.64%",
  },
  {
    daaScore: "244571440",
    block: "0.02172954",
    date: "25/02/2032",
    supply: "111,241",
    totalSupply: "440,305,964",
    percentage: "94.64%",
  },
  {
    daaScore: "247201240",
    block: "0.02029314",
    date: "26/03/2032",
    supply: "104,929",
    totalSupply: "440,410,893",
    percentage: "94.64%",
  },
  {
    daaScore: "249831040",
    block: "0.01898574",
    date: "26/04/2032",
    supply: "99,143",
    totalSupply: "440,510,036",
    percentage: "94.64%",
  },
  {
    daaScore: "252460840",
    block: "0.01779132",
    date: "26/05/2032",
    supply: "93,621",
    totalSupply: "440,603,657",
    percentage: "94.64%",
  },
  {
    daaScore: "255090640",
    block: "0.01670012",
    date: "25/06/2032",
    supply: "88,361",
    totalSupply: "440,692,018",
    percentage: "94.64%",
  },
  {
    daaScore: "257720440",
    block: "0.01570174",
    date: "26/07/2032",
    supply: "83,365",
    totalSupply: "440,775,383",
    percentage: "94.64%",
  },
  {
    daaScore: "260350240",
    block: "0.01478814",
    date: "25/08/2032",
    supply: "78,631",
    totalSupply: "440,854,014",
    percentage: "94.64%",
  },
  {
    daaScore: "262980040",
    block: "0.01395194",
    date: "25/09/2032",
    supply: "74,160",
    totalSupply: "440,928,174",
    percentage: "94.64%",
  },
  {
    daaScore: "265609840",
    block: "0.01318706",
    date: "25/10/2032",
    supply: "69,953",
    totalSupply: "440,998,127",
    percentage: "94.64%",
  },
  {
    daaScore: "268239640",
    block: "0.01248594",
    date: "24/11/2032",
    supply: "66,008",
    totalSupply: "441,064,135",
    percentage: "94.64%",
  },
  {
    daaScore: "270869440",
    block: "0.01184254",
    date: "25/12/2032",
    supply: "62,326",
    totalSupply: "441,126,461",
    percentage: "94.64%",
  },
  {
    daaScore: "273499240",
    block: "0.01125092",
    date: "24/01/2033",
    supply: "58,908",
    totalSupply: "441,185,369",
    percentage: "94.64%",
  },
  {
    daaScore: "276129040",
    block: "0.0107053",
    date: "24/02/2033",
    supply: "55,489",
    totalSupply: "441,240,858",
    percentage: "94.64%",
  },
  {
    daaScore: "278758840",
    block: "0.01020018",
    date: "26/03/2033",
    supply: "52,333",
    totalSupply: "441,293,191",
    percentage: "94.64%",
  },
  {
    daaScore: "281388640",
    block: "0.00973104",
    date: "25/04/2033",
    supply: "49,440",
    totalSupply: "441,342,631",
    percentage: "94.64%",
  },
  {
    daaScore: "284018440",
    block: "0.00929414",
    date: "26/05/2033",
    supply: "46,547",
    totalSupply: "441,389,178",
    percentage: "94.64%",
  },
  {
    daaScore: "286648240",
    block: "0.00888546",
    date: "25/06/2033",
    supply: "43,918",
    totalSupply: "441,433,096",
    percentage: "94.64%",
  },
  {
    daaScore: "289278040",
    block: "0.00850218",
    date: "26/07/2033",
    supply: "41,551",
    totalSupply: "441,474,647",
    percentage: "94.64%",
  },
  {
    daaScore: "291907840",
    block: "0.00814162",
    date: "25/08/2033",
    supply: "39,184",
    totalSupply: "441,513,831",
    percentage: "94.64%",
  },
  {
    daaScore: "294537640",
    block: "0.00780138",
    date: "24/09/2033",
    supply: "37,080",
    totalSupply: "441,550,911",
    percentage: "94.64%",
  },
  {
    daaScore: "297167440",
    block: "0.00747926",
    date: "25/10/2033",
    supply: "34,976",
    totalSupply: "441,585,887",
    percentage: "94.64%",
  },
  {
    daaScore: "299797240",
    block: "0.00717318",
    date: "24/11/2033",
    supply: "33,135",
    totalSupply: "441,619,023",
    percentage: "94.64%",
  },
  {
    daaScore: "302427040",
    block: "0.00688122",
    date: "25/12/2033",
    supply: "31,295",
    totalSupply: "441,650,317",
    percentage: "94.64%",
  },
  {
    daaScore: "305056840",
    block: "0.00660162",
    date: "24/01/2034",
    supply: "29,454",
    totalSupply: "441,679,771",
    percentage: "94.64%",
  },
  {
    daaScore: "307686640",
    block: "0.00633306",
    date: "24/02/2034",
    supply: "27,876",
    totalSupply: "441,707,647",
    percentage: "94.64%",
  },
  {
    daaScore: "310316440",
    block: "0.00607474",
    date: "26/03/2034",
    supply: "26,298",
    totalSupply: "441,733,945",
    percentage: "94.64%",
  },
  {
    daaScore: "312946240",
    block: "0.00582558",
    date: "25/04/2034",
    supply: "24,720",
    totalSupply: "441,758,665",
    percentage: "94.64%",
  },
  {
    daaScore: "315576040",
    block: "0.00558482",
    date: "26/05/2034",
    supply: "23,405",
    totalSupply: "441,782,070",
    percentage: "94.64%",
  },
  {
    daaScore: "318205840",
    block: "0.00535214",
    date: "25/06/2034",
    supply: "22,090",
    totalSupply: "441,804,161",
    percentage: "94.64%",
  },
  {
    daaScore: "320835640",
    block: "0.00512698",
    date: "26/07/2034",
    supply: "20,775",
    totalSupply: "441,824,936",
    percentage: "94.64%",
  },
  {
    daaScore: "323465440",
    block: "0.00490902",
    date: "25/08/2034",
    supply: "19,724",
    totalSupply: "441,844,660",
    percentage: "94.64%",
  },
  {
    daaScore: "326095240",
    block: "0.00469794",
    date: "24/09/2034",
    supply: "18,672",
    totalSupply: "441,863,331",
    percentage: "94.64%",
  },
  {
    daaScore: "328725040",
    block: "0.00449334",
    date: "25/10/2034",
    supply: "17,620",
    totalSupply: "441,880,951",
    percentage: "94.64%",
  },
  {
    daaScore: "331354840",
    block: "0.00429498",
    date: "24/11/2034",
    supply: "16,568",
    totalSupply: "441,897,519",
    percentage: "94.64%",
  },
  {
    daaScore: "333984640",
    block: "0.00410222",
    date: "25/12/2034",
    supply: "15,516",
    totalSupply: "441,913,034",
    percentage: "94.64%",
  },
  {
    daaScore: "336614440",
    block: "0.00391566",
    date: "24/01/2035",
    supply: "14,727",
    totalSupply: "441,927,761",
    percentage: "94.64%",
  },
  {
    daaScore: "339244240",
    block: "0.00373458",
    date: "23/02/2035",
    supply: "13,938",
    totalSupply: "441,941,699",
    percentage: "94.64%",
  },
  {
    daaScore: "341874040",
    block: "0.00355882",
    date: "26/03/2035",
    supply: "13,149",
    totalSupply: "441,954,848",
    percentage: "94.64%",
  },
  {
    daaScore: "344503840",
    block: "0.00338814",
    date: "25/04/2035",
    supply: "12,360",
    totalSupply: "441,967,208",
    percentage: "94.64%",
  },
  {
    daaScore: "347133640",
    block: "0.00322242",
    date: "26/05/2035",
    supply: "11,571",
    totalSupply: "441,978,779",
    percentage: "94.64%",
  },
  {
    daaScore: "349763440",
    block: "0.00306134",
    date: "25/06/2035",
    supply: "11,045",
    totalSupply: "441,989,825",
    percentage: "94.64%",
  },
  {
    daaScore: "352393240",
    block: "0.0029047",
    date: "25/07/2035",
    supply: "10,519",
    totalSupply: "442,000,344",
    percentage: "94.64%",
  },
  {
    daaScore: "355023040",
    block: "0.00275246",
    date: "25/08/2035",
    supply: "9,993",
    totalSupply: "442,010,337",
    percentage: "94.64%",
  },
  {
    daaScore: "357652840",
    block: "0.00260442",
    date: "24/09/2035",
    supply: "9,467",
    totalSupply: "442,019,804",
    percentage: "94.64%",
  },
  {
    daaScore: "360282640",
    block: "0.00246042",
    date: "25/10/2035",
    supply: "8,941",
    totalSupply: "442,028,746",
    percentage: "94.64%",
  },
  {
    daaScore: "362912440",
    block: "0.0023203",
    date: "24/11/2035",
    supply: "8,415",
    totalSupply: "442,037,161",
    percentage: "94.64%",
  },
  {
    daaScore: "365542240",
    block: "0.0021839",
    date: "24/12/2035",
    supply: "7,889",
    totalSupply: "442,045,050",
    percentage: "94.64%",
  },
  {
    daaScore: "368172040",
    block: "0.00205106",
    date: "24/01/2036",
    supply: "7,363",
    totalSupply: "442,052,414",
    percentage: "94.64%",
  },
  {
    daaScore: "370801840",
    block: "0.00192162",
    date: "23/02/2036",
    supply: "6,837",
    totalSupply: "442,059,251",
    percentage: "94.64%",
  },
  {
    daaScore: "373431640",
    block: "0.00184286",
    date: "25/03/2036",
    supply: "6,575",
    totalSupply: "442,065,826",
    percentage: "94.64%",
  },
  {
    daaScore: "376061440",
    block: "0.00176682",
    date: "24/04/2036",
    supply: "6,312",
    totalSupply: "442,072,137",
    percentage: "94.64%",
  },
  {
    daaScore: "378691240",
    block: "0.00169338",
    date: "24/05/2036",
    supply: "6,049",
    totalSupply: "442,078,186",
    percentage: "94.64%",
  },
  {
    daaScore: "381321040",
    block: "0.00162242",
    date: "24/06/2036",
    supply: "5,786",
    totalSupply: "442,083,971",
    percentage: "94.64%",
  },
  {
    daaScore: "383950840",
    block: "0.00155382",
    date: "24/07/2036",
    supply: "5,523",
    totalSupply: "442,089,494",
    percentage: "94.64%",
  },
  {
    daaScore: "386580640",
    block: "0.00148742",
    date: "24/08/2036",
    supply: "5,260",
    totalSupply: "442,094,754",
    percentage: "94.64%",
  },
  {
    daaScore: "389210440",
    block: "0.0014231",
    date: "23/09/2036",
    supply: "4,997",
    totalSupply: "442,099,750",
    percentage: "94.64%",
  },
  {
    daaScore: "391840240",
    block: "0.00136074",
    date: "23/10/2036",
    supply: "4,734",
    totalSupply: "442,104,484",
    percentage: "94.64%",
  },
  {
    daaScore: "394470040",
    block: "0.00129926",
    date: "23/11/2036",
    supply: "4,471",
    totalSupply: "442,108,955",
    percentage: "94.64%",
  },
]

export function HalvingSchedule() {
  // Helper function to calculate percentage
  const calculatePercentage = (totalSupply: string): string => {
    // Remove commas and convert to number
    const supplyValue = Number(totalSupply.replace(/,/g, ""))
    return ((supplyValue / 445000000) * 100).toFixed(2) + "%"
  }

  // Add this new function to apply the 2% reduction to block rewards
  const applyReduction = (
    blockReward: string | undefined,
    block: string | undefined,
    shouldReduce: boolean,
    index: number,
  ): string => {
    // Don't apply reduction to the first 14 entries (up to daaScore 36817240)
    if (index < 14) {
      return blockReward || block || ""
    }

    if (!shouldReduce) {
      return blockReward || block || ""
    }

    // Determine which value to use (blockReward or block)
    const value = blockReward || block || ""
    // Convert to number, reduce by 2%, and format back to string with the same precision
    const numValue = Number.parseFloat(value)
    const reducedValue = numValue * 0.98

    // Maintain the same number of decimal places as the original
    const decimalPlaces = value.includes(".") ? value.split(".")[1].length : 4
    return reducedValue.toFixed(decimalPlaces)
  }

  // Calculate DEV FEE (2% of block reward)
  // DEV FEE only starts from daaScore 18408640 (index 6)
  const calculateDevFee = (blockReward: string | undefined, block: string | undefined, index: number): string => {
    // DEV FEE only starts from daaScore 18408640 (index 6)
    if (index < 6) {
      return "-"
    }

    // Determine which value to use (blockReward or block)
    const value = blockReward || block || ""
    if (!value) return ""

    // Convert to number, calculate 2%, and format back to string with the same precision
    const numValue = Number.parseFloat(value)
    const devFee = numValue * 0.02

    // Special cases for specific daaScores
    if (halvingEvents[index].daaScore === "65745040" || halvingEvents[index].daaScore === "97302640") {
      return "0.04" // Force 0.04 for these specific cases
    }

    // Always use at least 2 decimal places for DEV FEE
    const decimalPlaces = Math.max(value.includes(".") ? value.split(".")[1].length : 0, 2)
    return devFee.toFixed(decimalPlaces)
  }

  return (
    <Card className="bg-black/50 border-primary">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
          <CalendarClock className="h-6 w-6" />
          HALVING RELEASE SCHEDULE
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-black/20">
            <table className="w-full">
              <thead className="sticky top-0 bg-black/80 z-10">
                <tr className="border-b border-primary/20">
                  <th className="text-left p-2 text-white">TO DAASOURCE</th>
                  <th className="text-left p-2 text-white">BLOCK REWARD</th>
                  <th className="text-left p-2 text-white">DEV FEE</th>
                  <th className="text-left p-2 text-white">DATE</th>
                  <th className="text-left p-2 text-white">SUPPLY</th>
                  <th className="text-left p-2 text-white">TOTAL SUPPLY</th>
                  <th className="text-left p-2 text-white">%</th>
                </tr>
              </thead>
              <tbody>
                {halvingEvents.map((event, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0, viewport: { once: true } }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.02, 1) }}
                    className="border-b border-primary/10"
                  >
                    <td className="p-2 text-white">{event.daaScore}</td>
                    <td className="p-2 text-white">
                      {applyReduction(
                        event.blockReward,
                        event.block,
                        index >= 14, // Apply reduction to index 14 and beyond (daaScore 36817240 and after)
                        index,
                      )}
                    </td>
                    <td className={`p-2 ${index >= 6 ? "text-primary" : "text-gray-500"}`}>
                      {calculateDevFee(event.blockReward, event.block, index)}
                    </td>
                    <td className="p-2 text-white">{event.date}</td>
                    <td className="p-2 text-white">{event.supply}</td>
                    <td className="p-2 text-white">{event.totalSupply}</td>
                    <td className="p-2 text-white">{event.percentage || calculatePercentage(event.totalSupply)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-sm text-white/70">
          KODA follows a gradual reduction schedule where block rewards decrease over time according to the DAA score.
          This creates a predictable issuance rate and gradually decreases inflation, potentially increasing scarcity
          and value. Percentages are calculated based on the maximum supply of 445 million KODA. DEV FEE was introduced
          starting from daaScore 18408640 (01/01/2025).
        </p>
      </CardContent>
    </Card>
  )
}
