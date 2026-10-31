export const trackNames: Record<string,string> = {work:'AI at Work',build:'Build with GenAI',teach:'Teach AI',consulting:'AI consulting / speaking',choose:'Help me choose'};
export function prepareMessage(values: Record<string,string>) {
  return `Hi Salmon,\n\nI’m ${values.name.trim()} from ${values.organization.trim()}.\n\nInterested in: ${trackNames[values.track] || 'Help me choose'}\nTeam size: ${values.size}\nLearning goal: ${values.goal.trim()}\n\nI’d love to discuss a suitable programme.\n\nThanks,\n${values.name.trim()}`;
}
export function contactLinks(message: string, track: string) {
 return {email:`mailto:salmonjoy1996@gmail.com?subject=${encodeURIComponent(`Training enquiry — ${trackNames[track] || 'Let’s explore'}`)}&body=${encodeURIComponent(message)}`,whatsapp:`https://wa.me/919029964453?text=${encodeURIComponent(message)}`};
}
