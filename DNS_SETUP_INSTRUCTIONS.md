# DNS Setup Instructions - Domain Migration

## **DNS Configuration for Custom Domain**

---

## **Step 1: Purchase Domain**
1. Purchase domain from registrar (GoDaddy, Namecheap, etc.)
2. Complete domain verification
3. Enable domain privacy protection (optional)

---

## **Step 2: Add Domain to Vercel**

### **Via Vercel Dashboard:**
1. Go to `https://vercel.com/dashboard`
2. Select `gold-grace-web` project
3. Go to `Settings` > `Domains`
4. Add custom domain: `your-new-domain.com`
5. Add www version: `www.your-new-domain.com`

### **Via CLI:**
```bash
# Add primary domain
vercel domains add your-new-domain.com

# Add www subdomain
vercel domains add www.your-new-domain.com
```

---

## **Step 3: DNS Records Configuration**

### **Required DNS Records:**

#### **A Records (Root Domain)**
```
Type: A
Name: @ (or your-new-domain.com)
Value: 76.76.21.21
TTL: 300 (or default)

Type: A  
Name: @ (or your-new-domain.com)
Value: 76.76.19.61
TTL: 300 (or default)
```

#### **CNAME Record (WWW Subdomain)**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 300 (or default)
```

---

## **Step 4: DNS Setup by Registrar**

### **GoDaddy:**
1. Log in to GoDaddy
2. Go to `DNS Management`
3. Add A records for root domain
4. Add CNAME record for www
5. Save changes

### **Namecheap:**
1. Log in to Namecheap
2. Go to `Domain List` > `Manage`
3. Go to `Advanced DNS`
4. Add A records and CNAME
5. Save changes

### **Cloudflare:**
1. Log in to Cloudflare
2. Select domain
3. Go to `DNS` section
4. Add A records (proxy disabled)
5. Add CNAME record
6. Save changes

---

## **Step 5: SSL Certificate**

### **Automatic SSL (Vercel):**
1. Vercel automatically requests SSL certificate
2. Certificate issued by Let's Encrypt
3. Automatic renewal handled by Vercel
4. HTTPS enabled by default

### **Manual SSL (if needed):**
```bash
# Check SSL status
curl -I https://your-new-domain.com

# SSL certificate details
openssl s_client -connect your-new-domain.com:443
```

---

## **Step 6: Verification & Testing**

### **DNS Propagation Check:**
```bash
# Check DNS propagation
nslookup your-new-domain.com
dig your-new-domain.com
ping your-new-domain.com

# Check specific DNS servers
nslookup your-new-domain.com 8.8.8.8
nslookup your-new-domain.com 1.1.1.1
```

### **SSL Verification:**
```bash
# SSL test
curl -I https://your-new-domain.com

# SSL certificate info
openssl s_client -connect your-new-domain.com:443 -servername your-new-domain.com
```

### **Website Accessibility:**
```bash
# Test HTTP
curl -I http://your-new-domain.com

# Test HTTPS
curl -I https://your-new-domain.com

