import{r as M,j as n,a as e,F as $,R as C,b as z,c as he,T as ee,d as pe,e as R,f as I,I as j,g as K,h as X,i as ue,C as te,S as ge,M as ne,k as fe,l as me,m as W,u as q,Q as k,n as ie,p as ae,o as be,q as F,s as xe,t as ve,v as se,L as V,A as B,D as re,w as le,x as oe}from"./index-3262ec82.js";const ye=({questions:t,setQuestions:i,isTimeBounded:u,errors:p,quizId:A,queErrorCheck:T,handleValidateQuestions:_})=>{var Y;const[g,P]=M.useState("input");M.useRef([]);const b=(l,o)=>{const v={...t};v.questions[o].type=l.target.value,["radio","dropdown","check-box"].includes(l.target.value)?v.questions[o].options=["option 1"]:["input","text-area"].includes(l.target.value)&&(v.questions[o].options=void 0),i(v)},w=l=>{const o={...t},v=`option ${o.questions[l].options.length+1}`;o.questions[l].options.push(v),i(o)},x=(l,o)=>{const v={...t};v.questions[o].question=l.target.value,i(v)},c=(l,o)=>{const v={...t};v.questions[o].img=l.target.files[0],i(v)},h=l=>{const o={...t};o.questions[l].img=void 0,i(o)},d=(l,o,v)=>{const S={...t},O=S.questions[l].answer,L=S.questions[l].type,U=S.questions[l].options;L==="check-box"?s(l)({target:{value:U[o]}}):S.questions[l].options[o]===O&&(S.questions[l].answer=""),S.questions[l].options[o]=v,i(S)},f=(l,o)=>{if(u===!1)return;const v={...t};v.questions[o].answer=l.target.value,i(v)},s=(l,o)=>v=>{if(u===!1)return;const S={...t},O=encodeURIComponent(v.target.value),L=S.questions[l].answer.split(",").filter(Boolean);o??L.includes(O)?L.splice(L.indexOf(O),1):L.push(O),S.questions[l].answer=Array.from(new Set(L)).join(","),i(S)},m=(l,o)=>{const v={...t},S=v.questions[l].options,O=v.questions[l].answer;v.questions[l].type==="check-box"?s(l,!0)({target:{value:S[o]}}):v.questions[l].options[o]===O&&(v.questions[l].answer=""),v.questions[l].options.splice(o,1),i(v)},a=l=>{const o={...t};o.questions.splice(l,1),i(o)},r=()=>{const l=t.questions.length-1;if(t.questions.length>0)if(t.questions[l].question!==""){const o={...t};o.questions.push({type:"radio",options:["option1"],question:"",answer:u?"":void 0}),i(o),l>=0&&N(l)}else T();else{const o={...t};console.log(o),o.questions.push({type:"radio",options:["option1"],question:"",answer:u?"":void 0}),i(o)}},N=async l=>{try{const o={question:t.questions[l].question,questionType:t.questions[l].type,answerOptions:t.questions[l].answer};console.log(o);const v=await W.quizs.questions(o,A);toast.success(v.message)}catch(o){console.error(o)}finally{setLoading(!1)}},G={gray:"text-[#A5A5A5]"};return n("div",{className:"space-y-5",children:[(Y=t.questions)==null?void 0:Y.map((l,o)=>{var v,S,O,L,U;return e("div",{className:"rounded-lg bg-white px-5 py-5 shadow-[0px_2px_3px_#00000029]",children:n("div",{className:"items-top mb-5 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8",children:[n("div",{children:[n("p",{className:"mb-2.5 mt-2 text-18px font-black text-text-black",children:["Question ",o+1]}),e("select",{className:"w-full rounded-[4px] border border-[#d1d1d1] p-2.5 text-16px",value:l.type||g,onChange:y=>b(y,o),fullWidth:!0,children:u?n($,{children:[e("option",{value:"radio",children:"Radio Button"}),e("option",{value:"check-box",children:"Checkboxes"}),e("option",{value:"dropdown",children:"Dropdown"})]}):n($,{children:[e("option",{value:"input",children:"Text Box"}),e("option",{value:"text-area",children:"Text Area"}),e("option",{value:"radio",children:"Radio Button"}),e("option",{value:"check-box",children:"Checkboxes"}),e("option",{value:"dropdown",children:"Dropdown"})]})}),n("p",{className:"mt-1 "+G.gray,children:[e(C,{className:"inline align-text-bottom text-[1.1em]"})," Question Type"]})]}),n("div",{children:[e(we,{question:l,placeholder:"Enter your question",value:l.question,onChange:y=>x(y,o),endSlot:l.img?e("button",{type:"button",onClick:()=>h(o),children:e(z,{fontSize:"1.2em",color:"inherit"})}):n("label",{className:"flex",onChange:y=>c(y,o),children:[e(he,{fontSize:"1.2em",color:"inherit"}),e("input",{hidden:!0,type:"file",accept:"image/*"})]})}),l.type==="input"&&e("div",{children:u===!0&&e(ee,{margin:"normal",fullWidth:!0,variant:"outlined",placeholder:"Answer",value:l.answer,onChange:y=>handleInputAnswerChange(y,o)})}),l.type==="text-area"&&e("div",{children:u===!0&&e(ee,{fullWidth:!0,margin:"normal",variant:"outlined",multiline:!0,placeholder:"Answer",rows:4,value:l.answer,onChange:y=>f(y,o)})}),l.type==="radio"&&e("div",{className:"pt-2",children:e(pe,{children:(v=l.options)==null?void 0:v.map((y,E)=>n("div",{className:"flex items-center",children:[e(R,{value:y,control:e(I,{}),label:y,checked:y===l.answer,onChange:D=>f(D,o),disabled:u===!1}),e(j,{onClick:()=>{const D=window.prompt("Enter new text:",y);D!==null&&D!==""&&d(o,E,D)},size:"small",children:e(K,{})}),e(j,{onClick:()=>m(o,E),size:"small",children:e(X,{})})]},E))})}),l.type==="check-box"&&e("div",{children:e(ue,{children:(S=l.options)==null?void 0:S.map((y,E)=>n("div",{style:{display:"flex",alignItems:"center"},children:[e(R,{value:y,control:e(te,{checked:u===!0&&l.answer.split(",").includes(encodeURIComponent(y))}),label:y,onChange:s(o),disabled:u===!1}),e(j,{onClick:()=>{const D=window.prompt("Enter new text:",y);D!==null&&D!==""&&d(o,E,D)},size:"small",children:e(K,{})}),e(j,{onClick:()=>m(o,E),size:"small",children:e(X,{})})]},E))})}),l.type==="dropdown"&&n("div",{className:"pt-1",children:[n(ge,{className:"my-[15px] w-full "+(!u&&"!hidden"),labelId:`demo-simple-select-label-${o}`,id:`demo-simple-select-${o}`,value:u===!1?l.options[0]:l.answer||"nil",onChange:y=>f(y,o),disabled:u===!1,children:[e(ne,{value:"nil",disabled:!0,children:"Select Answer"}),(O=l.options)==null?void 0:O.map((y,E)=>e(ne,{value:y,children:y},E))]}),(L=l.options)==null?void 0:L.map((y,E)=>n("div",{style:{display:"flex",alignItems:"center"},children:[e("span",{children:y}),e(j,{onClick:()=>{const D=window.prompt("Enter new text:",y);D!==null&&D!==""&&d(o,E,D)},size:"small",children:e(K,{})}),e(j,{onClick:()=>m(o,E),size:"small",children:e(X,{})})]},E))]}),((U=p==null?void 0:p.find(([y])=>y===o))==null?void 0:U[1])&&n("p",{className:"text-small mt-2 text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em]"}),p.find(([y])=>y===o)[1]]}),["radio","check-box","dropdown"].includes(l.type)&&e("div",{className:"-ml-3 flex cursor-pointer items-center rounded-md pl-3 hover:bg-paper",children:e(R,{className:"!cursor-pointer",value:"add new option",control:l.type==="radio"?e(I,{}):e(te,{}),label:e("span",{className:"text-primary",children:"Add new option"}),onClick:()=>w(o),disabled:!0})}),e("div",{className:"mt-5 flex",children:e("button",{className:"ml-auto text-[1.2em]",variant:"contained",onClick:()=>a(o),children:e(z,{})})})]})]},o)})}),e("div",{className:"rounded-lg text-center bg-white px-5 py-5 shadow-[0px_2px_3px_#00000029]",children:n("button",{className:"text-primary",onClick:r,children:[e(fe,{className:"text- inline"})," Add New Question"]})})]})};function we({endSlot:t,question:{img:i},...u}){const[p,A]=me.useState("");return M.useEffect(()=>{if(!i){A("");return}const T=URL.createObjectURL(i);return A(T),()=>URL.revokeObjectURL(T)},[i]),n($,{children:[n("div",{className:"flex items-center border-b border-[#d1d1d1] focus-within:border-primary ",children:[e("input",{className:"w-full px-0.5 py-2.5 text-16px outline-none ",...u}),t]}),p&&e("div",{className:"border-b border-[#d1d1d1] pb-2.5",children:e("img",{className:"mt-2.5 w-full rounded-md",src:p,alt:"question img"})})]})}const Ne={gray:"text-[#A5A5A5]"};function Pe({quiz:t,setQuiz:i,quizId:u,errors:p,queErrorCheck:A}){M.useState([]);const T=q("departments",()=>W.departments()),_=d=>{i(f=>({...f,teams:[...f.teams,d]}))},g=d=>{i(f=>({...f,teams:f.teams.filter(s=>s!==d)}))},P=()=>{i(d=>({...d,teams:[]}))},b=()=>{i(d=>({...d,individuals:[]}))},w=()=>{i(d=>({...d,groups:[]}))},x=()=>{const d=t.groups.length-1;if(t.groups.length>0)if(t.groups[d].label!==""&&t.groups[d].participants.length>1){const f={label:"",participants:[]};i(s=>({...s,groups:[...s.groups,f]})),d>=0&&c(d)}else A();else{const f={label:"",participants:[]};i(s=>({...s,groups:[...s.groups,f]}))}},c=async d=>{try{const f=t.groups[d].participants.join(","),s={groupName:t.groups[d].label,participants:f},a=(await W.quizs.addGroup(s)).id;i(r=>({...r,groupIds:[...r.groupIds,a]})),k.success("Added")}catch(f){console.error("Error adding group:",f)}},h=d=>{var f;return(f=p==null?void 0:p.find(([s])=>s===d))==null?void 0:f[1]};return n("div",{children:[e("div",{className:"rounded-lg bg-white px-5 py-6 drop-shadow-md",children:n("div",{className:"grid md:grid-cols-[1fr_2fr] items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Select Participant Type"}),e("p",{className:"mt-2.5 "+Ne.gray,children:"Employees earn rewards based on individual's/teams's performance"})]}),n("div",{className:"flex flex-col md:flex-row gap-4",children:[e("button",{onClick:()=>{i(d=>({...d,participantType:"all"}))},className:t.participantType==="all"?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-10":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-10",children:"All"}),e("button",{onClick:()=>{i(d=>({...d,participantType:"teams"})),b(),w()},className:t.participantType==="teams"?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-9":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-9",children:"teams"}),e("button",{onClick:()=>{i(d=>({...d,participantType:"individual"})),w(),P()},className:t.participantType==="individual"?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5",children:"Individual"}),e("button",{onClick:()=>{i(d=>({...d,participantType:"groups"})),b(),P()},className:t.participantType==="groups"?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-2":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-2",children:"+ Create Group"})]})]})}),t.participantType==="teams"&&e("div",{className:"rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2",children:n("div",{className:"grid grid-cols-[1fr_2fr] items-center gap-8",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:"Select teams"})}),n("div",{children:[e("select",{className:"w-full p-2 border rounded",onChange:d=>{const f=Array.from(d.target.options).filter(m=>m.selected).map(m=>m.value),s=[...t.teams];f.forEach(m=>{s.includes(m)?g(m):_(m)})},multiple:!0,value:t.teams,children:T.data.map(d=>e("option",{value:d.id,children:d.name},d.id))}),h("teams")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),h("teams")]})]})]})}),t.participantType==="individual"&&e("div",{className:"rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2",children:n("div",{className:"grid grid-cols-[1fr_2fr] items-center gap-8",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:"Select Individual Participant"})}),n("div",{children:[e("div",{className:"rounded border-[2px] ring-primary focus-within:ring-1 ",children:e("ul",{className:"group p-2",children:e(ce,{quiz:t,setQuiz:i})})}),h("individual")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),h("individual")]})]})]})}),t.participantType=="groups"&&t.groups.map((d,f)=>e("div",{className:"relative",children:n("div",{className:"rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2",children:[e("button",{className:"absolute top-0 right-0 p-2 text-gray-500",onClick:()=>{const s=t.groups.filter((m,a)=>a!==f);i(m=>({...m,groups:s}))},children:"✕ "}),n("div",{className:"grid grid-cols-[1fr_2fr] items-center gap-8",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:`Group ${f+1}`})}),n("div",{children:[e("input",{className:"w-full py-2 px-2 my-4 rounded border-[2px]",type:"text",onChange:s=>{const m=[...t.groups];m[f].label=s.target.value,i(a=>({...a,groups:m}))},placeholder:"Name the Group"}),h("groupLabel")&&t.groups.length-1==f&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),h("groupLabel")]}),e("div",{className:"rounded border-[2px] ring-primary focus-within:ring-1",children:e("ul",{className:"group p-2",children:e(ce,{quiz:t,setQuiz:i,groupIndex:f})})}),h("groupParticipants")&&t.groups.length-1==f&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),h("groupParticipants")]})]})]})]})},f)),t.participantType==="groups"&&n($,{children:[e("button",{className:"text-primary mt-2 mx-4",onClick:x,children:"+ Add new group"}),h("groups")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),h("groups")]})]})]})}function ce({quiz:t,setQuiz:i,groupIndex:u}){const[p,A]=M.useState(!1),T=q("users",()=>W.users.profiles(),{initialData:[]}),_=q("me",()=>W.auth.me(be.get("user_id"))),g=T.isLoading?[]:T.data.filter(s=>s.id!==_.data.id),[P,b]=me.useState(""),w=g.filter(s=>JSON.stringify(s).toLocaleLowerCase().includes(P)),x=s=>t.individuals.includes(s.id),c=s=>{var a,r;const m=(a=t.groups)==null?void 0:a[u];return(r=m==null?void 0:m.participants)==null?void 0:r.includes(s.id)},h=t.participantType==="individual"?t.individuals:t.groups.reduce((s,m,a)=>a!==u?s.concat(m.participants):s,[]),d=w.filter(s=>!h.includes(s.id)&&(t.participantType==="individual"?!c(s):!x(s))),f=28;return n($,{children:[n("span",{className:"flex cursor-pointer gap-[2px] hover:font-bold",onClick:()=>A(!p),children:[t.participantType==="individual"&&e("span",{className:"flex flex-wrap recipients-grid gap-2",children:t.individuals.length>0?t.individuals.map(s=>{const m=g.find(a=>a.id===s);return e("span",{className:"border-[2px] px-2 py-1 rounded-lg mx-1",children:m?n("span",{className:"",children:[m.full_name," ",e("button",{className:"ml-1 text-black cursor-pointer",onClick:()=>{i(a=>(x(m)?a.individuals=a.individuals.filter(r=>r!==m.id):a.individuals.push(m.id),{...a}))},children:"✕"})]}):""},s)}):e("p",{className:"text-[#ACACAC]",children:"Add member by Name or Email Id"})}),t.participantType==="groups"&&e("span",{className:"flex flex-wrap recipients-grid gap-2",children:t.groups[u].participants.length>0?t.groups[u].participants.map(s=>{const m=g.find(a=>a.id===s);return e("span",{className:"border-[2px] px-2 py-1 rounded-lg mx-1",children:m?n("span",{className:"",children:[m.full_name," ",e("button",{className:"ml-1 text-black cursor-pointer",onClick:()=>{i(a=>{const r=[...a.groups],N=r[u];return N.participants=N.participants.filter(G=>G!==m.id),{...a,groups:r}})},children:"✕ "})]}):""},s)}):e("p",{className:"text-[#ACACAC]",children:"Add members by Name or Email Id"})})]}),p&&n("div",{className:"absolute z-10 hidden divide-y overflow-hidden rounded bg-white text-black shadow shadow-gray-400 group-hover:block",children:[e("div",{style:{height:5*f},className:"overflow-y-auto",children:T.isLoading?e("p",{className:"absolute inset-0 m-auto h-10 w-[15ch] text-center text-gray-500",children:"Loading..."}):e("div",{children:d==null?void 0:d.map(s=>e("button",{style:{height:f},className:`block w-full  px-4 py-1 text-left ${x(s)||c(s)?"border-b border-primary/80 bg-primary/30":""}`,type:"button",onClick:()=>{t.participantType==="individual"?i(m=>(x(s)?m.individuals=m.individuals.filter(a=>a!==s.id):m.individuals.push(s.id),{...m})):t.participantType==="groups"&&i(m=>{const a=[...m.groups],r=a[u];return c(s)?r.participants=r.participants.filter(N=>N!==s.id):(r.participants.push(s.id),a.forEach((N,G)=>{G!==u&&(N.participants=N.participants.filter(Y=>Y!==s.id))})),{...m,groups:a}})},children:n("div",{className:"flex items-center",children:[e("span",{children:e("img",{className:"h-6 w-6 rounded-full mr-2",src:ie(`${s==null?void 0:s.full_name.split(" ")[0]} ${s==null?void 0:s.full_name.split(" ")[1]}`,ae(s==null?void 0:s.avtar)).src,alt:ie(`${s==null?void 0:s.full_name.split(" ")[0]} ${s==null?void 0:s.full_name.split(" ")[1]}`,ae(s==null?void 0:s.avtar)).alt,onError:m=>{m.target.onerror=null,m.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent((s==null?void 0:s.full_name.split(" ")[0].charAt(0))+(s==null?void 0:s.full_name.split(" ")[1].charAt(0)))}&color=#464646&background=FFFFFF`}})}),e("span",{className:"font-bold",children:`${s.full_name}`}),` | ${s.title} - ${s.department}`]})},s.id))})}),e("input",{className:"bg-translucent px-2 py-1",onChange:s=>b(s.target.value),placeholder:"Search Participants",value:P})]})]})}const Ce=({rulesNRewards:t,setRulesNRewards:i,errors:u})=>{const p=(c,h)=>{i(d=>({...d,[c]:h}))},A=c=>{c==="Participant"?i(h=>({...h,participationRewards:!h.participationRewards})):c==="Winner"&&i(h=>({...h,winnerRewards:!h.winnerRewards}))},T=c=>{i(h=>({...h,participationRewardsType:c}))},_=c=>{i(h=>({...h,assignRulesTime:c}))},g=c=>{i(h=>({...h,assignPointsType:c}))},P=c=>{if(t.winnerPositions.length<c){const h=Array(c-t.winnerPositions.length).fill().map((d,f)=>({position_name:`Position ${t.winnerPositions.length+f+1}`,position:t.winnerPositions.length+f+1,points:0}));i(d=>({...d,winnerPositions:[...d.winnerPositions,...h]}))}t.winnerPositions.length>c&&i(h=>({...h,winnerPositions:h.winnerPositions.slice(0,c)}))};function b(c){const h=c%10;if(Math.floor(c%100/10)===1)return"th";switch(h){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}function w(c){return c===0?"First":c===1?"Second":c===2?"Third":c===3?"Fourth":c===5?"Fifth":`${c+1}${b(c+1)} Position`}const x=c=>{var h;return(h=u==null?void 0:u.find(([d])=>d===c))==null?void 0:h[1]};return e("div",{children:n("div",{className:"rounded-lg bg-white px-5 py-6 drop-shadow-md",children:[n("div",{className:"grid md:grid-cols-[1fr_2fr] items-center gap-40",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:"Select Points Criteria"})}),n("div",{className:"flex gap-2",children:[e("button",{onClick:()=>A("Participant"),className:t.participationRewards?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5",children:"Particpation Points"}),e("button",{onClick:()=>A("Winner"),className:t.winnerRewards?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5",children:"Winner Points"}),x("rewards")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),x("rewards")]})]})]}),t.participationRewards===!0&&e("hr",{className:"border-px my-6 border-400"}),t.participationRewards===!0&&n("div",{className:"grid md:grid-cols-[1fr_2fr] items-center gap-40 my-10",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:"Select Points Receivers"})}),n("div",{className:"flex flex-col  gap-10",children:[n("div",{className:"flex gap-8",children:[n("label",{className:"flex gap-2",children:[e("input",{type:"checkbox",checked:t.participationRewardsType==="all",onChange:()=>T("all"),className:"h-6 w-6"}),"All Participants"]}),n("label",{className:"flex gap-2",children:[e("input",{type:"checkbox",checked:t.participationRewardsType==="few",onChange:()=>T("few"),className:"h-6 w-6"}),"Few Participants"]}),e("div",{children:x("participationRewardsType")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),x("participationRewardsType")]})})]}),t.participationRewardsType==="all"&&n("div",{className:"flex items-center gap-4",children:[e("input",{type:"number",className:"border-[1px] border-[#909090] rounded w-20 p-1",min:0,onChange:c=>p("allParticipationPoints",Number(c.target.value))}),e("span",{children:"Points to be given"}),e("div",{children:x("allParticipationPoints")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),x("allParticipationPoints")]})})]}),t.participationRewardsType==="few"&&n($,{children:[n("div",{className:"flex items-center gap-2",children:[e("span",{children:"First"}),e("input",{type:"number",className:"border-[1px] border-[#909090] rounded w-16 p-1",min:0,onChange:c=>p("units",Number(c.target.value))}),e("span",{children:"Participants will get points"}),e("input",{type:"number",className:"border-[1px] border-[#909090] rounded w-16 p-1",min:0,onChange:c=>p("unitPoints",Number(c.target.value))})]}),e("div",{children:x("unitPoints")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),x("unitPoints")]})})]})]})]}),t.winnerRewards===!0&&e("hr",{}),t.winnerRewards===!0&&n("div",{className:"grid md:grid-cols-[1fr_2fr] items-center gap-40 my-10",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:"Assign Rule"})}),n("div",{className:"flex flex-col gap-4",children:[n("div",{className:"flex gap-8",children:[n("label",{className:"flex gap-2",children:[e("input",{type:"checkbox",checked:t.assignRulesTime==="now",onChange:()=>_("now"),className:"w-6 h-6"}),"Now"]}),n("label",{className:"flex gap-2",children:[e("input",{type:"checkbox",checked:t.assignRulesTime==="later",onChange:()=>_("later"),className:"w-6 h-6"}),"Later"]}),e("div",{children:x("assignRulesTime")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),x("assignRulesTime")]})})]}),t.assignRulesTime==="now"&&n("div",{className:"flex items-center gap-2",children:[e("span",{children:"How many winners?"}),e("input",{type:"number",className:"border-[1px] border-[#909090] rounded w-20 p-1",value:t.numberOfWinners,min:0,onChange:c=>p("numberOfWinners",Number(c.target.value))}),e("div",{children:x("numberOfWinners")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),x("numberOfWinners")]})})]})]})]}),t.assignRulesTime==="now"&&t.numberOfWinners!==0&&t.winnerRewards===!0&&n("div",{className:"grid md:grid-cols-[1fr_2fr] items-center gap-40 my-10",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:"Assign Points"})}),n("div",{className:"flex flex-col gap-4",children:[n("div",{className:"flex gap-8",children:[n("label",{className:"flex gap-2",children:[e("input",{type:"checkbox",checked:t.assignPointsType==="equal",onChange:()=>g("equal"),className:"w-6 h-6"}),"Equal Points"]}),n("label",{className:"flex gap-2",children:[e("input",{type:"checkbox",checked:t.assignPointsType==="positionBased",onChange:()=>g("positionBased"),className:"w-6 h-6"}),"Position Based"]}),e("div",{children:x("assignPointsType")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),x("assignPointsType")]})})]}),t.assignPointsType==="equal"&&n($,{children:[n("div",{className:"flex items-center gap-4",children:[e("span",{children:"Points to be given?"}),e("input",{type:"number",value:t.allWinnerPoints,min:0,className:"border-[1px] border-[#909090] rounded w-20 p-1",onChange:c=>p("allWinnerPoints",c.target.value)})]}),e("div",{children:x("allWinnerPoints")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),x("allWinnerPoints")]})})]}),t.assignPointsType==="positionBased"&&e("div",{children:n("div",{className:"flex flex-col gap-4",children:[n("div",{className:"flex items-center gap-4",children:[e("span",{children:"First"}),e("input",{type:"number",min:0,className:"border-[1px] border-[#909090] rounded w-20 p-1",onChange:c=>P(c.target.value)}),e("span",{children:"Positions"}),x("winnerPositionsLength")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),x("winnerPositionsLength")]})]}),t.winnerPositions.length>0&&e("div",{className:"flex flex-col gap-4",children:Array.from({length:t.winnerPositions.length},(c,h)=>n("div",{className:"flex items-center gap-4",children:[n("span",{children:[h+1,b(h+1)," Position"]}),e("input",{type:"number",className:"border-[1px] border-[#909090] rounded w-20 p-1",value:t.winnerPositions[h].points,min:0,onChange:d=>{const f=[...t.winnerPositions],s=h,m={position_name:w(h),position:s+1,points:Number(d.target.value)};f[s]=m,p("winnerPositions",f)}}),e("span",{children:"Points"}),x("winnerPositionsPoint")&&t.winnerPositions[h].points===0&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),x("winnerPositionsPoint")]})]},h))})]})})]})]})]})})};F.extend(xe);const Q={gray:"text-[#A5A5A5]"},Te=({details:t,setDetails:i,errors:u})=>{const p=F();F();const A=p.startOf("day"),T=(b,w)=>{i(x=>({...x,[b]:w}))},_=(b,w)=>{const x=F(w).format("YYYY-MM-DD HH:mm:ss");i(c=>({...c,dateAndTime:{...c.dateAndTime,[b]:x}}))},g=(b,w)=>{const x=F(w).format("YYYY-MM-DD HH:mm:ss");i(c=>({...c,dateAndTime:{...c.dateAndTime,[b]:x}}))},P=b=>{var w;return(w=u==null?void 0:u.find(([x])=>x===b))==null?void 0:w[1]};return n("div",{className:"rounded-lg bg-white px-5 py-10 shadow-[0px_2px_3px_#00000029]",children:[n("div",{className:"grid md:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Title*"}),e("p",{className:"mt-2.5 "+Q.gray,children:"Survey Title goes here"})]}),n("div",{children:[e("div",{children:e(ve,{size:"lg",placeholder:"Ex: Go Green, Plant Trees",value:t.title,onChange:b=>T("title",b.target.value)})}),n("p",{className:"text-right "+Q.gray,children:[t.title.length,"/75"]}),P("title")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),P("title")]})]})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid md:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Description*"}),e("p",{className:"mt-2.5 "+Q.gray,children:"Maximum 150 words"})]}),n("div",{children:[e("div",{children:e(se,{value:t.description,className:"react-quill",onChange:b=>{i(w=>({...w,description:b}))},placeholder:"Describe your campaign",modules:{toolbar:[[{header:"1"},{header:"2"},{font:[]}],[{list:"ordered"},{list:"bullet"}],["bold","italic","underline","strike"],["link"],[{color:[]},{background:[]}],[{align:[]}],["clean"]]}})}),n("p",{className:"text-right "+Q.gray,children:[t.description.length,"/150 Words"]}),P("description")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),P("description")]})]})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid md:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Date*"}),e("p",{className:"mt-2.5 "+Q.gray,children:"Mention the Campaign date and time"})]}),n("div",{children:[n("div",{className:"dateTimeContainer-green flex items-center gap-4",children:[e("span",{className:"min-w-[70px] text-18px font-bold",children:"Start"}),e(V,{dateAdapter:B,children:e(re,{className:"input-container",defaultValue:p,disablePast:!0,onChange:b=>_("start",b)})}),e(V,{dateAdapter:B,children:e(le,{className:"input-container",defaultValue:A,onChange:b=>_("start",b)})})]}),n("div",{className:"dateTimeContainer-red mt-2 flex items-center gap-4",children:[e("span",{className:"min-w-[70px] text-18px font-bold",children:"End"}),e(V,{dateAdapter:B,children:e(re,{className:"input-container",defaultValue:p,disablePast:!0,onChange:b=>g("end",b)})}),e(V,{dateAdapter:B,children:e(le,{className:"input-container",defaultValue:A,disablePast:!0,onChange:b=>g("end",b)})})]}),P("dateAndTime")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),P("dateAndTime")]})]})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid md:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Terms & Conditions"}),e("p",{className:"mt-2.5 "+Q.gray,children:"Describe the Terms & Conditions of the campaign"})]}),n("div",{children:[e("div",{children:e(se,{value:t.termsAndConditions,className:"react-quill",onChange:b=>{i(w=>({...w,termsAndConditions:b}))},placeholder:"Describe your campaign",modules:{toolbar:[[{header:"1"},{header:"2"},{font:[]}],[{list:"ordered"},{list:"bullet"}],["bold","italic","underline","strike"],["link"],[{color:[]},{background:[]}],[{align:[]}],["clean"]]}})}),n("p",{className:"text-right "+Q.gray,children:[t.termsAndConditions.length,"/150 words"]}),P("termsAndConditions")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),P("termsAndConditions")]})]})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid md:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Is it Time Bounded Survey"}),e("p",{className:"mt-2.5 "+Q.gray,children:"Set time limit in minutes"})]}),n("div",{children:[n("label",{className:"flex items-center gap-3",children:[e("input",{type:"number",className:"w-0 min-w-[6ch] rounded-[4px] border border-[#d1d1d1] px-1 py-2",value:t.timing.duration,onChange:b=>i(w=>({...w,timing:{...w.timing,duration:b.target.value}}))}),"Minute(s)"]}),P("duration")&&n("p",{className:"text-sm text-red-500",children:[e(C,{className:"inline align-text-bottom text-[1.1em] "}),P("duration")]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Force submit after timer expiry"}),n(pe,{defaultValue:"yes",className:"!mt-2",onChange:b=>i(w=>({...w,timing:{...w.timing,forceSubmit:b.target.value}})),children:[e(R,{label:"Yes",value:"yes",control:e(I,{}),labelPlacement:"right"}),e(R,{label:"No",value:"no",control:e(I,{}),labelPlacement:"right"})]})]})]})]})]})},H=[{label:"Quiz Details",value:0},{label:"Questions",value:1},{label:"Select Participants",value:2},{label:"Rules & Rewards",value:3}];function Z(t){const i=[];return t.title.length===0?i.push(["title","Must have a Quiz Title"]):t.title.length>75&&i.push(["title","Quiz Title should be less than or 75 characters"]),t.description.length===0?i.push(["description","Must have a Quiz Description"]):t.description.split(" ").length>150&&i.push(["description","Quiz Description should be less than or 150 words"]),t.dateAndTime.start>=t.dateAndTime.end&&i.push(["dateAndTime","Quiz EndDate always greater than StartDate"]),t.termsAndConditions.length===0?i.push(["termsAndConditions","Must have a Quiz Terms and Conditions"]):t.termsAndConditions.split(" ").length>150&&i.push(["description","Quiz Term & Conditions should be less than or 150 words"]),t.timing.duration==""||+t.timing.duration<=0?i.push(["duration","Must have a Quiz Duration"]):+t.timing.duration>1e3&&i.push(["duration","Quiz Duration should be less than or 900 minutes"]),i}function J(t){const i=[];return t.forEach((u,p)=>{u.question.length===0&&i.push([p,"Must have question filled"]),["radio","check-box","dropdown"].includes(u.type)&&u.options.length<2&&i.push([p,"Must have at least one options"]),["radio","check-box","dropdown"].includes(u.type)&&u.answer.length===0&&i.push([p,"Must have answer filled"])}),i}function de(t){const i=[];return t.participantType==="teams"&&t.teams.length<2?i.push(["teams","Must have at least two participant in teams"]):t.participantType==="individual"&&t.individuals.length<2&&i.push(["individual","Must have at least two participant in individual"]),t.participantType==="groups"&&t.groups.length<1&&i.push(["groups","Must have at least one groups"]),t.participantType==="groups"&&t.groups.forEach((u,p)=>{u.label===""?i.push(["groupLabel","Must have group name filled"]):u.participants.length<2&&i.push(["groupParticipants","Must have at least two participant in Group"])}),i}function ke(t){const i=[];return t.participationRewards===!1&&t.winnerRewards===!1?i.push(["rewards","Must select any one Participation Points or Winner Points"]):t.participationRewards===!0&&t.participationRewardsType===""&&i.push(["participationRewardsType","Must select participation Type"]),t.participationRewards===!0&&t.participationRewardsType==="all"&&t.allParticipationPoints===0?i.push(["allParticipationPoints","Points to be given must have greater than 0"]):t.participationRewards===!0&&t.participationRewardsType==="few"&&t.unitPoints===0&&t.units===0&&i.push(["unitPoints","Both values must have greater than 0"]),t.winnerRewards===!0&&t.assignRulesTime===""?i.push(["assignRulesTime","Must select any one assign rule now or later"]):t.winnerRewards===!0&&t.assignRulesTime==="now"&&t.numberOfWinners===0&&i.push(["numberOfWinners","Number of winners must have greater than 0"]),t.assignPointsType===""?i.push(["assignPointsType","Must select any one assign points equal or position based"]):t.assignPointsType==="equal"&&t.allWinnerPoints===0&&i.push(["allWinnerPoints","Number of points given must have greater than 0"]),t.assignPointsType==="positionBased"&&t.winnerPositions.length===0&&i.push(["winnerPositionsLength","Must have at least one Winner Position"]),t.assignPointsType==="positionBased"&&t.winnerPositions.length!==0&&t.winnerPositions.forEach((u,p)=>{u.points===0&&i.push(["winnerPositionsPoint","Number of points given must have greater than 0"])}),i}const Se=()=>{const[t,i]=M.useState(H[0].value),[u,p]=M.useState({}),A=a=>{if(t===0){p(N=>(delete N.details,{...N}));const r=Z(g);if(r.length>0){k.error("Your details have some errors"),p(N=>({...N,details:r}));return}}else if(t===1){if(g.questions.length===0){k.error("Your quiz must have questions");return}p(N=>(delete N.questions,{...N}));const r=J(g.questions);if(r.length>0){k.error("Your question have some errors"),p(N=>({...N,questions:r}));return}}i(a)},[T,_]=M.useState(),[g,P]=M.useState({title:"",description:"",dateAndTime:{start:"",end:""},termsAndConditions:"",isTimeBounded:!0,timing:{duration:"5",forceSubmit:"yes"},questions:[],participantType:"",teams:[],individuals:[],groups:[{label:"",participants:[]}],groupIds:[],owner:""}),[b,w]=M.useState({participationRewards:!1,winnerRewards:!1,assignRulesTime:"",participationRewardsType:"",assignPointsType:"",allParticipationPoints:0,units:0,unitPoints:0,numberOfWinners:0,allWinnerPoints:0,winnerPositions:[]}),x=async()=>{try{const a=new FormData;a.append("title",g.title),a.append("description",g.description),a.append("termsAndConditions",g.termsAndConditions),a.append("startDate",g.dateAndTime.start),a.append("endDate",g.dateAndTime.end);const r=await W.quizs.details(a);_(r.id),k.success("Saved successfully")}catch(a){console.log(a),k.error("Error:",a.message)}},c=async a=>{try{const r={question:survey.questions[a].question,questionType:survey.questions[a].type,answerOptions:survey.questions[a].answer},N=await W.surveys.questions(r,surveyId);k.success(N.message)}catch(r){console.error(r)}},h=async()=>{try{if(g.participantType==="groups"){const a=g.groups.length-1,r=g.groups[a].participants.join(","),N={groupName:g.groups[a].label,participants:r},G=await W.quizs.addGroup(N);k.success("Groupe Saved");const Y=G.id;P(l=>({...l,groupIds:[...l.groupIds,Y]}))}else{const a=g.teams.join(","),r=g.individuals.join(","),N=g.groupIds.join(","),G={participantType:g.participantType,teams:a,individuals:r,groups:N};await W.quizs.addParticipants(G,T),k.success("Saved successfully")}}catch(a){console.log(a),k.error("Error:",a.message)}},d=async()=>{try{const a=Object.fromEntries(Object.entries(b).filter(([r,N])=>N!==""));await W.quizs.addRulesAndRewards(a,T),k.success("Survey Created Successfully!")}catch(a){k.error(a.message)}},f=async()=>{const a=g.questions.length-1;g.questions.length>0&&(g.questions[a].question!==""?c(a):m())};function s(){if(console.log(g),t===0){p(r=>(delete r.details,{...r}));const a=Z(g);if(a.length>0){k.error("Your details have some errors"),p(r=>({...r,details:a}));return}else x(),i(r=>++r)}else if(t===1){if(g.questions.length===0){k.error("Your quiz must have questions");return}p(r=>(delete r.questions,{...r}));const a=J(g.questions);if(a.length>0){k.error("Your question have some errors"),p(r=>({...r,questions:a}));return}else f(),i(r=>++r)}else if(t===2){p(r=>(delete r.quizParticipants,{...r}));const a=de(g);if(a.length>0){k.error("Your details have some errors"),p(r=>({...r,quizParticipants:a}));return}else h(),i(r=>++r)}else{console.log(b),p(r=>(delete r.rulesNRewards,{...r}));const a=ke(b);if(console.log(a),a.length>0){k.error("Your details have some errors"),p(r=>({...r,rulesNRewards:a}));return}else d()}}function m(){if(t===0){p(r=>(delete r.details,{...r}));const a=Z(g);if(a.length>0){k.error("Your details have some errors"),p(r=>({...r,details:a}));return}else x()}else if(t===1){if(g.questions.length===0){k.error("Your quiz must have questions"),p(r=>({...r,details:a}));return}else i(r=>++r);p(r=>(delete r.questions,{...r}));const a=J(g.questions);if(a.length>0){k.error("Your question have some errors"),p(r=>({...r,questions:a}));return}}else if(t===2){p(r=>(delete r.quizParticipants,{...r}));const a=de(g);if(a.length>0){k.error("Your details have some errors"),p(r=>({...r,quizParticipants:a}));return}else h()}}return e($,{children:n("div",{children:[n("section",{className:"flex justify-between px-3 pb-3 mt-0 md:px-0 md:mt-4",children:[e("p",{className:"text-[20px] font-bold text-text-black",children:"Create Quiz"}),t>2&&e(oe,{to:`/quiz/preview/${T}`,className:"rounded-md bg-[#5486E3] px-6 py-2 font-Lato text-white",children:"Preview"})]}),e("section",{className:"hidden md:flex gap-2 px-3 py-5 md:px-0",children:H==null?void 0:H.map((a,r)=>e("div",{className:"flex items-center gap-2",children:n(oe,{to:"#",onClick:()=>A(a.value),className:"flex items-center gap-2",children:[e("span",{className:"inline-block h-0.5 w-[max(100px,_2vw)] bg-text-black"+(r==0?" hidden":"")}),e("span",{className:"inline-flex aspect-square w-[2em] items-center justify-center rounded-full border-2 font-bold  "+(a.value===t?"border-primary bg-primary text-white":"border-text-black text-text-black"),children:r+1}),e("span",{className:"font-semibold "+(a.value===t?"text-primary":"text-text-black"),children:a.label})]})},a.value))}),e("div",{className:"px-3 pb-2 md:px-0",children:e("div",{className:"h-px w-full bg-400"})}),e("section",{className:"px-3 md:px-0",children:t===0?e(Te,{details:g,setDetails:P,errors:u.details}):t===1?e(ye,{questions:g,setQuestions:P,errors:u.questions,isTimeBounded:g.isTimeBounded,queErrorCheck:m,quizId:T,handleValidateQuestions:J}):t===2?e(Pe,{quiz:g,setQuiz:P,quizId:T,errors:u.quizParticipants,queErrorCheck:m}):t===3?e(Ce,{rulesNRewards:b,setRulesNRewards:w,errors:u.rulesNRewards}):"🚧dev. in progress 🏗️"}),n("section",{className:"flex justify-between py-5 px-3 md:py-10 md:px-0",children:[e("button",{type:"button",className:"btn-ghost",onClick:()=>i(a=>--a),children:"back"}),t<4&&e("button",{type:"button",className:"btn-ghost bg-primary text-white transition-colors hover:text-primary",onClick:s,children:t<3?"Continue":"submit"})]})]})})};export{Se as default};
