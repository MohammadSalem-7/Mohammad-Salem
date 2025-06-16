function sanitizeInput(input) {
      const div = document.createElement('div');
      div.textContent = input;
      return div.innerHTML
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/`/g, '&#96;');
    }

    const form = document.getElementById('messageForm');
    const status = document.getElementById('status');
    const submitBtn = document.getElementById('submitBtn');
    let canSubmit = true;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!canSubmit) {
        showStatus('برجاء الانتظار قليلًا قبل إرسال رسالة أخرى!', 'error');
        return;
      }

      const message = sanitizeInput(document.getElementById('message').value.trim());
      const relation = document.getElementById('relation').value;
      const name = sanitizeInput(document.getElementById('name').value.trim());

      if (!message || !relation || !name) {
        showStatus('يرجى ملء جميع الحقول!', 'error');
        return;
      }

      if (message.length > 500 || name.length > 50) {
        showStatus('الرسالة أو الاسم طويل جدًا!', 'error');
        return;
      }

      canSubmit = false;
      submitBtn.disabled = true;

      const webhookUrl = 'https://discord.com/api/webhooks/1384268562247581777/6unIc5IUTcPLShR1on-absXUH9Q0uSUs0zwvCRKT5QWnnhvr_KA1E_1JnFEWag8zJSOg';

      const payload = {
        content: null,
        embeds: [
          {
            title: 'رسالة جديدة',
            color: 0x00ffcc,
            fields: [
              { name: 'من', value: name, inline: true },
              { name: 'الصلة', value: relation, inline: true },
              { name: 'الرسالة', value: message },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      };

      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          showStatus('تم إرسال الرسالة بنجاح!', 'success');
          form.reset();
          setTimeout(() => {
            canSubmit = true;
            submitBtn.disabled = false;
          }, 5000);
        } else {
          showStatus('حدث خطأ أثناء الإرسال. حاول مرة أخرى.', 'error');
          canSubmit = true;
          submitBtn.disabled = false;
        }
      } catch (error) {
        showStatus('حدث خطأ أثناء الإرسال. تحقق من الاتصال.', 'error');
        canSubmit = true;
        submitBtn.disabled = false;
      }
    });

    function showStatus(message, type) {
      status.textContent = message;
      status.className = type;
      status.style.display = 'block';
      setTimeout(() => { status.style.display = 'none'; }, 5000);
    }
