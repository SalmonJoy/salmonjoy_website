export const meetingNotes=['Launch target: 18 June.','Asha will draft the FAQ by 12 June.','Pricing remains unresolved.','The QA owner has not been assigned.'];
export const freshNotes=['Mira will send the pilot invite.','Customer review is on 22 July.','The budget is not approved.'];
export const reusableBrief=`Extract actions and open questions from the approved meeting notes below.
Use only information explicitly stated in the notes. Mark missing owners and deadlines as "Not specified". Keep unresolved or unapproved decisions labelled that way. Do not infer one task's deadline from another event's date.
Return an action table: item | owner | deadline or status | supporting source sentence.
After drafting, check every row against its supporting sentence and flag anything that needs clarification.

Meeting notes:
[Paste approved, non-confidential notes here]`;
export const documents=[
 {id:'EQ-2024',status:'Archived',title:'Equipment policy · 2024',passage:'All employees may claim up to ₹3,000 for a monitor with manager approval.'},
 {id:'EQ-2026',status:'Current',title:'Equipment policy · 2026',passage:'Confirmed employees may claim up to ₹5,000 for a monitor with manager approval. Probationary employees must request a monitor from IT. Personal monitor purchases during probation are not reimbursed.'},
 {id:'CAFE-2026',status:'Current',title:'Cafeteria opening hours',passage:'The cafeteria serves lunch from noon to 2 pm on weekdays.'}
];
export const exception='Probationary employees must request a monitor from IT. Personal monitor purchases during probation are not reimbursed.';
export const tokenPieces=['The','dog','chased','the','moon','light','.'];
export const briefIngredients=[{id:'task',label:'Task',text:'Extract actions and open questions.'},{id:'source',label:'Source',text:'Use these meeting notes.'},{id:'constraints',label:'Constraints',text:'Use stated facts. Mark missing details. Keep open decisions open.'},{id:'format',label:'Format',text:'Action table with a supporting source sentence.'}];

export const ragPseudocode=`eligible_docs = filter_by_status(corpus)
passages = retrieve(question, eligible_docs)
context = preserve_relevant_conditions(passages)
if no_supporting_evidence(question, context):
    return explain_gap_and_next_step()
answer = draft_from(context)
check_claims_against_sources(answer, context)
return answer_with_sources`;
