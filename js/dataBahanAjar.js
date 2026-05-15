/**
 * dataBahanAjar.js
 * File ini berisi seluruh data dummy dan logika utama aplikasi menggunakan Vue.js.
 * Digunakan secara global di seluruh halaman Tugas 2.
 */

// 1. Data Pengguna kini dimuat secara terpisah dari js/data.js (Sesuai Struktur Tugas 1)


// 2. Inisialisasi Instance Vue Global
var app = new Vue({
  el: '#app', // Menghubungkan Vue ke elemen dengan ID 'app' di HTML
  data: {
    // Daftar Pilihan (untuk Dropdown)
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],
    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],
    pengirimanList: [
      { kode: "REG", nama: "Reguler (3-5 hari)" },
      { kode: "EXP", nama: "Ekspres (1-2 hari)" }
    ],
    // Data Paket Bahan Ajar
    paket: [
      { kode: "PAKET-UT-001", nama: "PAKET IPS Dasar", isi: ["EKMA4116", "EKMA4115"], harga: 120000 },
      { kode: "PAKET-UT-002", nama: "PAKET IPA Dasar", isi: ["BIOL4201", "FISIP4001"], harga: 140000 }
    ],
    // Data Stok Buku (Digunakan di stok.html)
    stok: [
      {
        kode: "EKMA4116",
        judul: "Pengantar Manajemen",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A3",
        harga: 65000,
        qty: 28,
        safety: 20,
        catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
      },
      {
        kode: "EKMA4115",
        judul: "Pengantar Akuntansi",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A4",
        harga: 60000,
        qty: 7,
        safety: 15,
        catatanHTML: "<strong>Cover baru</strong>"
      },
      {
        kode: "BIOL4201",
        judul: "Biologi Umum (Praktikum)",
        kategori: "Praktikum",
        upbjj: "Surabaya",
        lokasiRak: "R3-B2",
        harga: 80000,
        qty: 12,
        safety: 10,
        catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
      },
      {
        kode: "FISIP4001",
        judul: "Dasar-Dasar Sosiologi",
        kategori: "MK Pilihan",
        upbjj: "Makassar",
        lokasiRak: "R2-C1",
        harga: 55000,
        qty: 2,
        safety: 8,
        catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
      }
    ],
    // Data Pelacakan DO (Digunakan di tracking.html)
    tracking: {
      "DO2025-0001": {
        nomorDO: "DO2025-0001",
        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        paket: "PAKET-UT-001",
        total: 120000,
        perjalanan: [
          { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
          { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
          { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
        ]
      },
      "DO2025-0002": {
        nomorDO: "DO2025-0002",
        nim: "987654321",
        nama: "Budi Santoso",
        status: "Dikirim",
        ekspedisi: "Pos Indonesia",
        tanggalKirim: "2025-08-24",
        paket: "PAKET-UT-002",
        total: 140000,
        perjalanan: [
          { waktu: "2025-08-24 09:00:00", keterangan: "Penerimaan di Loket: JAKPUS" },
          { waktu: "2025-08-24 13:30:00", keterangan: "Tiba di Hub: JAKPUS" },
          { waktu: "2025-08-25 06:00:00", keterangan: "Diteruskan ke Kantor Tujuan" },
          { waktu: "2025-08-25 11:00:00", keterangan: "Tiba di Hub: Bandung" },
          { waktu: "2025-08-25 15:00:00", keterangan: "Proses antar ke Cimahi" },
          { waktu: "2025-08-26 09:30:00", keterangan: "Selesai Antar. Penerima: Budi Santoso" }
        ]
      }
    },
    // State Aplikasi (UI & Operasional)
    user: { nama: "User", role: "Guest", lokasi: "-" },
    isLaporanOpen: false, // Untuk toggle menu dropdown laporan
    filterUPBJJ: '',      // Penampung filter wilayah
    filterKategori: '',   // Penampung filter kategori
    filterStatus: '',     // Penampung filter status stok
    sortBy: 'judul',      // Default pengurutan
    searchQuery: '',      // Penampung teks pencarian
    showModal: false,     // Status tampilan modal edit stok
    selectedItem: {},     // Data item yang sedang dipilih untuk diedit
    editQty: 0,           // Penampung angka stok baru saat diedit
    showAddModal: false,  // Status modal tambah bahan ajar baru
    newItem: { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 10, catatanHTML: '' },
    newDO: { nim: '', nama: '', upbjj: '', ekspedisi: '', paket: '' }, // Data form DO baru
    showTrackingModal: false, // Status tampilan modal tracking
    activeTracking: {},    // Data DO yang sedang dilacak
    login: { email: '', password: '' }, // Data form login
    register: { name: '', email: '', password: '' }, // Data form register
    forgotEmail: '',      // Penampung email lupa password
    modal: null,          // Status modal mana yang aktif di login (forgot/register)
    toast: { show: false, message: '', isSuccess: false }, // Data untuk notifikasi pop-up
    // Data Histori Transaksi
    histori: [
      { id: "DO2025-0001", tanggal: "2025-08-25 10:12", jenis: "Pengiriman", item: "PAKET IPS Dasar", qty: 1, penerima: "Rina Wulandari", status: "Dalam Perjalanan", admin: "Admin SITTA" },
      { id: "DO2025-0002", tanggal: "2025-08-24 09:00", jenis: "Pengiriman", item: "PAKET IPA Dasar", qty: 1, penerima: "Budi Santoso", status: "Selesai", admin: "Admin SITTA" },
      { id: "STK-001", tanggal: "2025-08-23 14:20", jenis: "Update Stok", item: "EKMA4116", qty: 10, penerima: "-", status: "Masuk", admin: "Admin SITTA" },
      { id: "STK-002", tanggal: "2025-08-23 15:10", jenis: "Update Stok", item: "EKMA4115", qty: 5, penerima: "-", status: "Masuk", admin: "Siti Marlina" }
    ]
  },

  /**
   * Created Hook: Dijalankan saat Vue pertama kali dimuat.
   * Digunakan untuk mengecek sesi login (Session Management).
   */
  created() {
    const path = window.location.pathname;
    const page = path.split("/").pop(); // Mengambil nama file HTML yang sedang dibuka
    const loggedInUser = JSON.parse(localStorage.getItem('userLoggedIn'));

    // Jika belum login dan tidak sedang di halaman login, lempar ke index.html (Login)
    if (!loggedInUser && page !== 'index.html' && page !== '') {
      window.location.href = 'index.html';
    }
    // Jika sudah login, simpan data ke state 'user'
    else if (loggedInUser) {
      this.user = loggedInUser;
      // Jika sudah login tapi buka halaman login, lempar ke dashboard
      if (page === 'index.html') {
        window.location.href = 'dashboard.html';
      }
    }
  },

  /**
   * Computed Properties: Data yang dihitung secara otomatis berdasarkan perubahan data asli.
   */
  computed: {
    userFirstName() { return this.user.nama ? this.user.nama.split(' ')[0] : 'User'; },
    userAvatar() { return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.user.nama || 'User')}&background=16213E&color=fff`; },

    // Logika Sapaan berdasarkan waktu
    greetingText() {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 11) return 'Selamat Pagi';
      if (hour >= 11 && hour < 15) return 'Selamat Siang';
      if (hour >= 15 && hour < 18) return 'Selamat Sore';
      return 'Selamat Malam';
    },

    // Format tanggal hari ini
    currentDate() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return new Date().toLocaleDateString('id-ID', options);
    },

    // Menghitung total stok secara reaktif
    totalStok() {
      return this.stok.reduce((acc, item) => acc + item.qty, 0).toLocaleString('id-ID');
    },

    /**
     * Logic Filter & Sorting Stok (Digunakan di stok.html)
     */
    filteredStok() {
      let result = [...this.stok];
      // Pencarian berdasarkan Judul atau Kode
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(item => item.judul.toLowerCase().includes(query) || item.kode.toLowerCase().includes(query));
      }
      // Filter Wilayah
      if (this.filterUPBJJ) result = result.filter(item => item.upbjj === this.filterUPBJJ);
      // Filter Kategori
      if (this.filterKategori) result = result.filter(item => item.kategori === this.filterKategori);
      // Filter Status (Menggunakan method getStatusText)
      if (this.filterStatus) result = result.filter(item => this.getStatusText(item) === this.filterStatus);

      // Pengurutan (Sorting)
      result.sort((a, b) => {
        if (this.sortBy === 'judul') return a.judul.localeCompare(b.judul);
        if (this.sortBy === 'qty') return b.qty - a.qty;
        if (this.sortBy === 'harga') return b.harga - a.harga;
        return 0;
      });
      return result;
    },

    // Mengubah object tracking menjadi array untuk v-for
    trackingList() { return Object.values(this.tracking); },

    // Logika Dropdown Dependen: Pilihan ekspedisi berdasarkan wilayah
    availableExpeditions() {
      if (!this.newDO.upbjj) return [];
      if (['Jakarta', 'Surabaya'].includes(this.newDO.upbjj)) {
        return ['JNE Regular', 'JNE Express', 'TIKI Regular', 'Pos Indonesia'];
      } else {
        return ['JNE Regular', 'Pos Indonesia'];
      }
    }
  },

  /**
   * Methods: Kumpulan fungsi yang dijalankan melalui event (klik, submit, dsb).
   */
  methods: {
    // Menampilkan notifikasi Toast
    showToast(message, isSuccess = false) {
      this.toast = { show: true, message, isSuccess };
      setTimeout(() => { this.toast.show = false; }, 3000);
    },

    // Logika Proses Login
    handleLogin() {
      if (!this.login.email || !this.login.password) {
        this.showToast("password atau user harus di isi");
        return;
      }
      const foundUser = dataPengguna.find(u => u.email === this.login.email && u.password === this.login.password);
      if (foundUser) {
        localStorage.setItem('userLoggedIn', JSON.stringify(foundUser)); // Simpan sesi
        this.showToast("Login Berhasil! Mengalihkan...", true);
        setTimeout(() => { window.location.href = 'dashboard.html'; }, 1500);
      } else {
        this.showToast("password atau user salah");
      }
    },

    // Navigasi Modal
    openModal(type) { this.modal = type; },

    // Submit Lupa Password (Dummy)
    submitForgot() {
      if (!this.forgotEmail) { this.showToast("Harap isi email!"); return; }
      this.showToast("Tautan reset password telah dikirim!", true);
      this.modal = null;
    },

    // Submit Register (Dummy)
    submitRegister() {
      if (!this.register.name || !this.register.email || !this.register.password) {
        this.showToast("Semua field harus diisi!"); return;
      }
      this.showToast("Pendaftaran berhasil!", true);
      this.modal = null;
    },

    // Menentukan teks status berdasarkan qty stok
    getStatusText(item) {
      if (item.qty <= 0) return 'Out of Stock';
      if (item.qty <= item.safety) return 'Low Stock';
      return 'In Stock';
    },

    // Menentukan class CSS badge berdasarkan status
    getStatusClass(item) {
      if (item.qty <= 0) return 'badge-danger';
      if (item.qty <= item.safety) return 'badge-warning';
      return 'badge-success';
    },

    // Mencari nama paket berdasarkan kodenya
    getPackageName(code) {
      const p = this.paket.find(pkg => pkg.kode === code);
      return p ? p.nama : code;
    },

    // Membuka modal edit stok
    editStok(item) {
      this.selectedItem = item;
      this.editQty = item.qty;
      this.showModal = true;
    },

    // Menyimpan perubahan stok
    saveStok() {
      this.selectedItem.qty = this.editQty;
      this.showModal = false;
      this.showToast('Stok berhasil diperbarui!', true);
    },

    // Menambah Bahan Ajar Baru
    addNewStok() {
      if (!this.newItem.kode || !this.newItem.judul) {
        this.showToast("Kode dan Judul harus diisi!");
        return;
      }
      this.stok.push({ ...this.newItem });
      this.showAddModal = false;
      this.showToast("Bahan ajar baru berhasil ditambahkan!", true);
      this.newItem = { kode: '', judul: '', kategori: '', upbjj: '', lokasiRak: '', harga: 0, qty: 0, safety: 10, catatanHTML: '' };
    },

    // Menghapus Bahan Ajar
    deleteStok(index) {
      if (confirm("Apakah Anda yakin ingin menghapus bahan ajar ini?")) {
        // Karena data yang ditampilkan bisa saja hasil filter/sort, kita cari index aslinya
        const itemToDelete = this.filteredStok[index];
        const originalIndex = this.stok.findIndex(s => s.kode === itemToDelete.kode);
        if (originalIndex !== -1) {
          this.stok.splice(originalIndex, 1);
          this.showToast("Bahan ajar berhasil dihapus!", true);
        }
      }
    },

    // Menambah Delivery Order Baru
    addDO() {
      const nextId = this.trackingList.length + 1;
      const id = `DO2025-${String(nextId).padStart(4, '0')}`;
      const newEntry = {
        nomorDO: id, nim: this.newDO.nim, nama: this.newDO.nama, status: 'Diproses',
        ekspedisi: this.newDO.ekspedisi, tanggalKirim: new Date().toISOString().split('T')[0],
        paket: this.newDO.paket, total: this.paket.find(p => p.kode === this.newDO.paket).harga,
        perjalanan: [{ waktu: new Date().toLocaleString(), keterangan: "Input Data Berhasil" }]
      };
      // Menggunakan Vue.set agar perubahan pada object terdeteksi secara reaktif
      Vue.set(this.tracking, id, newEntry);
      this.showToast('Delivery Order Berhasil Ditambahkan!', true);
      this.newDO = { nim: '', nama: '', upbjj: '', ekspedisi: '', paket: '' }; // Reset form
    },

    // Membuka modal tracking
    viewTracking(doItem) {
      this.activeTracking = doItem;
      this.showTrackingModal = true;
    },

    // Logout: Menghapus sesi dan kembali ke login
    logout() {
      localStorage.removeItem('userLoggedIn');
      window.location.href = 'index.html';
    }
  }
});


