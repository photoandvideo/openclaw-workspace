# Credential Rotation Checklist

**Status:** In Progress  
**Date Started:** April 24, 2026  
**Reason:** API keys exposed in public GitHub  

---

## ✅ When Done

1. All old keys deleted/revoked
2. All new keys generated
3. All Render env vars updated
4. All services tested
5. Delete this file

---

## 1. MINIMAX API KEY

**Old Key:** `sk-api-pQ6lvO7V4pXu1r1-p_xHVaI3ifwVlFlQ8fIzGbAONK6Z2CiTycXFl8kt9yyo5nyEwMEKKDRQDkHNMxbie3pptSzDQU20E8vH_f9g5uMdUmeADt12WOlCRqU`

### Step 1: Go to Minimax Console
- URL: https://console.minimaxi.com/
- Log in with your account

### Step 2: Delete Old Key
- Go to **API Keys** or **Settings → API Keys**
- Find the old key (should match above)
- Click **Delete** or **Revoke**

### Step 3: Create New Key
- Click **Create New Key** or **+ Generate Key**
- Copy the new key (save it somewhere safe temporarily)
- Name it: `NexcomAI-Production-2026-04-24`

### Step 4: Update Render
- Go to https://dashboard.render.com/
- Find your app: `openclaw-workspace-zoq0`
- Go to **Environment**
- Find `MINIMAX_API_KEY`
- Click **Edit** (pencil icon)
- Delete old value, paste new key
- Click **Save**

### Step 5: Test
```bash
# Once updated, test via:
curl -X POST https://openclaw-workspace-zoq0.onrender.com/api/test-chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

- [ ] Old key deleted from Minimax
- [ ] New key created
- [ ] New key in Render env var
- [ ] Test passed (API responds)

---

## 2. SENDGRID API KEY

**Old Key:** `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`

### Step 1: Go to SendGrid
- URL: https://app.sendgrid.com/
- Log in

### Step 2: Delete Old Key
- Go to **Settings → API Keys**
- Find the old key (starts with `SG.`)
- Click **Delete** (trash icon)
- Confirm deletion

### Step 3: Create New Key
- Click **Create API Key**
- Name: `NexcomAI-Resend-Backup-2026-04-24`
- Permissions: `Mail Send` (full access)
- Click **Create & Copy**
- Save temporarily

### Step 4: Update Render
- Go to https://dashboard.render.com/
- App: `openclaw-workspace-zoq0`
- **Environment**
- Find `SENDGRID_API_KEY`
- Edit: delete old, paste new
- Save

### Step 5: Test
```bash
curl -X GET https://openclaw-workspace-zoq0.onrender.com/api/test-email
```

Should return: `{"success": true}` (or Resend domain verification message)

- [ ] Old key deleted from SendGrid
- [ ] New key created
- [ ] New key in Render env var
- [ ] Test passed

---

## 3. TELEGRAM BOT TOKEN

**Old Bot Token:** `8761558045:AAHYo3qge987m0YearSXv5WsUAPkMlWjyr4`

### Step 1: Go to BotFather
- Open Telegram
- Search for **@BotFather**
- Open chat

### Step 2: Check/Delete Old Bot
- Type: `/mybots`
- Find your bot (NexcomAI or whatever it's called)
- Click on it
- Click **Edit Bot**
- Look for option to delete or regenerate token
- If "Regenerate token" exists → click it
- If not → you may need to delete and recreate

### Step 3: Option A — Regenerate (if available)
- Click **Regenerate token** 
- Copy new token
- Skip to Step 4

### Step 3: Option B — Delete & Recreate (if no regenerate)
- Go back to BotFather
- Type: `/deletebot`
- Select your old bot
- Confirm delete

Then:
- Type: `/newbot`
- Follow prompts to create new bot
- Copy new token

### Step 4: Update Render
- Go to https://dashboard.render.com/
- App: `openclaw-workspace-zoq0`
- **Environment**
- Find `TELEGRAM_BOT_TOKEN`
- Edit: paste new token
- Save

### Step 5: Test (Optional)
- Send a message to your bot on Telegram
- Check that it responds (if webhook is set up)

- [ ] Old token deleted/regenerated in Telegram
- [ ] New token created
- [ ] New token in Render env var
- [ ] Tested (optional)

---

## 4. TWILIO CREDENTIALS

**Old Credentials:**
- SID: `AC831290d16c13e7903a20f4e085ff5937`
- Token: `29bd832e260b61e8488fb7a0d5b1df1a`
- Phone: `+18443146777`

### Step 1: Go to Twilio
- URL: https://www.twilio.com/console
- Log in

### Step 2: Get Current SID (don't delete, just verify)
- Your Account SID is shown on the dashboard
- This **cannot be deleted** — it's tied to your account
- Write it down: `AC________________`

### Step 3: Revoke Old Auth Token
- Go to **Settings → API Keys & Tokens**
- Find your current auth token
- Click **Revoke** (next to the old token)
- Confirm revocation

### Step 4: Generate New Auth Token
- In **Settings → API Keys & Tokens**
- Click **+ Create API Key**
- Select **Standard** (or keep current type)
- Click **Create**
- Copy the new token (you won't see it again!)

### Step 5: Update Render
- Go to https://dashboard.render.com/
- App: `openclaw-workspace-zoq0`
- **Environment**
- Find `TWILIO_SID` → paste your SID
- Find `TWILIO_TOKEN` → paste new token
- Find `TWILIO_PHONE` → should stay `+18443146777` (don't change)
- Save all

### Step 6: Test
```bash
curl -X POST https://openclaw-workspace-zoq0.onrender.com/api/test-sms \
  -H "Content-Type: application/json" \
  -d '{"phone": "+1234567890", "message": "Test"}'
```

(This will fail until A2P is approved, but should not give auth errors)

- [ ] Old token revoked in Twilio
- [ ] New token generated
- [ ] New token in Render env var
- [ ] SID verified in Render env var
- [ ] Test attempted (no auth errors = success)

---

## FINAL CHECKS

Once all 4 are done:

### Check Render Restart
- Render auto-restarts when you update env vars
- You should see new deployments in the **Deployments** tab
- All 4 updates should have triggered 4 deployments

### Test Full System
```bash
curl https://openclaw-workspace-zoq0.onrender.com/
# Should respond with status OK
```

### Verify No Old Credentials in Git
```bash
cd ~/.openclaw/workspace
git log --all --full-history -S "SG.9MOtDLSjRr" -- .
# Should return nothing (if filter-repo worked)
```

### Clean Up
- Delete this file once all done
- Delete any local `.env.txt` backups on your machine

---

## Summary Checklist

- [ ] Minimax key rotated + Render updated + tested
- [ ] SendGrid key rotated + Render updated + tested
- [ ] Telegram token rotated + Render updated + tested
- [ ] Twilio token rotated + Render updated + tested
- [ ] Render shows 4 new deployments
- [ ] API health check passes
- [ ] This file deleted

---

**Time estimate:** 45-60 minutes (mostly waiting for Render to deploy)

**Questions?** Message Finn (@hugodjordan on Telegram).

---

*Created: 2026-04-24 · Security critical*
