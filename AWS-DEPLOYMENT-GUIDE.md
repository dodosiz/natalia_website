# AWS Deployment Guide: S3 + CloudFront + Route 53

## Manual Deployment via AWS Console

This guide will walk you through deploying your React application to AWS using the AWS Console interface. You'll use S3 for hosting, CloudFront for CDN, and Route 53 for custom domain management.

## Prerequisites

1. **AWS Account** - [Sign up here](https://aws.amazon.com/)
2. **Domain name** (optional, for Route 53)
3. **Node.js and npm** (already installed)
4. **Your built React application** (we'll build it in Step 1)

## Overview of Steps

1. Build your React application locally
2. Create and configure S3 bucket
3. Upload files to S3
4. Set up CloudFront distribution
5. Request SSL certificate (for HTTPS)
6. Configure custom domain with Route 53 (optional)
7. Test and verify deployment

---

# Part 1: Register Your Domain

## Step 1: Register Domain in Route 53

Let's start by getting your domain name. This needs to be done first because SSL certificate validation requires the domain.

### 1.1 Open Route 53

1. Sign in to [AWS Console](https://console.aws.amazon.com/)
2. Go to [Route 53 Console](https://console.aws.amazon.com/route53/)
3. Click **"Register domain"** in the left sidebar
   - Or click the orange **"Register domain"** button on the main page

### 1.2 Search for Your Domain

1. **Enter your desired domain name** (e.g., `johnsmith`, `janedoe-portfolio`)
2. Click **"Check"** button
3. Select your domain extension:
   - `.com` (~$13/year) - Most popular
   - `.net` (~$13/year) - Good alternative
   - `.io` (~$39/year) - Tech-focused
   - `.dev` (~$13/year) - Developer-focused
   - Many others available

4. If your domain is taken, try:
   - Different extensions (.net, .io, .dev)
   - Adding your profession (yourname-architect.com)
   - Using middle name or initials
   - Creative spellings or combinations

5. Click **"Add to cart"** when you find available domain
6. Click **"Continue"** at the bottom

### 1.3 Enter Contact Information

1. Fill out **all required fields**:
   - Contact Type: Person
   - First name, Last name
   - Email address (⚠️ IMPORTANT: Use valid email - you'll receive verification)
   - Phone number
   - Address information

2. **Privacy Protection:**
   - Leave **ENABLED** (recommended)
   - Hides your personal info from public WHOIS database

3. Click **"Continue"**

### 1.4 Review and Complete

1. Review your information
2. **Auto-renew:** Leave **ENABLED** (prevents accidental expiration)
3. Check the terms and conditions box
4. Click **"Complete purchase"**

### 1.5 Verify Email

1. Check your email inbox (including spam folder)
2. Look for email from AWS Route 53
3. Click the verification link
4. ⚠️ **Must verify within 14 days or domain will be suspended**

⏳ **Domain registration takes 5-15 minutes**

### 1.6 Create Hosted Zone (Automatic)

Route 53 automatically creates a **hosted zone** for your domain. This is where DNS records will be stored.

**To verify:**

1. Go to [Route 53 Console](https://console.aws.amazon.com/route53/)
2. Click **"Hosted zones"** in left sidebar
3. You should see your domain listed
4. Click on it - you'll see NS and SOA records (normal and expected)

✅ **Domain registered! Now let's build and upload your website.**

---

# Part 2: Prepare & Upload Website

## Step 2: Build Your React Application

Before deploying, you need to create a production build of your application.

1. Open PowerShell in your project directory
2. Run the build command:

```powershell
npm run build
```

3. This creates a `dist` folder with your optimized production files
4. Verify the `dist` folder contains:
   - `index.html`
   - `assets/` folder with JS, CSS, and other files

✅ **Your app is now ready to deploy!**

## Step 2: Create S3 Bucket

### 2.1 Create the Bucket

1. Sign in to [AWS Console](https://console.aws.amazon.com/)
2. Go to [S3 Console](https://console.aws.amazon.com/s3/)
3. Click the orange **"Create bucket"** button

### 2.2 Configure Bucket Settings

**General Configuration:**

- **Bucket name**: Choose a globally unique name (e.g., `yourname-portfolio-website`)
  - Must be lowercase, no spaces
  - Will be part of your URL
- **AWS Region**: Select your preferred region (e.g., `US East (N. Virginia) us-east-1`)
  - Choose a region close to your target audience

**Object Ownership:**

- Leave as **"ACLs disabled (recommended)"**

**Block Public Access settings:**

- ⚠️ **UNCHECK** "Block all public access"
- Check the box: **"I acknowledge that the current settings might result in this bucket and the objects within becoming public"**
- ⚠️ This is required for website hosting

**Bucket Versioning:**

- Leave as **"Disable"** (or enable if you want version history)

**Tags, Encryption, Advanced:**

- Leave all other settings as default

4. Click the orange **"Create bucket"** button at the bottom

✅ **Your NEW production S3 bucket is now created!**

**Summary so far:**

- ✅ Domain registered in Route 53
- ✅ React app built locally
- ✅ NEW S3 bucket created for production
  4.1 Enable Static Website Hosting

1. Click on your **NEW bucket name** from the S3 buckets list (not your old bucket)

## Step 4: Configure S3 for Static Website Hosting

### 3.1 Enable Static Website Hosting

1. Click on your bucket name from the S3 buckets list
2. Go to the **Properties** tab
3. Scroll down to **Static website hosting** section (near the bottom)
4. Click **Edit**
5. Select **"Enable"**
6. **Hosting type**: Static website hosting
7. **Index document**: `index.html`
8. **Error document**: `index.html`
   - ⚠️ Important: Use `index.html` for error document to support React Router
9. Click **"Save changes"**
10. Scroll back to **Static website hosting** section
11. **Copy the Bucket website endpoint** (e.g., `http://your-bucket.s3-website-us-east-1.amazonaws.com`)
    - Save this URL - you'll test with it later

### 4.2 Set Bucket Policy (Make Files Public)

1. Go to the **Permissions** tab
2. Scroll to **Bucket policy** section
3. Click **Edit**
4. Paste the following policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
    }
  ]
}
```

5. **Replace `YOUR-BUCKET-NAME`** with your actual bucket name (2 places)
6. Click **"Save changes"**

✅ **Your NEW bucket is now configured for public website hosting!**

---

## Step 5: Upload Your Application Files

### 5.1 Upload Files via Console

1. Stay in your S3 bucket
2. Go to the **Objects** tab
3. Click the orange **"Upload"** button

### 5.2 Add Files

1. Click **"Add files"** button
2. Navigate to your project's `dist` folder
3. Select **all files** in the `dist` folder:
   - `index.html`
   - All files (hold Ctrl+A or Cmd+A to select all)
4. Click **"Add folders"** button
5. Navigate to your project's `dist` folder
6. Select the `assets` folder
7. Click **"Upload"**

**Alternative Method (Drag & Drop):**

1. Open your `dist` folder in File Explorer
2. Select all contents (Ctrl+A)
3. Drag and drop into the AWS console upload area

### 5.3 Complete Upload

1. Scroll down and click the orange **"Upload"** button
2. Wait for upload to complete (progress bar will show)
3. Click **"Close"** when done

### 5.4 Verify Files

1. In the **Objects** tab, you should see:
   - `index.html` file
   - `assets/` folder
2. Click on `assets/` folder to verify JS and CSS files are there

### 5.5 Test Your Website

1. Copy the **Bucket website endpoint** from Step 4.1
2. Paste it in your browser
3. Your React application should load!
4. ⚠️ Notice: URL shows HTTP (not secure) - we'll fix this with CloudFront

✅ **Your app is now live on S3!**

**Progress check:**

- ✅ Domain registered
- ✅ Website built and uploaded to NEW S3 bucket
- ✅ Site accessible via HTTP
- ⬜ Add HTTPS (next)
- ⬜ 6dd custom domain (next)

---

# Part 3: Add HTTPS & CDN (CloudFront)

## Why This Part is Important

6
Right now your site:

- ❌ Shows "Not Secure" in browser
- ❌ Won't load with HTTPS
- ❌ Loads slowly for visitors far from your S3 region
- ❌ Can't use your custom domain properly
  6
  After CloudFront:
- ✅ Shows padlock icon (secure)
- ✅ Loads fast globally
- ✅ Professional appearance
- ✅ Ready for custom domain

---

## Step 6: Request SSL Certificate (For HTTPS)

⚠️ **Do this BEFORE creating CloudFront distribution**

### 5.1 Open Certificate Manager

1. Go to [AWS Certificate Manager](https://console.aws.amazon.com/acm/)
2. **⚠️ IMPORTANT**: Make sure you're in **US East (N. Virginia) us-east-1** region
   - Look at top-right corner - change region if needed
   - CloudFront only works with certificates in us-east-1

### 6.4 Validate Domain Ownership (Easy - Automatic)

1. Click **"Request certificate"** button
2. Select **"Request a public certificate"**
3. Click **"Next"**

### 5.3 Configure Certificate

**Domain names:**

- Add your domain: `yourdomain.com` (replace with your actual domain)
- Click **"Add another name to this certificate"**
- Add: `www.yourdomain.com`
- Click **"Add another name to this certificate"**
- Add wildcard (optional): `*.yourdomain.com`

**Validation method:**

- Select **"DNS validation - recommended"**

**Key algorithm:**

- Leave as **"RSA 2048"**

4. Click **"Request"**

### 5.4 Validate Domain Ownership

1. Click on your certificate ID
2. You'll see pending validation status
3. Click **"Create records in Route 53"** button (if using Route 53)
   - Select all domains
   - Click **"Create records"**
   - ⏳ Wait 5-30 minutes for validation

**If NOT using Route 53:**

1. Click dropdown arrow next to each domain
2. Copy the CNAME name and value
3. Add these CNAME records to your domain's DNS provider
4. Wait for validation (5-30 minutes)

✅ **Wait until certificate status shows "Issued" before proceeding**

---

## Step 7: Create CloudFront Distribution

Now we'll set up CloudFront to add HTTPS and global CDN to your website. This is the most detailed step.

### 7.1 Open CloudFront Console

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click the orange **"Create distribution"** button
3. You'll see a long form - follow each section below carefully

---

### 7.2 Origin Settings

This tells CloudFront where to get your website files.

**Origin domain:**

- ⚠️ **CRITICAL:** Do NOT select your S3 bucket from the dropdown!
- Instead, you need to manually enter your **S3 website endpoint**
- To find it:
  1. Open S3 console in new tab
  2. Click your bucket → Properties tab
  3. Scroll to "Static website hosting" section
  4. Copy the endpoint URL (looks like: `your-bucket-name.s3-website-us-east-1.amazonaws.com`)
  5. Paste ONLY the domain part (remove `http://`)
- Example: `natalia-portfolio-prod.s3-website-us-east-1.amazonaws.com`
- ⚠️ Must end with `.s3-website-REGION.amazonaws.com` NOT `.s3.amazonaws.com`

**Protocol:**

- Select **"HTTP only"**
- (S3 website endpoints don't support HTTPS, but CloudFront will serve HTTPS to users)

**Origin path:**

- Leave **empty**

**Name:**

- Auto-filled with your S3 endpoint (keep it)

**Add custom header:**

- Leave empty (not needed)

**Origin Shield:**

- Leave **disabled**

---

### 7.3 Default Cache Behavior Settings

**Path pattern:**

- Leave as **`Default (*)`**

**Compress objects automatically:**

- Select **"Yes"** (improves performance)

**Viewer protocol policy:**

- Select **"Redirect HTTP to HTTPS"**
- This ensures users always get HTTPS

**Allowed HTTP methods:**

- Select **"GET, HEAD"**
- (Your static site only needs these)

**Restrict viewer access:**

- Select **"No"** (website is public)

---

### 7.4 Cache Key and Origin Requests

**Cache policy:**

- Select **"CachingOptimized"** from dropdown
- This is recommended for static websites

**Origin request policy - optional:**

- Leave as **"None"**

**Response headers policy - optional:**

- Leave as **"None"** (or select one if you want security headers)

---

### 7.5 Function Associations (Leave Empty)

- **Viewer request:** None
- **Viewer response:** None
- **Origin request:** None
- **Origin response:** None

Skip this section entirely.

---

### 7.6 Settings (Important!)

**Price class:**

- Select **"Use all edge locations (best performance)"**
- Or select **"Use only North America and Europe"** to save costs

**AWS WAF web ACL:**

- Leave as **"Do not enable security protections"**

**Alternate domain names (CNAMEs)** - **REQUIRED:**

- Click **"Add item"**
- Enter: `yourdomain.com` (replace with YOUR actual domain)
- Click **"Add item"** again
- Enter: `www.yourdomain.com` (replace with YOUR domain)
- ⚠️ These MUST match your certificate domains exactly

**Custom SSL certificate:**

- Click the dropdown
- Select your certificate (shows your domain name)
- Should look like: `yourdomain.com (12abc34d-5678-90ef-ghij-1234567890ab)`
- ⚠️ If you don't see your certificate:
  - Make sure certificate status is "Issued" (not Pending)
  - Make sure you're in us-east-1 region
  - Refresh the page

**Legacy clients support:**

- Leave unchecked (default)

**Supported HTTP versions:**

- Check **"HTTP/2"**
- Check **"HTTP/3"** (optional, for best performance)

**Default root object:**

- Enter: `index.html`
- ⚠️ This is CRITICAL - tells CloudFront what file to serve at root path

**Standard logging:**

- Select **"Off"** (or enable if you want access logs)

**IPv6:**

- Leave **"On"** (recommended)

---

### 7.7 Review and Create

1. Scroll to the bottom
2. Review your settings (especially origin domain and alternate domain names)
3. Click the orange **"Create distribution"** button

### 7.8 Save Important Information

After creation, you'll see your distribution details. **Copy and save:**

1. **Distribution ID** (e.g., `E1ABC234DEF567`)
2. **Distribution domain name** (e.g., `d1234abcdef5678.cloudfront.net`)

⏳ **Status will show "Deploying"**

- This takes **5-15 minutes**
- Don't close the page
- You can refresh to check progress
- Wait until status changes to **"Enabled"** before proceeding

---

## Step 8: Configure Custom Error Pages (React Router Support)

⚠️ **Don't skip this!** Without these settings, React Router won't work with direct URLs.

### 8.1 Wait for CloudFront Deployment

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Look at your distribution's **Status** column
3. Wait until it shows **"Enabled"** (not "Deploying")
4. **Last modified** field should show a recent timestamp
5. Refresh page every few minutes to check

### 8.2 Access Error Pages Settings

1. Click on your **Distribution ID** (the link in the ID column)
2. Click the **"Error pages"** tab
3. You should see "No custom error responses" initially

### 8.3 Create Error Response for 403 Errors

1. Click **"Create custom error response"** button

**Fill in the form:**

- **HTTP error code:** Select **`403: Forbidden`**
- **Customize error response:** Select **"Yes"**
- **Response page path:** Enter `/index.html`
- **HTTP response code:** Select **`200: OK`**
- **Error caching minimum TTL:** Leave as **10** (default)

2. Click **"Create custom error response"**

### 8.4 Create Error Response for 404 Errors

1. Click **"Create custom error response"** button again

**Fill in the form:**

- **HTTP error code:** Select **`404: Not Found`**
- **Customize error response:** Select **"Yes"**
- **Response page path:** Enter `/index.html`
- **HTTP response code:** Select **`200: OK`**
- **Error caching minimum TTL:** Leave as **10** (default)

2. Click **"Create custom error response"**

### 8.5 Verify Error Pages

You should now see 2 custom error responses in the list:

- 403 → /index.html (200)
- 404 → /index.html (200)

⏳ **These changes deploy automatically** (takes 2-5 minutes)

✅ **CloudFront is now fully configured!**

---

## Step 9: Test CloudFront URL (Before Adding Domain)

Let's verify CloudFront is working before connecting your custom domain.

### 9.1 Get Your CloudFront URL

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Find your **Distribution domain name** (e.g., `d1234abcdef5678.cloudfront.net`)
3. Copy it

### 9.2 Test in Browser

1. Open a **new incognito/private browser window** (to avoid cache)
2. Go to: `https://YOUR-CLOUDFRONT-DOMAIN.cloudfront.net`
   - Replace with your actual CloudFront domain
3. **Verify:**
   - ✅ Your website loads
   - ✅ You see a padlock icon 🔒 in the address bar
   - ✅ Browser shows "Connection is secure"
   - ✅ All images and CSS load correctly

### 9.3 Test React Router

1. Navigate to a project detail page (click on a project)
2. Copy the full URL (e.g., `https://d123.cloudfront.net/projects/some-project`)
3. Open a new tab
4. Paste and visit the URL directly
5. **Verify:** Page loads correctly (not a 404 error)
6. Refresh the page
7. **Verify:** Still works after refresh

✅ **If everything works, proceed to connect your domain!**

**If something doesn't work:**

- Wait 5 more minutes (deployment might not be complete)
- Check CloudFront status is "Enabled"
- Clear browser cache and try again
- Review troubleshooting section at end of guide

---

## Step 10: Connect Your Custom Domain with Route 53

## Step 10: Connect Your Custom Domain with Route 53

Since you already registered your domain in Route 53, this is straightforward!

### 10.1 Open Your Hosted Zone

1. Go to [Route 53 Console](https://console.aws.amazon.com/route53/)
2. Click **"Hosted zones"** in left sidebar
3. Click on **your domain name** (e.g., `yourdomain.com`)
4. You should see existing NS and SOA records (this is normal)

### 10.2 Create A Record for Root Domain

1. Click the orange **"Create record"** button

**Fill in the form:**

- **Record name:** Leave **empty** (this is for yourdomain.com)
- **Record type:** Select **"A - Routes traffic to an IPv4 address and some AWS resources"**
- **Alias:** Toggle switch to **ON** (should turn blue)
- **Route traffic to:**
  - Select **"Alias to CloudFront distribution"**
  - **Choose region:** Should auto-select or choose your region
  - **Choose distribution:** Click the dropdown and select your CloudFront distribution
    - It will show your distribution domain name (d1234....cloudfront.net)
- **Routing policy:** Leave as **"Simple routing"**
- **Evaluate target health:** Leave **unchecked**

2. Click **"Create records"** button

### 10.3 Create A Record for WWW Subdomain

1. Click **"Create record"** button again

**Fill in the form:**

- **Record name:** Enter `www`
- **Record type:** Select **"A - Routes traffic to an IPv4 address and some AWS resources"**
- **Alias:** Toggle switch to **ON**
- **Route traffic to:**
  - Select **"Alias to CloudFront distribution"**
  - **Choose distribution:** Select the same CloudFront distribution
- **Routing policy:** Leave as **"Simple routing"**
- **Evaluate target health:** Leave **unchecked**

2. Click **"Create records"** button

### 10.4 Verify DNS Records

In your hosted zone, you should now see **4 types of records**:

- **NS** record (4 name servers) - Pre-existing
- **SOA** record (Start of Authority) - Pre-existing
- **A** record (no subdomain) → Points to CloudFront - **NEW** ✅
- **A** record (www subdomain) → Points to CloudFront - **NEW** ✅

✅ **DNS is configured!**

---

## Step 11: Test Your Custom Domain! 🎉

### 11.1 Wait for DNS Propagation

⏳ **Wait 5-30 minutes** for DNS changes to take effect

- Usually takes 5-15 minutes since domain is already in Route 53
- No external name server updates needed

### 11.2 Test Your Domains

Open browser (preferably incognito/private mode) and test:

**Test 1: Root domain**

- Visit: `https://yourdomain.com` (use YOUR actual domain)
- Should load your website with HTTPS 🔒

**Test 2: WWW subdomain**

- Visit: `https://www.yourdomain.com`
- Should also load your website with HTTPS 🔒

**Test 3: HTTPS redirect**

- Visit: `http://yourdomain.com` (HTTP, not HTTPS)
- Should automatically redirect to HTTPS version

**Test 4: React Router**

- Navigate to a project detail page
- Copy the URL
- Open new tab and paste URL
- Should load directly (not 404 error)

### 11.3 Verify SSL Certificate

1. Click the padlock icon 🔒 in address bar
2. Should say "Connection is secure"
3. Click "Certificate is valid"
4. Verify it's issued for your domain

### 11.4 Check DNS Propagation Globally

1. Go to [https://dnschecker.org](https://dnschecker.org)
2. Enter your domain: `yourdomain.com`
3. Select **"A"** record type
4. Click **"Search"**
5. Should show green checkmarks worldwide
6. Each location should resolve to CloudFront IPs

**If not all green:**

- Wait 15 more minutes
- Some locations take longer to update
- As long as most are green, you're good

---

## ✅ SUCCESS! Your Portfolio is Live!

**🎉 Congratulations! You've successfully deployed your portfolio with:**

- ✅ Custom domain (yourdomain.com)
- ✅ HTTPS/SSL security
- ✅ Global CDN (CloudFront)
- ✅ Professional production setup
- ✅ React Router working properly

**Your infrastructure:**

```
User Request (https://yourdomain.com)
        ↓
  Route 53 DNS
  (Routes to CloudFront)
        ↓
  CloudFront CDN
  (HTTPS, caching, global delivery)
        ↓
  S3 Bucket
  (Website files)
```

---

# Future Updates: How to Deploy Changes

When you make changes to your portfolio:

## 1. Build Updated Application

```powershell
npm run build
```

## 2. Upload to S3

1. Go to [S3 Console](https://console.aws.amazon.com/s3/)
2. Click your production bucket
3. Go to **Objects** tab
4. Select all existing files/folders
5. Click **"Delete"** → Confirm
6. Click **"Upload"**
7. Upload all files from `dist` folder
8. Click **"Upload"**

## 3. Invalidate CloudFront Cache

**This is CRITICAL** - forces CloudFront to fetch new files immediately.

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click your **Distribution ID**
3. Go to **Invalidations** tab
4. Click **"Create invalidation"**
5. **Object paths:** Enter `/*`
   - The `/*` means "invalidate everything"
6. Click **"Create invalidation"**

⏳ **Wait 2-5 minutes** for invalidation to complete

## 4. Verify Changes

1. Clear browser cache (Ctrl+Shift+Delete)
2. Visit your website in incognito mode
3. Your changes should be live!

**Tip:** Add `?v=2` to URL to bypass cache for testing:

- `https://yourdomain.com/?v=2`

---

**Price class:**

- Select **"Use all edge locations (best performance)"**
- Or choose based on your budget/audience

**Alternate domain names (CNAME):**

- Cl7ck **"Add item"**
- Enter: `yourdomain.com` (your actual domain)
- Click **"Add item"** again
- Enter: `www.yourdomain.com`

**Custom SSL certificate:**

- Select the certificate you created in Step 5
- If not visible, make sure certificate is "Issued" and in us-east-1 region

**Supported HTTP versions:**
8

- Check **"HTTP/2"** and **"HTTP/3"**

**Default root object:**
8

- Enter: `index.html`

**Standard logging:**

- Leave as **"Off"** (or enable if you want access logs)
  8
  **IPv6:**

- Leave **enabled** (recommended)

### 6.6 Create Distribution

1. Click the orange **"Create distribution"** button
2. **Save these important values:**
   - **Distribution ID** (e.g., `E1234567890ABC`)
   - **Distribution domain name** (e.g., `d1234567890.cloudfront.net`)

⏳ **Status will show "Deploying"** - Wait 5-15 minutes for deployment to complete

---

8

## Step 7: Configure Custom Error Pages (React Router Support)

This ensures React Router works correctly with direct URL access.

### 7.1 Wait for Deployment

1. Stay in CloudFront console
2. Wait until **Status** column shows **"Enabled"** and **Last modified** shows a timestamp
3. Refresh the page if needed

### 7.2 Add Error Response for 403 Errors

1. Click on your **Distribution ID**
2. Go to **Error pages** tab
3. Click **"Create custom error response"**

\*\*Co8.4 Test CloudFront URL

**This is the moment of truth - your site now has HTTPS! 🔒**

- **HTTP error code**: `403: Forbidden`
- **Customize error response**: Select **"Yes"**
- **Response page path**: `/index.html`
- **HTTP response code**: `200: OK`

4. Click **"Create custom error response"**

### 7.3 Add Error Response for 404 Errors

1. Click **"Create custom error response"** again

**Configure:**

- **HTTP error code**: `404: Not Found`
- **Customize error response**: Select **"Yes"**
- **Response page path**: `/index.html`
- **HTTP response code**: `200: OK`

2. Click **"Create custom error response"**

⏳ **Changes will deploy automatically (takes 2-5 minutes)**

✅ **Your CloudFront distribution is now configured!**

### 7.4 Test CloudFront URL

1. Copy your **Distribution domain name** (e.g., `d1234567890.cloudfront.net`)
2. Paste in browser: `https://d1234567890.cloudfront.net`
3. Your site should load with HTTPS! 🔒

---

## Step 5: Set Up Route 53 (Custom Domain)

### Prerequisites:

- You own a domain name
- Domain can be registered through Route 53 or transferred from another registrar

### Steps:

1. Go to [Route 53 Console](https://console.aws.amazon.com/route53/)
2. Step 9: Update Your Applicaportfolio and want to deploy updates:

###u make changes to your React app and want to deploy updates:

### 9.1 Build Updated Application

````powershell
npm run build
```Upload to S3

1. Go to [S3 Console](https://console.aws.amazon.com/s3/)
2. Click on your **production bucket name** (the NEW one you created)
3. Go to **Objects** tab
4. **Select all existing files and folders**
5. Click **"Delete"** → Confirm deletion
6. Click **"Upload"**
7. Upload all files from your `dist` folder (same as Step 5)
8. Click **"Upload"** and wait for completion

###k **"Upload"**

### 9.3 Invalidate CloudFront Cache

This forces CloudFront to fetch the new files immediately.

1. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
2. Click on your **Distribution ID**
3. Go to **Invalidations** tab
4. Click **"Create invalidation"**
5. In **Object paths**, enter: `/*`
   - This invalidates all files
6. Click **"Create invalidation"**

⏳ ** 2-5 minutes** for invalidation to complete

### 9.4 Verify Changes

1. Clear your browser cache (Ctrl+Shift+Delete)
2. Visit your website
3. Your changes should be live!

**Tip:** Add `?v=123` to URL to bypass browser cache for testing:

- `https://yourdomain.com/?v=123`

---Click **Request certificate** 3. Choose **Request a public certificate** 4. **Domain names**: Add both:

- `yourdomain.com`
- `*.yourdomain.com` (for wildcard)

5. **Validation method**: DNS validation
6. Click **Request**
7. Click on certificate ID
8. Click **Create records in Route 53** (if using Route 53)
9. ⏳ Wait for validation (usually 5-30 minutes)

## Deployment Workflow

### Initial Setup (One-time):

1. Create S3 bucket
2. Create CloudFront distribution
3. Set up Route 53 (if using custom domain)
4. Request SSL certificate

### Every Update:

```powershell
# Deploy to S3
.\deploy-to-s3.ps1 -BucketName "your-bucket-name"

# Invalidate CloudFront cache
.\invalidate-cloudfront.ps1 -DistributionId "YOUR-DISTRIBUTION-ID"
````

## Scripts Included

### `deploy-to-s3.ps1`

Builds and deploys your app to S3 with proper cache headers.

## **Usage:**

# Summary & What You've Accomplished

## Complete Setup Checklist

✅ **Step 1:** Registered domain through Route 53
✅ **Step 2:** Built React application locally
✅ **Step 3:** Created NEW S3 bucket for production
✅ **Step 4:** Configured S3 for static website hosting
✅ **Step 5:** Uploaded website files to S3
✅ **Step 6:** Requested & validated SSL certificate
✅ **Step 7:** Created CloudFront distribution
✅ **Step 8:** Configured CloudFront error pages for React Router
✅ **Step 9:** Set up DNS records in Route 53
✅ **Step 10:** Tested and verified everything works

## Your Infrastructure

```
Browser Request (https://yourdomain.com)
            ↓
     Route 53 (DNS)
     - Resolves domain to CloudFront
            ↓
     CloudFront (CDN)
     - HTTPS/SSL encryption
     - Global edge caching
     - Fast content delivery
            ↓
     S3 Bucket (NEW production bucket)
     - Hosts your React app files
     - Static website hosting enabled
```

## Resources You Created

1. **Route 53:**
   - Domain registration: `yourdomain.com`
   - Hosted zone with A records

2. **S3:**
   - NEW production bucket: `your-bucket-name`
   - Static website hosting enabled
   - Public read access policy

3. **Certificate Manager:**
   - SSL certificate for `yourdomain.com` and `*.yourdomain.com`
   - Auto-renewal enabled

4. **CloudFront:**
   - Distribution ID: `E1234567890ABC`
   - Custom domain configured
   - Error pages for React Router
   - HTTPS enforcedouter
     ✅ Step 8: Set up Route 53 + update name servers
     ✅ Step 9: Know how to update/deploy changes

**Possible causes:**

- S3 bucket policy not set correctly
- Files not uploaded to S3
- CloudFront error pages not configured

**Solutions:**

1. Go to S3 → Your bucket → Permissions → Verify bucket policy is correct
2. Go to S3 → Your bucket → Objects → Verify files are uploaded
3. Go to CloudFront → Your distribution → Error pages → Verify 403 and 404 errors redirect to index.html

### Changes not appearing on website

**Possible causes:**

- CloudFront cache not invalidated
- Browser cache
- DNS not updated

**Solutions:**

1. Create CloudFront invalidation (Step 9.3)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Try incognito/private browsing mode
4. Wait 5-10 minutes for invalidation to complete
5. Add `?v=123` to URL to test

### SSL certificate not working

## **Possible causes:**

# Next Steps & Recommendations

## Share Your Portfolio

Now that your site is live, share it:

- Update LinkedIn with your domain
- Add to resume/CV
- Share on social media
- Add to email signature
- Update GitHub profile

## Optional Enhancements

### Set up cost monitoring:

1. Go to [AWS Budgets](https://console.aws.amazon.com/billing/home#/budgets)
2. Create budget to alert if costs exceed $10/month
3. Get email alerts before unexpected charges

### Enable CloudFront access logs (track visitors):

1. CloudFront → Your distribution → Edit
2. Enable logging
3. Choose S3 bucket for logs (can use existing bucket)

### Add Google Analytics:

1. Create Google Analytics account
2. Add tracking code to your React app
3. Redeploy to see visitor statistics

### Set up CloudWatch alarms:

1. Monitor CloudFront errors
2. Get notified if site goes down
3. Track performance metrics

## Congratulations! 🎉

You now have a **professional, production-ready portfolio website** with:

- ✅ Your own registered domain
- ✅ HTTPS/SSL security
- ✅ Global CDN for fast loading
- ✅ Industry-standard architecture
- ✅ Scalable infrastructure

This is the same setup used by professional companies and is resume-worthy to mention!

**Your portfolio demonstrates:**

- Modern web development skills
- Cloud architecture knowledge
- DevOps understanding
- Production deployment experience

---

## Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Route 53 Documentation](https://docs.aws.amazon.com/route53/)
- [AWS Certificate Manager](https://docs.aws.amazon.com/acm/)
- [AWS Support](https://console.aws.amazon.com/support/)

---

## Need Help?

If you encounter issues:

1. Review the troubleshooting section above
2. Check AWS Service Health Dashboard
3. Consult AWS documentation
4. Contact AWS support (free basic support included)

**Remember:** Most issues are DNS propagation delays (wait 30-60 minutes) or cache issues (use incognito mode to test).

### HTTPS/SSL

- Certificate MUST be in **us-east-1** region for CloudFront
- SSL is FREE with AWS Certificate Manager
- Automatic renewal - no maintenance needed

### DNS Propagation

- Can take 24-48 hours (usually 1-4 hours)
- Different locations may see different results during propagation
- Use [https://dnschecker.org](https://dnschecker.org) to check status

- Trying to upload to old bucket instead of new one
- Browser issues
- Large file size
- Permission issues

**Solutions:**

1. Make sure you're in the correct **NEW production bucket**
2. Try different browser
3. Upload in smaller batches
4. Verify you have write permissions to the bucket
5. Try uploading individual files instead of folders

### Certificate validation stuck on "Pending"

**Possible causes:**

- DNS records not created in Route 53
- Waiting for propagation

**Solutions:**

1. Go to ACM → Your certificate → Check validation status
2. Make sure you clicked "Create records in Route 53"
3. Go to Route 53 → Your hosted zone → Verify CNAME validation records exist
4. Wait 30 minutes and refresh
5. If still pending after 1 hour, delete certificate and recreate

### Domain not registered / registration failed

**Possible causes:**

- Email not verified
- Payment issue
- Domain already taken

**Solutions:**

1. Check email (including spam) for verification link
2. Verify payment method in AWS Billing
3. Go to Route 53 → Pending requests → Check status
4. If failed, try different domain name
5. Contact AWS support if payment went through but domain not registered

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Route 53 Documentation](https://docs.aws.amazon.com/route53/)
- [AWS Certificate Manager](https://docs.aws.amazon.com/acm/)

## Security Best Practices

1. Never commit AWS credentials to GitHub
2. Enable CloudFront access logging for security monitoring
3. Use AWS WAF for DDoS protection (optional, extra cost)
4. Enable S3 versioning for rollback capability
5. Regularly review IAM permissions
6. Enable MFA on your AWS account

---

## Next Steps

After deployment:

- Set up monitoring with CloudWatch
- Configure CloudFront access logs
- Set up AWS Budgets to monitor costs
- Consider using AWS WAF for additional security
- Set up automated backups if needed

**Questions or issues?** Consult AWS support or AWS documentation
**Possible causes:**

- Bucket policy not set
- Files not public

**Solutions:**

1. Go to S3 → Your bucket → Permissions → Bucket policy
2. Verify policy allows public read access
3. Ensure "Block all public access" is unchecked

### Files won't upload to S3

**Possible causes:**

- Browser issues
- Large file size
- Permission issues

**Solutions:**

1. Try different browser
2. Upload in smaller batches
3. Verify you have write permissions to the bucket
4. Try uploading individual files instead of folder

- **S3**: ~$0.023 per GB stored + ~$0.09 per GB transferred
- **CloudFront**: First 1 TB/month free (first 12 months), then ~$0.085 per GB
- **Route 53**: $0.50 per hosted zone/month + $0.40 per million queries
- **SSL Certificate**: FREE with AWS Certificate Manager

**Typical portfolio site**: $1-5/month

## Troubleshooting

### Site shows 403/404 errors:

- Check S3 bucket policy is public
- Verify CloudFront custom error pages are configured
- Check files uploaded correctly to S3

### Changes not appearing:

- Run CloudFront invalidation script
- Clear browser cache
- Wait 5-10 minutes for invalidation to complete

### SSL certificate not working:

- Ensure certificate is in **us-east-1** region
- Verify certificate is validated
- Check CNAME records in CloudFront match certificate

### "Access Denied" on deployment:

- Verify AWS CLI credentials: `aws sts get-caller-identity`
- Check IAM user has S3 permissions

## Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Route 53 Documentation](https://docs.aws.amazon.com/route53/)
- [AWS CLI Reference](https://docs.aws.amazon.com/cli/)

## Security Best Practices

1. Enable CloudFront access logging
2. Use AWS WAF for DDoS protection (optional)
3. Enable S3 versioning for rollback capability
4. Regularly rotate AWS access keys
5. Use IAM roles with minimal permissions

---

**Questions or issues?** Open an issue or consult AWS support.

```

```
