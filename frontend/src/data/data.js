const work_datas = new Map([
    [1, { img: "istanbul.jpg", title: "Teknofest İstanbul", description: "Ayakları yere basmayan festival kapsamında yüz binlerce başvuru arasından öne çıkarak projelerini sergilemeye hak kazanan ve adını bir çok kesime duyuran Mersin UTİYO proje takımıma teşekkür ederim.", skills: ["React", "JavaScript","R"], date: "10.01.2023", links: { instagram: "K", github: "K", linkedin: "K" }, likeSum: 14 }],
    [2, { img: "antalya.jpg", title: "Teknofest Antalya", description: "Ayakları yere basmayan festival kapsamında yüz binlerce başvuru arasından öne çıkarak projelerini sergiledik.", skills: ["React", "JavaScript", "Node.js"], date: "20.10.2024", links: { instagram: "K", github: "K", linkedin: "K" }, likeSum: 2 }],
    [3, { img: "adana.jpg", title: "Teknofest Adana", description: "Ayakları yere basmayan festival kapsamında yüz binlerce başvuru arasından öne çıkarak projelerini sergilemeye hak kazanan takımıma teşekkür ederim eşekkür ederim eşekkür ederimeşekkür ederim eşekkür ederim eşekkür ederim eşekkür ederim eşekkür ederim.", skills: ["React", "JavaScript", "Node.js"], date: "20.11.2024", links: { instagram: "K", linkedin: "K" }, likeSum: 5 }],
    [4, { img: "istanbul.jpg", title: "Teknofest İstanbul", description: "Ayakları yere basmayan festival kapsamında yüz binlerce başvuru arasından öne çıkarak projelerini sergilemeye hak kazanan ve adını bir çok kesime duyuran Mersin UTİYO proje takımıma teşekkür ederim.", skills: ["React", "JavaScript", "Node.js"], date: "10.01.2023", links: { instagram: "K", github: "K", linkedin: "K" }, likeSum: 14 }],
    [5, { img: "antalya.jpg", title: "Teknofest Antalya", description: "Ayakları yere basmayan festival kapsamında yüz binlerce başvuru arasından öne çıkarak projelerini sergiledik.", skills: ["React", "JavaScript", "Python"], date: "20.10.2024", links: { instagram: "K", github: "K", linkedin: "K" }, likeSum: 2 }],
    [6, { img: "adana.jpg", title: "Teknofest Adana", description: "Ayakları yere basmayan festival kapsamında yüz binlerce başvuru arasından öne çıkarak projelerini sergilemeye hak kazanan takımıma teşekkür ederim eşekkür ederim eşekkür ederimeşekkür ederim eşekkür ederim eşekkür ederim eşekkür ederim eşekkür ederim.", skills: ["React", "JavaScript", "Node.js"], date: "20.11.2024", links: { instagram: "K", linkedin: "K" }, likeSum: 5 }],
]);

const blog_datas = new Map([
    [1, { title: "Modern Web Geliştirme Trendleri", content: "2026 yılında web geliştirme dünyasında öne çıkan teknolojiler ve yaklaşımlar üzerine bir inceleme.", date: "10 Mart 2026" }],
    [2, { title: "Neden Yazılım Mühendisliği?", content: "Yazılım mühendisleri için yurt dışında ve içinde yüksek iş talebi ve fırsatları bulunmaktadır. Yaratıcılık ve problem çözme yeteneklerinin etkin ve sürekli kullanıldığı bir meslek dalıdır. Serbest çalışma (Freelance) olanağı sunabilir. Takım çalışmalarında aktif yer almaya ve bir iş ağı oluşturmaya uygundur. Yazılım mühendisleri için yurt dışında ve içinde yüksek iş talebi ve fırsatları bulunmaktadır. Yaratıcılık ve problem çözme yeteneklerinin etkin ve sürekli kullanıldığı bir meslek dalıdır. Serbest çalışma (Freelance) olanağı sunabilir. Takım çalışmalarında aktif yer almaya ve bir iş ağı oluşturmaya uygundur.", date: "15 Nisan 2026" }],
]);

const skill_datas = new Map([
    [1, { img: "html.png", title: "HTML" }],
    [2, { img: "css.png", title: "CSS" }],
    [3, { img: "js.png", title: "JavaScript" }],
    [4, { img: "react.png", title: "React" }],
    [5, { img: "nodejs.png", title: "Node.js" }],
    [6,{ img: "python.png", title: "Python" }],
    [7, { img: "cs.png", title: "C#" }],
    [8, { img: "figma.png", title: "Figma" }],
    [9, { img: "sql.png", title: "SQL" }],
    [10, { img: "mongodb.png", title: "MongoDB" }],
    [11, { img: "java.png", title: "Java" }],
    [12, { img: "spring-boot.png", title: "Spring Boot" }],
    [13, { img: "dart.png", title: "Dart" }],
    [14, { img: "flutter.png", title: "Flutter" }],
    [15, { img: "git.png", title: "Git" }],
]);

const education_datas = new Map([
    [1, { year: "2024-2026", title: "İstanbul Üniversitesi", section: "Bilgisayar Programcılığı" }],
    [2, { year: "2022-2026", title: "Mersin Üniversitesi", section: "Bilişim Sistemleri ve Teknolojileri" }],
    [3, { year: "2018-2022", title: "Osmancık/Çorum", section: "Anadolu Lisesi" }],
]);



export { work_datas, blog_datas, skill_datas, education_datas };
