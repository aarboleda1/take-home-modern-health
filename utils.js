export default function keyFromMessage(message) {
  return message.uuid + message.content + message.sentAt
}