   type Answer = {
       text: string;
       isCorrect: boolean;
   };
   
   type Question = {
       q: string;
       answers: Answer[];
   };
   export const questions: Question[] = [
    {
        "q": "מהי הבירה של יפן?",
        "answers": [
            { "text": "טוקיו", "isCorrect": true },
            { "text": "בייג'ינג", "isCorrect": false },
            { "text": "סיאול", "isCorrect": false },
            { "text": "בנגקוק", "isCorrect": false }
        ]
    },
    {
        "q": "כמה ימים יש בשנה?",
        "answers": [
            { "text": "365", "isCorrect": true },
            { "text": "360", "isCorrect": false },
            { "text": "366", "isCorrect": false },
            { "text": "354", "isCorrect": false }
        ]
    },
    {
        "q": "מי צייר את המונה ליזה?",
        "answers": [
            { "text": "לאונרדו דה וינצ'י", "isCorrect": true },
            { "text": "וינסנט ואן גוך", "isCorrect": false },
            { "text": "פבלו פיקאסו", "isCorrect": false },
            { "text": "מיכלאנג'לו", "isCorrect": false }
        ]
    },
    {
        "q": "מהו הגז הנפוץ ביותר באוויר כדור הארץ?",
        "answers": [
            { "text": "חמצן", "isCorrect": false },
            { "text": "פחמן דו-חמצני", "isCorrect": false },
            { "text": "חנקן", "isCorrect": true },
            { "text": "ארגון", "isCorrect": false }
        ]
    },
    {
        "q": "כמה אוקיינוסים יש בעולם?",
        "answers": [
            { "text": "5", "isCorrect": true },
            { "text": "4", "isCorrect": false },
            { "text": "6", "isCorrect": false },
            { "text": "7", "isCorrect": false }
        ]
    },
    {
        "q": "מהי החיה המהירה ביותר על פני כדור הארץ?",
        "answers": [
            { "text": "צ'יטה", "isCorrect": true },
            { "text": "אריה", "isCorrect": false },
            { "text": "בז", "isCorrect": false },
            { "text": "סוס", "isCorrect": false }
        ]
    },
    {
        "q": "איזה כוכב לכת הוא הגדול ביותר במערכת השמש?",
        "answers": [
            { "text": "מאדים", "isCorrect": false },
            { "text": "צדק", "isCorrect": true },
            { "text": "שבתאי", "isCorrect": false },
            { "text": "אורנוס", "isCorrect": false }
        ]
    },
    {
        "q": "מי כתב את 'המלט'?",
        "answers": [
            { "text": "ויליאם שייקספיר", "isCorrect": true },
            { "text": "צ'ארלס דיקנס", "isCorrect": false },
            { "text": "ג'יין אוסטן", "isCorrect": false },
            { "text": "ג'ורג' אורוול", "isCorrect": false }
        ]
    },
    {
        "q": "מהו החלק הקשה ביותר בגוף האדם?",
        "answers": [
            { "text": "עצם הירך", "isCorrect": false },
            { "text": "שן", "isCorrect": false },
            { "text": "אמייל השן", "isCorrect": true },
            { "text": "גולגולת", "isCorrect": false }
        ]
    },
    {
        "q": "באיזו מדינה נמצאת הפירמידה הגדולה של גיזה?",
        "answers": [
            { "text": "יוון", "isCorrect": false },
            { "text": "מצרים", "isCorrect": true },
            { "text": "עיראק", "isCorrect": false },
            { "text": "סין", "isCorrect": false }
        ]
    },
    {
        "q": "מהי העיר המאוכלסת ביותר בעולם?",
        "answers": [
            { "text": "דלהי", "isCorrect": false },
            { "text": "שנחאי", "isCorrect": false },
            { "text": "טוקיו", "isCorrect": true },
            { "text": "מקסיקו סיטי", "isCorrect": false }
        ]
    },
    {
        "q": "איזה כוח גורם לדברים ליפול?",
        "answers": [
            { "text": "כוח משיכה", "isCorrect": true },
            { "text": "כוח מגנטי", "isCorrect": false },
            { "text": "כוח צנטריפוגלי", "isCorrect": false },
            { "text": "כוח חשמלי", "isCorrect": false }
        ]
    },
    {
        "q": "מהו הנהר הארוך ביותר בעולם?",
        "answers": [
            { "text": "יאנגצה", "isCorrect": false },
            { "text": "הנילוס", "isCorrect": true },
            { "text": "האמזונס", "isCorrect": false },
            { "text": "המיסיסיפי", "isCorrect": false }
        ]
    },
    {
        "q": "באיזו שנה התרחשה המהפכה הצרפתית?",
        "answers": [
            { "text": "1776", "isCorrect": false },
            { "text": "1789", "isCorrect": true },
            { "text": "1812", "isCorrect": false },
            { "text": "1917", "isCorrect": false }
        ]
    },
    {
        "q": "איזה כוכב לכת הוא 'כוכב הלכת האדום'?",
        "answers": [
            { "text": "מאדים", "isCorrect": true },
            { "text": "צדק", "isCorrect": false },
            { "text": "נוגה", "isCorrect": false },
            { "text": "כדור הארץ", "isCorrect": false }
        ]
    },
    {
        "q": "מהי יחידת המדידה של התנגדות חשמלית?",
        "answers": [
            { "text": "וולט", "isCorrect": false },
            { "text": "אמפר", "isCorrect": false },
            { "text": "אוהם", "isCorrect": true },
            { "text": "ואט", "isCorrect": false }
        ]
    },
    {
        "q": "איזה איבר בגוף האדם מפיק אינסולין?",
        "answers": [
            { "text": "הקיבה", "isCorrect": false },
            { "text": "הכבד", "isCorrect": false },
            { "text": "הלבלב", "isCorrect": true },
            { "text": "הכליות", "isCorrect": false }
        ]
    },
    {
        "q": "כמה קארט הוא זהב טהור?",
        "answers": [
            { "text": "14", "isCorrect": false },
            { "text": "18", "isCorrect": false },
            { "text": "22", "isCorrect": false },
            { "text": "24", "isCorrect": true }
        ]
    },
    {
        "q": "מהו ההר הגבוה ביותר בעולם?",
        "answers": [
            { "text": "הר קילימנג'רו", "isCorrect": false },
            { "text": "הר האוורסט", "isCorrect": true },
            { "text": "הר מקינלי (דנאלי)", "isCorrect": false },
            { "text": "הר אלברוס", "isCorrect": false }
        ]
    },
    {
        "q": "מי חיבר את היצירה 'סימפוניה מס' 5'?",
        "answers": [
            { "text": "מוצרט", "isCorrect": false },
            { "text": "בטהובן", "isCorrect": true },
            { "text": "באך", "isCorrect": false },
            { "text": "שופן", "isCorrect": false }
        ]
    },
    {
        "q": "מהי ציפור הלאום של ארה\"ב?",
        "answers": [
            { "text": "הבז", "isCorrect": false },
            { "text": "הנשר", "isCorrect": true },
            { "text": "הינשוף", "isCorrect": false },
            { "text": "היונה", "isCorrect": false }
        ]
    },
    {
        "q": "באיזו מדינה נמצאת חומת סין הגדולה?",
        "answers": [
            { "text": "יפן", "isCorrect": false },
            { "text": "סין", "isCorrect": true },
            { "text": "הודו", "isCorrect": false },
            { "text": "תאילנד", "isCorrect": false }
        ]
    },
    {
        "q": "מהו הים הגדול ביותר בעולם?",
        "answers": [
            { "text": "הים התיכון", "isCorrect": false },
            { "text": "הים השחור", "isCorrect": false },
            { "text": "ים סוף", "isCorrect": false },
            { "text": "ים הקריביים", "isCorrect": true }
        ]
    },
    {
        "q": "מי גילה את הפניצילין?",
        "answers": [
            { "text": "לואי פסטר", "isCorrect": false },
            { "text": "אלכסנדר פלמינג", "isCorrect": true },
            { "text": "רוברט קוך", "isCorrect": false },
            { "text": "מארי קירי", "isCorrect": false }
        ]
    },
    {
        "q": "איזה חומר הוא הקשה ביותר בטבע?",
        "answers": [
            { "text": "פלדה", "isCorrect": false },
            { "text": "יהלום", "isCorrect": true },
            { "text": "גרניט", "isCorrect": false },
            { "text": "קוורץ", "isCorrect": false }
        ]
    },
    {
        "q": "מהי בירת אוסטרליה?",
        "answers": [
            { "text": "סידני", "isCorrect": false },
            { "text": "מלבורן", "isCorrect": false },
            { "text": "קנברה", "isCorrect": true },
            { "text": "בריסביין", "isCorrect": false }
        ]
    },
    {
        "q": "כמה כוכבים יש בדגל ארה\"ב?",
        "answers": [
            { "text": "50", "isCorrect": true },
            { "text": "13", "isCorrect": false },
            { "text": "52", "isCorrect": false },
            { "text": "48", "isCorrect": false }
        ]
    },
    {
        "q": "מי המציא את הנורה?",
        "answers": [
            { "text": "ניקולה טסלה", "isCorrect": false },
            { "text": "אלכסנדר גרהם בל", "isCorrect": false },
            { "text": "תומאס אדיסון", "isCorrect": true },
            { "text": "אלברט איינשטיין", "isCorrect": false }
        ]
    },
    {
        "q": "מהו האוקיינוס הגדול ביותר בעולם?",
        "answers": [
            { "text": "האוקיינוס ההודי", "isCorrect": false },
            { "text": "האוקיינוס האטלנטי", "isCorrect": false },
            { "text": "האוקיינוס השקט", "isCorrect": true },
            { "text": "האוקיינוס הארקטי", "isCorrect": false }
        ]
    },
    {
        "q": "איזה איבר בגוף האדם מזרים דם?",
        "answers": [
            { "text": "ריאה", "isCorrect": false },
            { "text": "כבד", "isCorrect": false },
            { "text": "לב", "isCorrect": true },
            { "text": "כליה", "isCorrect": false }
        ]
    },
    {
        "q": "מהו המספר הרומי עבור 50?",
        "answers": [
            { "text": "X", "isCorrect": false },
            { "text": "L", "isCorrect": true },
            { "text": "C", "isCorrect": false },
            { "text": "M", "isCorrect": false }
        ]
    },
    {
        "q": "מי כתב את הספר 'הארי פוטר'?",
        "answers": [
            { "text": "ג'יי.אר.אר טולקין", "isCorrect": false },
            { "text": "ג'יי.קיי רולינג", "isCorrect": true },
            { "text": "סי.אס לואיס", "isCorrect": false },
            { "text": "ג'ורג' ר.ר מרטין", "isCorrect": false }
        ]
    },
    {
        "q": "מהי בירת מצרים?",
        "answers": [
            { "text": "קהיר", "isCorrect": true },
            { "text": "אלכסנדריה", "isCorrect": false },
            { "text": "לוקסור", "isCorrect": false },
            { "text": "עמאן", "isCorrect": false }
        ]
    },
    {
        "q": "כמה צלעות יש למשושה?",
        "answers": [
            { "text": "5", "isCorrect": false },
            { "text": "6", "isCorrect": true },
            { "text": "7", "isCorrect": false },
            { "text": "8", "isCorrect": false }
        ]
    },
    {
        "q": "מהו המאכל הלאומי של איטליה?",
        "answers": [
            { "text": "פיצה", "isCorrect": false },
            { "text": "פסטה", "isCorrect": false },
            { "text": "שניהם נכונים", "isCorrect": true },
            { "text": "לזניה", "isCorrect": false }
        ]
    },
    {
        "q": "מהו הירח הגדול ביותר של שבתאי?",
        "answers": [
            { "text": "טריטון", "isCorrect": false },
            { "text": "טיטאן", "isCorrect": true },
            { "text": "גנימד", "isCorrect": false },
            { "text": "אירופה", "isCorrect": false }
        ]
    },
    {
        "q": "מהו היסוד הכימי בעל הסמל 'H'?",
        "answers": [
            { "text": "הליום", "isCorrect": false },
            { "text": "מימן", "isCorrect": true },
            { "text": "הידרוגן", "isCorrect": false },
            { "text": "ברזל", "isCorrect": false }
        ]
    },
    {
        "q": "באיזו עיר נמצא פסל החירות?",
        "answers": [
            { "text": "לוס אנג'לס", "isCorrect": false },
            { "text": "וושינגטון", "isCorrect": false },
            { "text": "ניו יורק", "isCorrect": true },
            { "text": "שיקגו", "isCorrect": false }
        ]
    },
    {
        "q": "כמה רגליים יש לעכביש?",
        "answers": [
            { "text": "6", "isCorrect": false },
            { "text": "8", "isCorrect": true },
            { "text": "10", "isCorrect": false },
            { "text": "4", "isCorrect": false }
        ]
    },
    {
        "q": "מהו הכלי הנגינה הגדול ביותר ממשפחת כלי המיתר?",
        "answers": [
            { "text": "צ'לו", "isCorrect": false },
            { "text": "כינור", "isCorrect": false },
            { "text": "ויולה", "isCorrect": false },
            { "text": "קונטרבס", "isCorrect": true }
        ]
    },
    {
        "q": "מהו הים הגדול ביותר ללא מוצא לאוקיינוס?",
        "answers": [
            { "text": "הים הכספי", "isCorrect": true },
            { "text": "הים השחור", "isCorrect": false },
            { "text": "הים הארל", "isCorrect": false },
            { "text": "הים התיכון", "isCorrect": false }
        ]
    },
    {
        "q": "מהו שם הדמות הראשית בספר '1984'?",
        "answers": [
            { "text": "ווינסטון סמית'", "isCorrect": true },
            { "text": "ג'ורג' אורוול", "isCorrect": false },
            { "text": "ביג ברודר", "isCorrect": false },
            { "text": "עמנואל גולדשטיין", "isCorrect": false }
        ]
    },
    {
        "q": "כמה מדינות יש בארה\"ב?",
        "answers": [
            { "text": "48", "isCorrect": false },
            { "text": "50", "isCorrect": true },
            { "text": "51", "isCorrect": false },
            { "text": "52", "isCorrect": false }
        ]
    },
    {
        "q": "מהו חומר הזיכרון במחשבים?",
        "answers": [
            { "text": "מעבד", "isCorrect": false },
            { "text": "זיכרון RAM", "isCorrect": true },
            { "text": "דיסק קשיח", "isCorrect": false },
            { "text": "כרטיס מסך", "isCorrect": false }
        ]
    },
    {
        "q": "איזה בעל חיים מכונה 'מלך החיות'?",
        "answers": [
            { "text": "נמר", "isCorrect": false },
            { "text": "טיגריס", "isCorrect": false },
            { "text": "אריה", "isCorrect": true },
            { "text": "פיל", "isCorrect": false }
        ]
    },
    {
        "q": "מהי בירת אוסטרליה?",
        "answers": [
            { "text": "מלבורן", "isCorrect": false },
            { "text": "סידני", "isCorrect": false },
            { "text": "קנברה", "isCorrect": true },
            { "text": "בריסביין", "isCorrect": false }
        ]
    },
    {
        "q": "מהו המטבע הלאומי של יפן?",
        "answers": [
            { "text": "יין", "isCorrect": true },
            { "text": "וואן", "isCorrect": false },
            { "text": "יואן", "isCorrect": false },
            { "text": "דונג", "isCorrect": false }
        ]
    },
    {
        "q": "מי הוא המייסד של חברת אפל?",
        "answers": [
            { "text": "ביל גייטס", "isCorrect": false },
            { "text": "סטיב ג'ובס", "isCorrect": true },
            { "text": "מארק צוקרברג", "isCorrect": false },
            { "text": "ג'ף בזוס", "isCorrect": false }
        ]
    },
    {
        "q": "מהו השם הנכון של גז ה'צחוק'?",
        "answers": [
            { "text": "חנקן דו-חמצני", "isCorrect": false },
            { "text": "חד-תחמוצת החנקן", "isCorrect": false },
            { "text": "פחמן חד-חמצני", "isCorrect": false },
            { "text": "תחמוצת חנקן", "isCorrect": true }
        ]
    },
    {
        "q": "מהי עיר הבירה של ארגנטינה?",
        "answers": [
            { "text": "בואנוס איירס", "isCorrect": true },
            { "text": "ריו דה ז'ניירו", "isCorrect": false },
            { "text": "סנטיאגו", "isCorrect": false },
            { "text": "לימה", "isCorrect": false }
        ]
    }
]