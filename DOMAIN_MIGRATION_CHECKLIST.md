# Domain Migration Checklist - Gold Grace Web

## **Migration Overview**
Prepare untuk migrasi dari `gold-grace-web.vercel.app` ke custom domain

---

## **Phase 1: Pre-Migration Preparation**

### **1. Domain Acquisition**
- [ ] Purchase custom domain
- [ ] Verify domain ownership
- [ ] Configure domain registrar settings
- [ ] Set up domain privacy protection

### **2. Current Domain Analysis**
- [ ] Document current URLs and redirects
- [ ] Identify critical pages and resources
- [ ] Check current SSL certificate status
- [ ] Analyze current SEO rankings

### **3. New Domain Configuration**
- [ ] Configure DNS records (A, CNAME, TXT)
- [ ] Set up SSL certificate
- [ ] Configure email services
- [ ] Set up subdomains if needed

---

## **Phase 2: Codebase Updates**

### **1. Environment Variables**
```env
# Update .env.local
VITE_DOMAIN_URL=https://your-new-domain.com
VITE_API_URL=https://your-new-domain.com/api
```

### **2. Meta Tags & SEO**
- [ ] Update `src/components/SEO.tsx` with new domain
- [ ] Update Open Graph URLs
- [ ] Update Twitter Card URLs
- [ ] Update sitemap URLs
- [ ] Update canonical URLs

### **3. Configuration Files**
- [ ] Update `vercel.json` domain settings
- [ ] Update `manifest.json` URLs
- [ ] Update `robots.txt`
- [ ] Update hardcoded URLs in components

---

## **Phase 3: DNS & SSL Configuration**

### **1. Vercel Domain Setup**
```bash
# Add domain to Vercel project
vercel domains add your-new-domain.com
vercel domains add www.your-new-domain.com
```

### **2. DNS Records**
```
A Record: @ -> 76.76.21.21
A Record: @ -> 76.76.19.61
CNAME Record: www -> cname.vercel-dns.com
```

### **3. SSL Certificate**
- [ ] Request SSL certificate through Vercel
- [ ] Verify SSL installation
- [ ] Test SSL security rating
- [ ] Set up automatic renewal

---

## **Phase 4: SEO & Content Updates**

### **1. URL Structure**
- [ ] Plan URL redirects (301)
- [ ] Update internal links
- [ ] Update sitemap.xml
- [ ] Update robots.txt

### **2. Content Updates**
- [ ] Update hardcoded URLs in content
- [ ] Update social media profiles
- [ ] Update business listings
- [ ] Update email footers

### **3. Analytics & Tracking**
- [ ] Update Google Analytics property
- [ ] Update Google Search Console
- [ ] Update tracking codes
- [ ] Set up domain change notifications

---

## **Phase 5: Testing & Validation**

### **1. Pre-Launch Testing**
- [ ] Test all page functionality
- [ ] Test forms and submissions
- [ ] Test mobile responsiveness
- [ ] Test loading speed

### **2. SEO Validation**
- [ ] Test robots.txt accessibility
- [ ] Test sitemap.xml
- [ ] Test meta tags
- [ ] Test structured data

### **3. Performance Testing**
- [ ] Run Lighthouse audit
- [ ] Test Core Web Vitals
- [ ] Test SSL security
- [ ] Test DNS propagation

---

## **Phase 6: Migration Execution**

### **1. DNS Switch**
- [ ] Update DNS records
- [ ] Monitor DNS propagation
- [ ] Verify SSL certificate
- [ ] Test website accessibility

### **2. Redirect Implementation**
- [ ] Set up 301 redirects from old domain
- [ ] Test redirect functionality
- [ ] Monitor redirect chains
- [ ] Update external backlinks

### **3. Post-Migration Testing**
- [ ] Full website functionality test
- [ ] SEO validation
- [ ] Performance monitoring
- [ ] Error monitoring

---

## **Phase 7: Post-Migration**

### **1. Monitoring**
- [ ] Monitor website uptime
- [ ] Monitor traffic patterns
- [ ] Monitor SEO rankings
- [ ] Monitor error logs

### **2. Updates & Notifications**
- [ ] Update Google My Business
- [ ] Update social media profiles
- [ ] Notify clients and partners
- [ ] Update email signatures

### **3. Documentation**
- [ ] Update project documentation
- [ ] Update README.md
- [ ] Update team documentation
- [ ] Archive old domain information

---

## **Critical Files to Update**

### **1. SEO Component (`src/components/SEO.tsx`)**
```typescript
// Update canonical URLs
canonical: `https://your-new-domain.com${pathname}`
```

### **2. Manifest (`public/manifest.json`)**
```json
{
  "start_url": "https://your-new-domain.com/",
  "scope": "https://your-new-domain.com/"
}
```

### **3. Vercel Config (`vercel.json`)**
```json
{
  "domains": ["your-new-domain.com", "www.your-new-domain.com"]
}
```

---

## **Migration Timeline**

### **Week 1: Preparation**
- Domain purchase and configuration
- Codebase updates
- DNS setup

### **Week 2: Testing**
- Full functionality testing
- SEO validation
- Performance testing

### **Week 3: Migration**
- DNS switch
- Redirect implementation
- Post-migration validation

### **Week 4: Monitoring**
- Performance monitoring
- SEO tracking
- Issue resolution

---

## **Rollback Plan**

### **Emergency Rollback**
- [ ] Keep old domain active for 30 days
- [ ] Quick DNS revert procedure
- [ ] Data backup verification
- [ ] Communication plan

---

## **Success Metrics**

### **Technical Metrics**
- [ ] 100% uptime during migration
- [ ] < 2 seconds page load time
- [ ] SSL certificate valid
- [ ] All redirects working

### **SEO Metrics**
- [ ] Maintain current rankings
- [ ] No traffic loss
- [ ] All pages indexed
- [ ] No broken links

### **Business Metrics**
- [ ] No form submission issues
- [ ] All contact methods working
- [ ] Client notifications sent
- [ ] Documentation updated

---

## **Contact Information**

### **Domain Registrar**
- Registrar: [Your Registrar]
- Account: [Your Account]
- Support: [Support Contact]

### **Vercel Support**
- Dashboard: `https://vercel.com/dashboard`
- Documentation: `https://vercel.com/docs`
- Support: Available in dashboard

### **Emergency Contacts**
- Technical Lead: [Contact Info]
- Domain Admin: [Contact Info]
- SEO Specialist: [Contact Info]

---

**Migration Date**: [TBD]
**Migration Window**: [TBD]
**Go-Live Time**: [TBD]

**Status**: Preparation Phase
