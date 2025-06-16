const form = document.getElementById('messageForm');
    const status = document.getElementById('status');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const message = document.getElementById('message').value;
      const relation = document.getElementById('relation').value;
      const name = document.getElementById('name').value;

      if (!message || !relation || !name) {
        showStatus('يرجى ملء جميع الحقول!', 'error');
        return;
      }

      const webhookUrl = 'https://discord.com/api/webhooks/1384268562247581777/6unIc5IUTcPLShR1on-absXUH9Q0uSUs0zwvCRKT5QWnnhvr_KA1E_1JnFEWag8zJSOg'; 

      const payload = {
        content: null,
        embeds: [{
          title: 'رسالة جديدة',
          color: 0x00ffcc,
          fields: [
            { name: 'من', value: name, inline: true },
            { name: 'الصلة', value: relation, inline: true },
            { name: 'الرسالة', value: message }
          ],
          timestamp: new Date().toISOString()
        }]
      };

      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          showStatus('تم إرسال الرسالة بنجاح!', 'success');
          form.reset();
        } else {
          showStatus('حدث خطأ أثناء الإرسال. حاول مرة أخرى.', 'error');
        }
      } catch (error) {
        showStatus('حدث خطأ أثناء الإرسال. تحقق من الاتصال.', 'error');
      }
    });

    function showStatus(message, type) {
      status.textContent = message;
      status.className = type;
      status.style.display = 'block';
      setTimeout(() => { status.style.display = 'none'; }, 5000);
    }
