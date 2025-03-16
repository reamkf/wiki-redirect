import React from 'react';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
  card: {
    backgroundColor: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.5rem',
    padding: '2rem',
    maxWidth: '28rem',
    width: '100%',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '1.5rem',
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    padding: '1rem',
    borderRadius: '0.375rem',
    border: '1px solid #dbeafe',
    marginBottom: '1.5rem',
  },
  paragraph: {
    color: '#374151',
    marginBottom: '1rem',
  },
  button: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
  },
  buttonHover: {
    backgroundColor: '#2563eb',
  },
  smallText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginTop: '0.5rem',
  },
  code: {
    backgroundColor: '#f3f4f6',
    padding: '0 0.25rem',
    borderRadius: '0.125rem',
  },
};

export default function HomePage() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Wiki リダイレクトサービス
        </h1>

        <div style={styles.infoBox}>
          <p style={styles.paragraph}>
            リダイレクト先が指定されていません。
          </p>

          <div>
            <a
              href="/dojo"
              style={styles.button}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            >
              最新の道場ページへ移動
            </a>

            <p style={styles.smallText}>
              <span style={{fontWeight: '500'}}>/dojo</span> にアクセスすると最新の道場ページへリダイレクトされます。
            </p>
          </div>
        </div>

        <div style={{marginTop: '1rem'}}>
          <p style={styles.smallText}>その他の任意の文字列を指定するとそのページ名を持つページへリダイレクトされます。</p>
          <p style={{...styles.smallText, marginTop: '0.5rem'}}>
            例: <code style={styles.code}>/page/ページ名</code>
          </p>
        </div>
      </div>
    </div>
  );
}