# Test redirect from HTTP to HTTPS
curl -L -I http://your-new-domain.com
```

---

## **Step 7: Redirect Configuration**

### **WWW to Non-WWW (or vice versa):**
```javascript
// In vercel.json redirects section
{
  "source": "/(.*)",
  "destination": "https://www.your-new-domain.com/$1",
  "permanent": true
}
```

### **Old Domain Redirects:**
```javascript
// Redirect from old Vercel domain
{
  "source": "/(.*)",
  "destination": "https://your-new-domain.com/$1", 
  "permanent": true
}
```

---

## **Step 8: Email Configuration**

### **MX Records (if using domain email):**
```
Type: MX
Name: @
Value: mail.your-email-provider.com
Priority: 10
```

### **SPF Record:**
```
Type: TXT
Name: @
Value: "v=spf1 include:_spf.google.com ~all"
```

### **DKIM Record:**
```
Type: TXT
Name: selector._domainkey
Value: "v=DKIM1; k=rsa; p=public-key"
```

---

## **Step 9: Common Issues & Solutions**

### **DNS Propagation Delay:**
- **Issue**: DNS changes not immediate
- **Solution**: Wait 24-48 hours for full propagation
- **Check**: Use `dnschecker.org` to verify global propagation

### **SSL Certificate Issues:**
- **Issue**: Certificate not issued
- **Solution**: Check DNS configuration, ensure domain points to Vercel
- **Check**: Vercel dashboard for SSL status

### **Mixed Content Errors:**
- **Issue**: HTTP resources on HTTPS page
- **Solution**: Update all resource URLs to HTTPS
- **Check**: Browser console for mixed content warnings

### **Redirect Loops:**
- **Issue**: Infinite redirects
- **Solution**: Check redirect configuration
- **Check**: Use curl to trace redirect chain

---

## **Step 10: Monitoring & Maintenance**

### **Uptime Monitoring:**
- Use UptimeRobot or similar service
- Monitor both HTTP and HTTPS
- Set up alerts for downtime

### **SSL Monitoring:**
- Monitor SSL certificate expiry
- Set up renewal alerts
- Check SSL security rating

### **Performance Monitoring:**
- Monitor page load times
- Check Core Web Vitals
- Set up performance alerts

---

## **Troubleshooting Commands**

### **DNS Debugging:**
```bash
# Check all DNS records
dig your-new-domain.com ANY

# Check specific record types
dig your-new-domain.com A
dig your-new-domain.com CNAME
dig your-new-domain.com MX
dig your-new-domain.com TXT

# Trace DNS resolution
dig +trace your-new-domain.com
```

### **Network Debugging:**
```bash
# Test connectivity
telnet your-new-domain.com 80
telnet your-new-domain.com 443

# Trace route
traceroute your-new-domain.com

# Check HTTP headers
curl -v https://your-new-domain.com
```

### **SSL Debugging:**
```bash
# Check SSL certificate
openssl s_client -connect your-new-domain.com:443 -showcerts

# Check SSL chain
curl -I https://your-new-domain.com --cacert /etc/ssl/certs/ca-certificates.crt
```

---

## **Post-Migration Checklist**

### **Technical Verification:**
- [ ] DNS records configured correctly
- [ ] SSL certificate active and valid
- [ ] Website accessible via HTTPS
- [ ] All pages loading correctly
- [ ] Forms and interactive elements working
- [ ] Mobile responsiveness maintained

### **SEO Verification:**
- [ ] Robots.txt accessible
- [ ] Sitemap.xml accessible
- [ ] Meta tags updated
- [ ] Canonical URLs correct
- [ ] Structured data valid
- [ ] No broken links

### **Business Verification:**
- [ ] Contact forms working
- [ ] Phone numbers clickable
- [ ] Social media links working
- [ ] Analytics tracking active
- [ ] Email notifications working

---

## **Emergency Rollback**

### **Quick Rollback Steps:**
1. Remove custom domain from Vercel
2. Restore original DNS records
3. Verify old domain working
4. Investigate migration issues
5. Plan re-migration attempt

### **Rollback DNS Records:**
```
# Remove custom domain records
# Restore to original configuration
# Point back to gold-grace-web.vercel.app
```

---

## **Support Contacts**

### **Vercel Support:**
- Dashboard: `https://vercel.com/dashboard`
- Documentation: `https://vercel.com/docs`
- Status Page: `https://vercel-status.com`

### **Domain Registrar Support:**
- GoDaddy: `https://www.godaddy.com/help`
- Namecheap: `https://www.namecheap.com/support`
- Cloudflare: `https://support.cloudflare.com`

### **DNS Tools:**
- DNS Checker: `https://dnschecker.org`
- SSL Checker: `https://www.sslchecker.com`
- Pingdom: `https://pingdom.com`

---

**Migration Date**: [TBD]
**DNS Propagation Time**: 24-48 hours
**SSL Certificate**: Automatic (Let's Encrypt)
**Monitoring**: Active post-migration

**Status**: Ready for domain configuration
