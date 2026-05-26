import type { Lang } from "./types";

export const UI: Record<
  Lang,
  {
    work: string; about: string; contact: string; connect: string;
    hero: string; heroGreeting: string; tagline: string; viewWork: string; footer: string;
    loginTitle: string; username: string; password: string; loginBtn: string;
    cancel: string; logout: string; welcome: string; adminPanel: string;
    addProject: string; editProject: string; deleteConfirm: string; save: string;
    name: string; description: string; tech: string; techHint: string; link: string;
    projects: string; viewLive: string; noProjects: string; manageProjects: string;
    close: string; edit: string; delete: string; wrongCredentials: string;
    syncSettings: string; gistId: string; ghToken: string; syncNow: string;
    syncSuccess: string; syncError: string; syncHint: string;
    aboutMe: string;
    aboutP1: string; aboutP2: string; aboutP3: string; aboutP4: string;
    findMe: string; readMore: string;
  }
> = {
  en: {
    work: "Work", about: "About", contact: "Contact", connect: "Connect",
    hero: "howlyvine", heroGreeting: "Hi, I'm", tagline: "I build things on the internet. Passionate about developer experience, accessibility, and open source.",
    viewWork: "View My Work", footer: "© 2026 howlyvine",
    loginTitle: "Admin Login", username: "Username", password: "Password",
    loginBtn: "Login", cancel: "Cancel", logout: "Logout",
    welcome: "Welcome back,", adminPanel: "Admin Panel",
    addProject: "Add Project", editProject: "Edit Project",
    deleteConfirm: "Are you sure you want to delete this?", save: "Save",
    name: "Project Name", description: "Description",
    tech: "Tech Stack", techHint: "Comma-separated: React, TypeScript, Vite",
    link: "URL", projects: "Projects", viewLive: "View Live →",
    noProjects: "No projects yet. Add one from the admin panel.",
    manageProjects: "Manage Projects", close: "Close", edit: "Edit", delete: "Delete",
    wrongCredentials: "Wrong username or password.",
    syncSettings: "Sync Settings", gistId: "GitHub Gist ID",
    ghToken: "GitHub Token (admin only)", syncNow: "Sync to Gist",
    syncSuccess: "Synced successfully!", syncError: "Sync failed. Check your Gist ID and token.",
    syncHint: "Create a public Gist with a file named howlyvine-data.json, then paste the Gist ID here.",
    aboutMe: "about me",
    aboutP1: "I'm howlyvine a.k.a howly - a developer and designer from Pontianak. I build web projects and create visual things on the side. I love UI/UX and website designs that are simple, smooth, clean, and lightweight. Honestly, I'm a lover of all things free and easy to understand. I've been active in crypto since 2021, currently following and active in the Base and Solana ecosystems.",
    aboutP2: "So far I've built projects like an academic portal, a real-time classroom availability system, and a document management app for student letters. Small projects, but each one taught me something new.",
    aboutP3: "Besides coding, I also design posters, create content, and do a bit of video editing... mostly for fun haha, sometimes for others.",
    aboutP4: "I'm still learning, and honestly that's the part I enjoy most. There's always something new to discover — whether it's a cleaner way to write code, a better layout, or just understanding how something works under the hood.",
    findMe: "Find me on the internet.",
    readMore: "Read more",
  },
  id: {
    work: "Karya", about: "Tentang", contact: "Kontak", connect: "Masuk",
    hero: "howlyvine", heroGreeting: "Hei, aku", tagline: "Aku membangun hal-hal di internet. Tertarik pada developer experience, aksesibilitas, dan open source.",
    viewWork: "Lihat Karya", footer: "© 2026 howlyvine",
    loginTitle: "Login Admin", username: "Username", password: "Password",
    loginBtn: "Masuk", cancel: "Batal", logout: "Keluar",
    welcome: "Selamat datang,", adminPanel: "Panel Admin",
    addProject: "Tambah Proyek", editProject: "Edit Proyek",
    deleteConfirm: "Yakin ingin menghapus ini?", save: "Simpan",
    name: "Nama Proyek", description: "Deskripsi",
    tech: "Teknologi", techHint: "Dipisahkan koma: React, TypeScript, Vite",
    link: "URL", projects: "Proyek", viewLive: "Lihat Live →",
    noProjects: "Belum ada proyek. Tambahkan dari panel admin.",
    manageProjects: "Kelola Proyek", close: "Tutup", edit: "Edit", delete: "Hapus",
    wrongCredentials: "Username atau password salah.",
    syncSettings: "Pengaturan Sinkronisasi", gistId: "GitHub Gist ID",
    ghToken: "GitHub Token (khusus admin)", syncNow: "Sinkronkan ke Gist",
    syncSuccess: "Berhasil disinkronkan!", syncError: "Gagal sinkronisasi. Cek Gist ID dan token.",
    syncHint: "Buat public Gist dengan file bernama howlyvine-data.json, lalu tempel Gist ID di sini.",
    aboutMe: "tentang saya",
    aboutP1: "Saya howlyvine a.k.a howly, seorang pengembang dan desainer dari Pontianak. Saya membangun proyek web dan membuat hal-hal visual sebagai sampingan. Saya suka tampilan UI UX desain maupun website yang simple, smooth, bersih dan ringan. Jujur saja, aku adalah pecinta hal yang gratis dan mudah dipahami. Aku aktif di crypto juga sejak tahun 2021 — sekarang lagi mengikuti dan aktif di ekosistem Base dan Solana.",
    aboutP2: "Sejauh ini saya telah membangun beberapa projek seperti portal akademik, sistem ketersediaan ruang kelas secara real-time, dan aplikasi manajemen dokumen untuk surat-surat mahasiswa. Proyek-proyek kecil, tetapi masing-masing mengajarkan saya sesuatu yang baru.",
    aboutP3: "Selain coding, saya juga mendesain poster, membuat konten, dan sedikit mengedit video... sebagian besar untuk bersenang-senang haha, kadang-kadang untuk orang lain.",
    aboutP4: "Saya masih belajar, dan jujur saja, itulah bagian yang paling saya nikmati. Selalu ada hal baru untuk dipelajari, baik itu cara yang lebih bersih untuk menulis kode, tata letak yang lebih baik, atau hanya memahami bagaimana sesuatu bekerja di balik layar.",
    findMe: "Temukan saya di internet.",
    readMore: "Selengkapnya",
  },
};