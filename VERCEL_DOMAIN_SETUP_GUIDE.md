# Vercel Domain Setup Guide - Step by Step

## **Access Vercel Dashboard**

---

## **Step 1: Login ke Vercel**

### **URL Dashboard:**
```
https://vercel.com/dashboard
```

### **Login Options:**
- **Email**: Gunakan email yang terdaftar
- **GitHub**: Login via GitHub account
- **GitLab**: Login via GitLab account
- **Bitbucket**: Login via Bitbucket account

---

## **Step 2: Navigate ke Project**

### **Cara Akses Project Settings:**

#### **Option 1: From Dashboard**
1. **Buka** `https://vercel.com/dashboard`
2. **Scroll** ke bawah ke "Your Projects"
3. **Click** pada project `gold-grace-web`
4. **Click** tab "Settings"

#### **Option 2: Direct Project URL**
```
https://vercel.com/elfaruqihaikal-5159s-projects/gold-grace-web/settings
```

#### **Option 3: From Recent Projects**
1. **Buka** `https://vercel.com/dashboard`
2. **Click** "View All Projects"
3. **Search** "gold-grace-web"
4. **Click** project name
5. **Click** "Settings" tab

---

## **Step 3: Add Custom Domain**

### **Navigate ke Domain Settings:**

#### **Via Settings Menu:**
1. **Click** tab "Settings" di project
2. **Scroll** ke section "Domains"
3. **Click** "Add" atau "Add Custom Domain"

#### **Direct Domain URL:**
```
https://vercel.com/elfaruqihaikal-5159s-projects/gold-grace-web/settings/domains
```

---

## **Step 4: Configure Domain**

### **Add Primary Domain:**
1. **Input** domain name: `your-new-domain.com`
2. **Click** "Add"
3. **Tunggu** Vercel generate DNS records
4. **Copy** DNS records yang diberikan

### **Add WWW Subdomain:**
1. **Click** "Add" lagi
2. **Input**: `www.your-new-domain.com`
3. **Click** "Add"
4. **Tunggu** DNS records generation

---

## **Step 5: DNS Configuration**

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

## **Step 6: Configure di Domain Registrar**

### **GoDaddy Setup:**
1. **Login** ke GoDaddy
2. **Go to** "DNS Management"
3. **Delete** existing A records (jika ada)
4. **Add** A records dari Vercel
5. **Add** CNAME record untuk www
6. **Save** changes

### **Namecheap Setup:**
1. **Login** ke Namecheap
2. **Go to** "Domain List" > "Manage"
3. **Go to** "Advanced DNS"
4. **Add** A records dan CNAME
5. **Save** changes

### **Cloudflare Setup:**
1. **Login** ke Cloudflare
2. **Select** domain
3. **Go to** "DNS" section
4. **Add** A records (proxy disabled)
5. **Add** CNAME record
6. **Save** changes

---

## **Step 7: Verification**

### **Check Domain Status:**
1. **Kembali** ke Vercel dashboard
2. **Refresh** domain page
3. **Tunggu** DNS propagation (5-30 menit)
4. **Verify** domain status "Verified"

### **SSL Certificate:**
1. **Check** SSL status di Vercel
2. **Tunggu** certificate issuance (1-5 menit)
3. **Verify** HTTPS working

---

## **Step 8: Test Website**

### **Test Accessibility:**
```bash
# Test HTTP
curl -I http://your-new-domain.com

# Test HTTPS  
curl -I https://your-new-domain.com

# Test redirect
curl -L -I http://your-new-domain.com
```

### **Browser Test:**
1. **Buka** `https://your-new-domain.com`
2. **Verify** website loading
3. **Check** SSL certificate (padlock icon)
4. **Test** semua pages

---

## **Troubleshooting**

### **Common Issues:**

#### **DNS Propagation Delay:**
- **Issue**: Domain not resolving
- **Solution**: Tunggu 24-48 jam
- **Check**: `dnschecker.org`

#### **SSL Certificate Error:**
- **Issue**: SSL not issued
- **Solution**: Check DNS configuration
- **Action**: Verify A records pointing to Vercel

#### **Redirect Loop:**
- **Issue**: Infinite redirects
- **Solution**: Check redirect configuration
- **Action**: Remove conflicting redirects

#### **Mixed Content Error:**
- **Issue**: HTTP resources on HTTPS page
- **Solution**: Update resource URLs to HTTPS
- **Action**: Check browser console

---

## **CLI Alternative**

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

### **Add Domain via CLI:**
```bash
# Add primary domain
vercel domains add your-new-domain.com

# Add www subdomain
vercel domains add www.your-new-domain.com

# List domains
vercel domains ls

# Remove domain
vercel domains rm your-new-domain.com
```

---

## **Project Specific URLs**

### **Direct Access:**
- **Dashboard**: `https://vercel.com/dashboard`
- **Project**: `https://vercel.com/elfaruqihaikal-5159s-projects/gold-grace-web`
- **Settings**: `https://vercel.com/elfaruqihaikal-5159s-projects/gold-grace-web/settings`
- **Domains**: `https://vercel.com/elfaruqihaikal-5159s-projects/gold-grace-web/settings/domains`

### **Current Project Info:**
- **Project Name**: gold-grace-web
- **Owner**: elfaruqihaikal-5159s-projects
- **Current URL**: https://gold-grace-web.vercel.app
- **Status**: Active and deployed

---

## **Quick Reference**

### **Step-by-Step Summary:**
1. **Login**: `https://vercel.com/dashboard`
2. **Select Project**: `gold-grace-web`
3. **Settings**: Click "Settings" tab
4. **Domains**: Click "Domains" section
5. **Add Domain**: Input domain name
6. **Configure DNS**: Copy records ke registrar
7. **Verify**: Tunggu propagation
8. **Test**: Buka website di new domain

### **Navigation Path:**
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

### **Vercel Documentation:**
- **Domain Setup**: `https://vercel.com/docs/concepts/projects/domains`
- **DNS Configuration**: `https://vercel.com/docs/concepts/projects/domains/add-a-domain`
- **SSL Certificates**: `https://vercel.com/docs/concepts/projects/domains/ssl`

### **Help Resources:**
- **Status Page**: `https://vercel-status.com`
- **Support**: Available di Vercel dashboard
- **Community**: `https://vercel.com/discord`

---

**Next Step**: Login ke Vercel dashboard dan mulai domain configuration!
