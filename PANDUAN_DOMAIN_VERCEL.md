# Panduan Setup Domain Vercel - Bahasa Indonesia

## **Cara Akses Dashboard Vercel**

---

## **Langkah 1: Login ke Vercel**

### **URL Dashboard:**
```
https://vercel.com/dashboard
```

### **Cara Login:**
- **Email**: Gunakan email yang terdaftar
- **GitHub**: Login lewat akun GitHub
- **GitLab**: Login lewat akun GitLab
- **Bitbucket**: Login lewat akun Bitbucket

---

## **Langkah 2: Masuk ke Project**

### **Cara Akses Project Settings:**

#### **Opsi 1: Dari Dashboard**
1. **Buka** `https://vercel.com/dashboard`
2. **Scroll** ke bawah ke "Your Projects"
3. **Klik** pada project `gold-grace-web`
4. **Klik** tab "Settings"

#### **Opsi 2: URL Langsung**
```
https://vercel.com/elfaruqihaikal-5159s-projects/gold-grace-web/settings
```

#### **Opsi 3: Dari Recent Projects**
1. **Buka** `https://vercel.com/dashboard`
2. **Klik** "View All Projects"
3. **Cari** "gold-grace-web"
4. **Klik** nama project
5. **Klik** tab "Settings"

---

## **Langkah 3: Tambah Custom Domain**

### **Navigasi ke Domain Settings:**

#### **Via Settings Menu:**
1. **Klik** tab "Settings" di project
2. **Scroll** ke section "Domains"
3. **Klik** "Add" atau "Add Custom Domain"

#### **URL Langsung Domain:**
```
https://vercel.com/elfaruqihaikal-5159s-projects/gold-grace-web/settings/domains
```

---

## **Langkah 4: Konfigurasi Domain**

### **Tambah Domain Utama:**
1. **Input** nama domain: `domain-baru-anda.com`
2. **Klik** "Add"
3. **Tunggu** Vercel generate DNS records
4. **Copy** DNS records yang diberikan

### **Tambah Subdomain WWW:**
1. **Klik** "Add" lagi
2. **Input**: `www.domain-baru-anda.com`
3. **Klik** "Add"
4. **Tunggu** DNS records generation

---

## **Langkah 5: Konfigurasi DNS**

### **DNS Records dari Vercel:**
```
A Records:
- Type: A
- Name: @
- Value: 76.76.21.21
- TTL: 300

- Type: A  
- Name: @
- Value: 76.76.19.61
- TTL: 300

CNAME Record:
- Type: CNAME
- Name: www
- Value: cname.vercel-dns.com
- TTL: 300
```

---

## **Langkah 6: Setup di Domain Registrar**

### **Setup GoDaddy:**
1. **Login** ke GoDaddy
2. **Pergi ke** "DNS Management"
3. **Hapus** A records yang lama (jika ada)
4. **Tambah** A records dari Vercel
5. **Tambah** CNAME record untuk www
6. **Simpan** perubahan

### **Setup Namecheap:**
1. **Login** ke Namecheap
2. **Pergi ke** "Domain List" > "Manage"
3. **Pergi ke** "Advanced DNS"
4. **Tambah** A records dan CNAME
5. **Simpan** perubahan

### **Setup Cloudflare:**
1. **Login** ke Cloudflare
2. **Pilih** domain
3. **Pergi ke** section "DNS"
4. **Tambah** A records (proxy disabled)
5. **Tambah** CNAME record
6. **Simpan** perubahan

---

## **Langkah 7: Verifikasi**

### **Cek Status Domain:**
1. **Kembali** ke Vercel dashboard
2. **Refresh** halaman domain
3. **Tunggu** DNS propagation (5-30 menit)
4. **Verifikasi** status domain "Verified"

### **SSL Certificate:**
1. **Cek** status SSL di Vercel
2. **Tunggu** certificate issuance (1-5 menit)
3. **Verifikasi** HTTPS working

---

## **Langkah 8: Test Website**

### **Test Aksesibilitas:**
```bash
# Test HTTP
curl -I http://domain-baru-anda.com

# Test HTTPS  
curl -I https://domain-baru-anda.com

# Test redirect
curl -L -I http://domain-baru-anda.com
```

### **Test di Browser:**
1. **Buka** `https://domain-baru-anda.com`
2. **Verifikasi** website loading
3. **Cek** SSL certificate (icon gembok)
4. **Test** semua halaman

