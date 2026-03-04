export default function MessageBubble({ msg }) {
  return (
    <div className={`message ${msg.role}`}>
      {msg.text}
    </div>
  );
}