---

## **Troubleshooting**

### **Masalah Umum:**

#### **DNS Propagation Delay:**
- **Masalah**: Domain tidak resolve
- **Solusi**: Tunggu 24-48 jam
- **Cek**: `dnschecker.org`

#### **SSL Certificate Error:**
- **Masalah**: SSL tidak terbit
- **Solusi**: Cek konfigurasi DNS
- **Action**: Verifikasi A records pointing ke Vercel

#### **Redirect Loop:**
- **Masalah**: Infinite redirects
- **Solusi**: Cek konfigurasi redirect
- **Action**: Hapus conflicting redirects

#### **Mixed Content Error:**
- **Masalah**: HTTP resources di HTTPS page
- **Solusi**: Update resource URLs ke HTTPS
- **Action**: Cek browser console

---

## **Alternative CLI**

### **Install Vercel CLI:**
```bash
# Install globally
npm i -g vercel

# Install locally
npm i vercel
```

### **Login via CLI:**
```bash
vercel login
```

### **Tambah Domain via CLI:**
```bash
# Tambah domain utama
vercel domains add domain-baru-anda.com

# Tambah subdomain www
vercel domains add www.domain-baru-anda.com

# List domains
vercel domains ls

# Hapus domain
vercel domains rm domain-baru-anda.com
```

---

## **URL Project Spesifik**

### **Akses Langsung:**
- **Dashboard**: `https://vercel.com/dashboard`
- **Project**: `https://vercel.com/elfaruqihaikal-5159s-projects/gold-grace-web`
- **Settings**: `https://vercel.com/elfaruqihaikal-5159s-projects/gold-grace-web/settings`
- **Domains**: `https://vercel.com/elfaruqihaikal-5159s-projects/gold-grace-web/settings/domains`

### **Info Project Saat Ini:**
- **Nama Project**: gold-grace-web
- **Owner**: elfaruqihaikal-5159s-projects
- **URL Saat Ini**: https://gold-grace-web.vercel.app
- **Status**: Active dan deployed

---

## **Quick Reference**

### **Ringkasan Step-by-Step:**
1. **Login**: `https://vercel.com/dashboard`
2. **Pilih Project**: `gold-grace-web`
3. **Settings**: Klik tab "Settings"
4. **Domains**: Klik section "Domains"
5. **Add Domain**: Input nama domain
6. **Configure DNS**: Copy records ke registrar
7. **Verify**: Tunggu propagation
8. **Test**: Buka website di domain baru

### **Path Navigasi:**
```
Dashboard 
  > Projects 
    > gold-grace-web 
      > Settings 
        > Domains 
          > Add Custom Domain
```

---

## **Support**

### **Dokumentasi Vercel:**
- **Domain Setup**: `https://vercel.com/docs/concepts/projects/domains`
- **DNS Configuration**: `https://vercel.com/docs/concepts/projects/domains/add-a-domain`
- **SSL Certificates**: `https://vercel.com/docs/concepts/projects/domains/ssl`

### **Bantuan:**
- **Status Page**: `https://vercel-status.com`
- **Support**: Tersedia di Vercel dashboard
- **Community**: `https://vercel.com/discord`

---

## **Task List - Step by Step**

### **Phase 1: Persiapan (Hari Ini)**
- [ ] **Beli domain** dari registrar
- [ ] **Login** ke Vercel dashboard
- [ ] **Navigasi** ke project settings
- [ ] **Add** custom domain

### **Phase 2: Konfigurasi (Hari Ini)**
- [ ] **Copy** DNS records dari Vercel
- [ ] **Setup** DNS di domain registrar
- [ ] **Tunggu** DNS propagation
- [ ] **Verify** SSL certificate

### **Phase 3: Testing (Hari Ini)**
- [ ] **Test** website di domain baru
- [ ] **Verify** HTTPS working
- [ ] **Test** semua functionality
- [ ] **Update** hardcoded URLs

### **Phase 4: Finalisasi (Besok)**
- [ ] **Setup** 301 redirects
- [ ] **Update** SEO meta tags
- [ ] **Update** Google Analytics
- [ ] **Monitor** performance

---

**Langkah Selanjutnya**: Login ke Vercel dashboard dan mulai konfigurasi domain!
