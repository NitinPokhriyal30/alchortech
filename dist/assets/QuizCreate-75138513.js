import{r as L,j as n,a as e,F as Q,R as _,b as ee,c as ue,T as te,d as me,e as j,f as B,I as G,g as K,h as Z,i as ge,C as ae,S as be,M as ne,k as fe,l as he,u as z,m as J,Q as N,n as re,p as ie,o as xe,q as $,s as ve,t as ye,v as se,L as V,A as H,D as le,w as oe,x as de}from"./index-e2b9d313.js";const Ne=({questions:a,setQuestions:i,isTimeBounded:p,errors:m,quizId:E,queErrorCheck:w,handleValidateQuestions:M})=>{var F;const[c,x]=L.useState("input");L.useRef([]);const h=(s,l)=>{const g={...a};g.questions[l].type=s.target.value,["radio","dropdown","check-box"].includes(s.target.value)?g.questions[l].options=["option 1"]:["input","text-area"].includes(s.target.value)&&(g.questions[l].options=void 0),i(g)},f=s=>{const l={...a},g=`option ${l.questions[s].options.length+1}`;l.questions[s].options.push(g),i(l)},v=(s,l)=>{const g={...a};g.questions[l].question=s.target.value,i(g)},A=(s,l)=>{const g={...a};g.questions[l].img=s.target.files[0],i(g)},C=s=>{const l={...a};l.questions[s].img=void 0,i(l)},d=(s,l,g)=>{const k={...a},R=k.questions[s].answer,P=k.questions[s].type,U=k.questions[s].options;P==="check-box"?t(s)({target:{value:U[l]}}):k.questions[s].options[l]===R&&(k.questions[s].answer=""),k.questions[s].options[l]=g,i(k)},r=(s,l)=>{if(p===!1)return;const g={...a};g.questions[l].answer=s.target.value,i(g)},t=(s,l)=>g=>{if(p===!1)return;const k={...a},R=encodeURIComponent(g.target.value),P=k.questions[s].answer.split(",").filter(Boolean);l??P.includes(R)?P.splice(P.indexOf(R),1):P.push(R),k.questions[s].answer=Array.from(new Set(P)).join(","),i(k)},o=(s,l)=>{const g={...a},k=g.questions[s].options,R=g.questions[s].answer;g.questions[s].type==="check-box"?t(s,!0)({target:{value:k[l]}}):g.questions[s].options[l]===R&&(g.questions[s].answer=""),g.questions[s].options.splice(l,1),i(g)},u=s=>{const l={...a};l.questions.splice(s,1),i(l)},y=()=>{const s=a.questions.length-1;if(a.questions.length>0)if(a.questions[s].question!==""){const l={...a};l.questions.push({type:"radio",options:["option1"],question:"",answer:p?"":void 0}),i(l),s>=0&&D(s)}else w();else{const l={...a};console.log(l),l.questions.push({type:"radio",options:["option1"],question:"",answer:p?"":void 0}),i(l)}},D=async s=>{try{const l={question:a.questions[s].question,questionType:a.questions[s].type},g=await api.surveys.questions(l,surveyId);toast.success(g.message)}catch(l){console.error(l)}finally{setLoading(!1)}},O={gray:"text-[#A5A5A5]"};return n("div",{className:"space-y-5",children:[(F=a.questions)==null?void 0:F.map((s,l)=>{var g,k,R,P,U;return e("div",{className:"rounded-lg bg-white px-5 py-5 shadow-[0px_2px_3px_#00000029]",children:n("div",{className:"items-top mb-5 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8",children:[n("div",{children:[n("p",{className:"mb-2.5 mt-2 text-18px font-black text-text-black",children:["Question ",l+1]}),e("select",{className:"w-full rounded-[4px] border border-[#d1d1d1] p-2.5 text-16px",value:s.type||c,onChange:b=>h(b,l),fullWidth:!0,children:p?n(Q,{children:[e("option",{value:"radio",children:"Radio Button"}),e("option",{value:"check-box",children:"Checkboxes"}),e("option",{value:"dropdown",children:"Dropdown"})]}):n(Q,{children:[e("option",{value:"input",children:"Text Box"}),e("option",{value:"text-area",children:"Text Area"}),e("option",{value:"radio",children:"Radio Button"}),e("option",{value:"check-box",children:"Checkboxes"}),e("option",{value:"dropdown",children:"Dropdown"})]})}),n("p",{className:"mt-1 "+O.gray,children:[e(_,{className:"inline align-text-bottom text-[1.1em]"})," Question Type"]})]}),n("div",{children:[e(we,{question:s,placeholder:"Enter your question",value:s.question,onChange:b=>v(b,l),endSlot:s.img?e("button",{type:"button",onClick:()=>C(l),children:e(ee,{fontSize:"1.2em",color:"inherit"})}):n("label",{className:"flex",onChange:b=>A(b,l),children:[e(ue,{fontSize:"1.2em",color:"inherit"}),e("input",{hidden:!0,type:"file",accept:"image/*"})]})}),s.type==="input"&&e("div",{children:p===!0&&e(te,{margin:"normal",fullWidth:!0,variant:"outlined",placeholder:"Answer",value:s.answer,onChange:b=>handleInputAnswerChange(b,l)})}),s.type==="text-area"&&e("div",{children:p===!0&&e(te,{fullWidth:!0,margin:"normal",variant:"outlined",multiline:!0,placeholder:"Answer",rows:4,value:s.answer,onChange:b=>r(b,l)})}),s.type==="radio"&&e("div",{className:"pt-2",children:e(me,{children:(g=s.options)==null?void 0:g.map((b,T)=>n("div",{className:"flex items-center",children:[e(j,{value:b,control:e(B,{}),label:b,checked:b===s.answer,onChange:S=>r(S,l),disabled:p===!1}),e(G,{onClick:()=>{const S=window.prompt("Enter new text:",b);S!==null&&S!==""&&d(l,T,S)},size:"small",children:e(K,{})}),e(G,{onClick:()=>o(l,T),size:"small",children:e(Z,{})})]},T))})}),s.type==="check-box"&&e("div",{children:e(ge,{children:(k=s.options)==null?void 0:k.map((b,T)=>n("div",{style:{display:"flex",alignItems:"center"},children:[e(j,{value:b,control:e(ae,{checked:p===!0&&s.answer.split(",").includes(encodeURIComponent(b))}),label:b,onChange:t(l),disabled:p===!1}),e(G,{onClick:()=>{const S=window.prompt("Enter new text:",b);S!==null&&S!==""&&d(l,T,S)},size:"small",children:e(K,{})}),e(G,{onClick:()=>o(l,T),size:"small",children:e(Z,{})})]},T))})}),s.type==="dropdown"&&n("div",{className:"pt-1",children:[n(be,{className:"my-[15px] w-full "+(!p&&"!hidden"),labelId:`demo-simple-select-label-${l}`,id:`demo-simple-select-${l}`,value:p===!1?s.options[0]:s.answer||"nil",onChange:b=>r(b,l),disabled:p===!1,children:[e(ne,{value:"nil",disabled:!0,children:"Select Answer"}),(R=s.options)==null?void 0:R.map((b,T)=>e(ne,{value:b,children:b},T))]}),(P=s.options)==null?void 0:P.map((b,T)=>n("div",{style:{display:"flex",alignItems:"center"},children:[e("span",{children:b}),e(G,{onClick:()=>{const S=window.prompt("Enter new text:",b);S!==null&&S!==""&&d(l,T,S)},size:"small",children:e(K,{})}),e(G,{onClick:()=>o(l,T),size:"small",children:e(Z,{})})]},T))]}),((U=m==null?void 0:m.find(([b])=>b===l))==null?void 0:U[1])&&n("p",{className:"text-small mt-2 text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em]"}),m.find(([b])=>b===l)[1]]}),["radio","check-box","dropdown"].includes(s.type)&&e("div",{className:"-ml-3 flex cursor-pointer items-center rounded-md pl-3 hover:bg-paper",children:e(j,{className:"!cursor-pointer",value:"add new option",control:s.type==="radio"?e(B,{}):e(ae,{}),label:e("span",{className:"text-primary",children:"Add new option"}),onClick:()=>f(l),disabled:!0})}),e("div",{className:"mt-5 flex",children:e("button",{className:"ml-auto text-[1.2em]",variant:"contained",onClick:()=>u(l),children:e(ee,{})})})]})]},l)})}),e("div",{className:"rounded-lg text-center bg-white px-5 py-5 shadow-[0px_2px_3px_#00000029]",children:n("button",{className:"text-primary",onClick:y,children:[e(fe,{className:"text- inline"})," Add New Question"]})})]})};function we({endSlot:a,question:{img:i},...p}){const[m,E]=he.useState("");return L.useEffect(()=>{if(!i){E("");return}const w=URL.createObjectURL(i);return E(w),()=>URL.revokeObjectURL(w)},[i]),n(Q,{children:[n("div",{className:"flex items-center border-b border-[#d1d1d1] focus-within:border-primary ",children:[e("input",{className:"w-full px-0.5 py-2.5 text-16px outline-none ",...p}),a]}),m&&e("div",{className:"border-b border-[#d1d1d1] pb-2.5",children:e("img",{className:"mt-2.5 w-full rounded-md",src:m,alt:"question img"})})]})}const Ce={gray:"text-[#A5A5A5]"};function ke({quiz:a,setQuiz:i,quizId:p,errors:m,queErrorCheck:E}){L.useState([]);const w=z("departments",()=>J.departments()),M=d=>{i(r=>({...r,teams:[...r.teams,d]}))},c=d=>{i(r=>({...r,teams:r.teams.filter(t=>t!==d)}))},x=()=>{i(d=>({...d,teams:[]}))},h=()=>{i(d=>({...d,individuals:[]}))},f=()=>{i(d=>({...d,groups:[]}))},v=()=>{const d=a.groups.length-1;if(a.groups.length>0)if(a.groups[d].label!==""&&a.groups[d].participants.length>1){const r={label:"",participants:[]};i(t=>({...t,groups:[...t.groups,r]})),d>=0&&A(d)}else E();else{const r={label:"",participants:[]};i(t=>({...t,groups:[...t.groups,r]}))}},A=async d=>{try{const r=a.groups[d].participants.join(","),t={groupName:a.groups[d].label,participants:r},u=(await J.quizs.addGroup(t)).id;i(y=>({...y,groupIds:[...y.groupIds,u]})),N.success("Added")}catch(r){console.error("Error adding group:",r)}},C=d=>{var r;return(r=m==null?void 0:m.find(([t])=>t===d))==null?void 0:r[1]};return n("div",{children:[e("div",{className:"rounded-lg bg-white px-5 py-6 drop-shadow-md",children:n("div",{className:"grid md:grid-cols-[1fr_2fr] items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Select Participant Type"}),e("p",{className:"mt-2.5 "+Ce.gray,children:"Employees earn rewards based on individual's/teams's performance"})]}),n("div",{className:"flex flex-col md:flex-row gap-4",children:[e("button",{onClick:()=>{i(d=>({...d,participantType:"all"}))},className:a.participantType==="all"?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-10":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-10",children:"All"}),e("button",{onClick:()=>{i(d=>({...d,participantType:"teams"})),h(),f()},className:a.participantType==="teams"?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-9":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-9",children:"teams"}),e("button",{onClick:()=>{i(d=>({...d,participantType:"individual"})),f(),x()},className:a.participantType==="individual"?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5",children:"Individual"}),e("button",{onClick:()=>{i(d=>({...d,participantType:"groups"})),h(),x()},className:a.participantType==="groups"?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-2":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-2",children:"+ Create Group"})]})]})}),a.participantType==="teams"&&e("div",{className:"rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2",children:n("div",{className:"grid grid-cols-[1fr_2fr] items-center gap-8",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:"Select teams"})}),n("div",{children:[e("select",{className:"w-full p-2 border rounded",onChange:d=>{const r=Array.from(d.target.options).filter(o=>o.selected).map(o=>o.value),t=[...a.teams];r.forEach(o=>{t.includes(o)?c(o):M(o)})},multiple:!0,value:a.teams,children:w.data.map(d=>e("option",{value:d.id,children:d.name},d.id))}),C("teams")&&n("p",{className:"text-sm text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em] "}),C("teams")]})]})]})}),a.participantType==="individual"&&e("div",{className:"rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2",children:n("div",{className:"grid grid-cols-[1fr_2fr] items-center gap-8",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:"Select Individual Participant"})}),n("div",{children:[e("div",{className:"rounded border-[2px] ring-primary focus-within:ring-1 ",children:e("ul",{className:"group p-2",children:e(ce,{quiz:a,setQuiz:i})})}),C("individual")&&n("p",{className:"text-sm text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em] "}),C("individual")]})]})]})}),a.participantType=="groups"&&a.groups.map((d,r)=>e("div",{className:"relative",children:n("div",{className:"rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2",children:[e("button",{className:"absolute top-0 right-0 p-2 text-gray-500",onClick:()=>{const t=a.groups.filter((o,u)=>u!==r);i(o=>({...o,groups:t}))},children:"✕ "}),n("div",{className:"grid grid-cols-[1fr_2fr] items-center gap-8",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:`Group ${r+1}`})}),n("div",{children:[e("input",{className:"w-full py-2 px-2 my-4 rounded border-[2px]",type:"text",onChange:t=>{const o=[...a.groups];o[r].label=t.target.value,i(u=>({...u,groups:o}))},placeholder:"Name the Group"}),C("groupLabel")&&a.groups.length-1==r&&n("p",{className:"text-sm text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em] "}),C("groupLabel")]}),e("div",{className:"rounded border-[2px] ring-primary focus-within:ring-1",children:e("ul",{className:"group p-2",children:e(ce,{quiz:a,setQuiz:i,groupIndex:r})})}),C("groupParticipants")&&a.groups.length-1==r&&n("p",{className:"text-sm text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em] "}),C("groupParticipants")]})]})]})]})},r)),a.participantType==="groups"&&n(Q,{children:[e("button",{className:"text-primary mt-2 mx-4",onClick:v,children:"+ Add new group"}),C("groups")&&n("p",{className:"text-sm text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em] "}),C("groups")]})]})]})}function ce({quiz:a,setQuiz:i,groupIndex:p}){const[m,E]=L.useState(!1),w=z("users",()=>J.users.profiles(),{initialData:[]}),M=z("me",()=>J.auth.me(xe.get("user_id"))),c=w.isLoading?[]:w.data.filter(t=>t.id!==M.data.id),[x,h]=he.useState(""),f=c.filter(t=>JSON.stringify(t).toLocaleLowerCase().includes(x)),v=t=>a.individuals.includes(t.id),A=t=>{var u,y;const o=(u=a.groups)==null?void 0:u[p];return(y=o==null?void 0:o.participants)==null?void 0:y.includes(t.id)},C=a.participantType==="individual"?a.individuals:a.groups.reduce((t,o,u)=>u!==p?t.concat(o.participants):t,[]),d=f.filter(t=>!C.includes(t.id)&&(a.participantType==="individual"?!A(t):!v(t))),r=28;return n(Q,{children:[n("span",{className:"flex cursor-pointer gap-[2px] hover:font-bold",onClick:()=>E(!m),children:[a.participantType==="individual"&&e("span",{className:"flex flex-wrap recipients-grid gap-2",children:a.individuals.length>0?a.individuals.map(t=>{const o=c.find(u=>u.id===t);return e("span",{className:"border-[2px] px-2 py-1 rounded-lg mx-1",children:o?n("span",{className:"",children:[o.full_name," ",e("button",{className:"ml-1 text-black cursor-pointer",onClick:()=>{i(u=>(v(o)?u.individuals=u.individuals.filter(y=>y!==o.id):u.individuals.push(o.id),{...u}))},children:"✕"})]}):""},t)}):e("p",{className:"text-[#ACACAC]",children:"Add member by Name or Email Id"})}),a.participantType==="groups"&&e("span",{className:"flex flex-wrap recipients-grid gap-2",children:a.groups[p].participants.length>0?a.groups[p].participants.map(t=>{const o=c.find(u=>u.id===t);return e("span",{className:"border-[2px] px-2 py-1 rounded-lg mx-1",children:o?n("span",{className:"",children:[o.full_name," ",e("button",{className:"ml-1 text-black cursor-pointer",onClick:()=>{i(u=>{const y=[...u.groups],D=y[p];return D.participants=D.participants.filter(O=>O!==o.id),{...u,groups:y}})},children:"✕ "})]}):""},t)}):e("p",{className:"text-[#ACACAC]",children:"Add members by Name or Email Id"})})]}),m&&n("div",{className:"absolute z-10 hidden divide-y overflow-hidden rounded bg-white text-black shadow shadow-gray-400 group-hover:block",children:[e("div",{style:{height:5*r},className:"overflow-y-auto",children:w.isLoading?e("p",{className:"absolute inset-0 m-auto h-10 w-[15ch] text-center text-gray-500",children:"Loading..."}):e("div",{children:d==null?void 0:d.map(t=>e("button",{style:{height:r},className:`block w-full  px-4 py-1 text-left ${v(t)||A(t)?"border-b border-primary/80 bg-primary/30":""}`,type:"button",onClick:()=>{a.participantType==="individual"?i(o=>(v(t)?o.individuals=o.individuals.filter(u=>u!==t.id):o.individuals.push(t.id),{...o})):a.participantType==="groups"&&i(o=>{const u=[...o.groups],y=u[p];return A(t)?y.participants=y.participants.filter(D=>D!==t.id):(y.participants.push(t.id),u.forEach((D,O)=>{O!==p&&(D.participants=D.participants.filter(F=>F!==t.id))})),{...o,groups:u}})},children:n("div",{className:"flex items-center",children:[e("span",{children:e("img",{className:"h-6 w-6 rounded-full mr-2",src:re(`${t==null?void 0:t.full_name.split(" ")[0]} ${t==null?void 0:t.full_name.split(" ")[1]}`,ie(t==null?void 0:t.avtar)).src,alt:re(`${t==null?void 0:t.full_name.split(" ")[0]} ${t==null?void 0:t.full_name.split(" ")[1]}`,ie(t==null?void 0:t.avtar)).alt,onError:o=>{o.target.onerror=null,o.target.src=`https://ui-avatars.com/api/?name=${encodeURIComponent((t==null?void 0:t.full_name.split(" ")[0].charAt(0))+(t==null?void 0:t.full_name.split(" ")[1].charAt(0)))}&color=#464646&background=FFFFFF`}})}),e("span",{className:"font-bold",children:`${t.full_name}`}),` | ${t.title} - ${t.department}`]})},t.id))})}),e("input",{className:"bg-translucent px-2 py-1",onChange:t=>h(t.target.value),placeholder:"Search Participants",value:x})]})]})}const W={gray:"text-[#A5A5A5]"},Ae=()=>{const[a,i]=L.useState("");return e("div",{children:n("div",{className:"rounded-lg bg-white px-5 py-6 drop-shadow-md",children:[n("div",{className:"grid grid-cols-[1fr_2fr] items-center gap-40",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Select Award Payout Format"}),e("p",{className:"mt-2.5 "+W.gray,children:"Automatically/manually reward the incentive to participants when they hit the targets you set"})]}),n("div",{className:"flex gap-2",children:[e("button",{onClick:()=>i("Automatic"),className:a==="Automatic"?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5",children:"Automatic"}),e("button",{onClick:()=>i("Manual"),className:a==="Manual"?"border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-9":"border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-9",children:"Manual"})]})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid grid-cols-[1fr_2fr] items-center gap-40",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:"Select Points"})}),e("div",{children:e("div",{children:n("select",{className:"border-[2px] rounded p-2 w-full",children:[e("option",{value:"",disabled:!0,selected:!0,children:"Select Points"}),e("option",{value:"10",children:"10"}),e("option",{value:"20",children:"20"}),e("option",{value:"30",children:"30"}),e("option",{value:"40",children:"40"}),e("option",{value:"50",children:"50"})]})})})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid grid-cols-[1fr_2fr] items-center gap-40",children:[e("div",{children:e("p",{className:"w-44 text-18px font-bold text-text-black",children:"Define the campaign award rules 1 or more"})}),e("div",{children:n("div",{className:"flex flex-col space-y-4",children:[n("label",{className:"flex gap-8 items-center",children:[e("input",{type:"checkbox",className:"form-checkbox h-10 w-20"}),n("div",{className:"w-44",children:[e("span",{children:"Ongoing Earn"}),e("p",{className:W.gray,children:"Earn X points for every Y units during campaign"})]}),n("div",{className:"flex gap-10",children:[n("div",{className:"flex flex-col text-center",children:[e("span",{children:"X"}),e("input",{type:"number",className:"border rounded w-14 p-2"})]}),n("div",{className:"flex flex-col text-center",children:[e("span",{children:"Y"}),e("input",{type:"number",className:"border rounded w-14 p-2"})]})]})]}),n("label",{className:"flex gap-8 items-center",children:[e("input",{type:"checkbox",className:"form-checkbox h-10 w-20"}),n("div",{className:"w-44",children:[e("span",{children:"Threshold bonus"}),e("p",{className:W.gray,children:"Earn X when Y threshold met"})]}),n("div",{className:"flex gap-10",children:[n("div",{className:"flex flex-col text-center",children:[e("span",{children:"X"}),e("input",{type:"number",className:"border rounded w-14 p-2"})]}),n("div",{className:"flex flex-col text-center",children:[e("span",{children:"Y"}),e("input",{type:"number",className:"border rounded w-14 p-2"})]})]})]}),n("label",{className:"flex gap-8 items-center",children:[e("input",{type:"checkbox",className:"form-checkbox h-10 w-20"}),n("div",{className:"w-44",children:[e("span",{children:"Winner takes all"}),e("p",{className:W.gray,children:"The participant with the most Sales. The amount of points earned"})]}),n("div",{className:"flex gap-10",children:[n("div",{className:"flex flex-col text-center",children:[e("span",{children:"X"}),e("input",{type:"number",className:"border rounded w-14 p-2"})]}),n("div",{className:"flex flex-col text-center",children:[e("span",{children:"Y"}),e("input",{type:"number",className:"border rounded w-14 p-2"})]})]})]})]})})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid grid-cols-[1fr_2fr] items-center mb-10 gap-40",children:[e("div",{children:e("p",{className:"text-18px font-bold text-text-black",children:"Select how results will be entered into the campaign"})}),n("div",{className:"flex justify-evenly",children:[n("div",{children:[e("input",{className:"mr-2 h-4 w-4",type:"radio",id:"option1",name:"entryOption",value:"option1"}),e("label",{htmlFor:"option1",children:"By participating employees"}),e("p",{className:"ml-6 text-gray-400",children:"Participants enter their own results throughout the campaign"})]}),n("div",{children:[e("input",{className:"mr-2 h-4 w-4",type:"radio",id:"option2",name:"entryOption",value:"option2"}),e("label",{htmlFor:"option2",children:"By you, the campaign owner"}),e("p",{className:"ml-6 text-gray-400",children:"Upload your participants results using an Excel template"})]})]})]})]})})};$.extend(ve);const Y={gray:"text-[#A5A5A5]"},Te=({details:a,setDetails:i,errors:p})=>{const m=$();$();const E=m.startOf("day"),w=(h,f)=>{i(v=>({...v,[h]:f}))},M=(h,f)=>{const v=$(f).format("YYYY-MM-DD HH:mm:ss");i(A=>({...A,dateAndTime:{...A.dateAndTime,[h]:v}}))},c=(h,f)=>{const v=$(f).format("YYYY-MM-DD HH:mm:ss");i(A=>({...A,dateAndTime:{...A.dateAndTime,[h]:v}}))},x=h=>{var f;return(f=p==null?void 0:p.find(([v])=>v===h))==null?void 0:f[1]};return n("div",{className:"rounded-lg bg-white px-5 py-10 shadow-[0px_2px_3px_#00000029]",children:[n("div",{className:"grid md:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Title*"}),e("p",{className:"mt-2.5 "+Y.gray,children:"Survey Title goes here"})]}),n("div",{children:[e("div",{children:e(ye,{size:"lg",placeholder:"Ex: Go Green, Plant Trees",value:a.title,onChange:h=>w("title",h.target.value)})}),n("p",{className:"text-right "+Y.gray,children:[a.title.length,"/75"]}),x("title")&&n("p",{className:"text-sm text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em] "}),x("title")]})]})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid md:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Description*"}),e("p",{className:"mt-2.5 "+Y.gray,children:"Maximum 150 words"})]}),n("div",{children:[e("div",{children:e(se,{value:a.description,className:"react-quill",onChange:h=>{i(f=>({...f,description:h}))},placeholder:"Describe your campaign",modules:{toolbar:[[{header:"1"},{header:"2"},{font:[]}],[{list:"ordered"},{list:"bullet"}],["bold","italic","underline","strike"],["link"],[{color:[]},{background:[]}],[{align:[]}],["clean"]]}})}),n("p",{className:"text-right "+Y.gray,children:[a.description.length,"/150 Words"]}),x("description")&&n("p",{className:"text-sm text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em] "}),x("description")]})]})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid md:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Date*"}),e("p",{className:"mt-2.5 "+Y.gray,children:"Mention the Campaign date and time"})]}),n("div",{children:[n("div",{className:"dateTimeContainer-green flex items-center gap-4",children:[e("span",{className:"min-w-[70px] text-18px font-bold",children:"Start"}),e(V,{dateAdapter:H,children:e(le,{className:"input-container",defaultValue:m,disablePast:!0,onChange:h=>M("start",h)})}),e(V,{dateAdapter:H,children:e(oe,{className:"input-container",defaultValue:E,onChange:h=>M("start",h)})})]}),n("div",{className:"dateTimeContainer-red mt-2 flex items-center gap-4",children:[e("span",{className:"min-w-[70px] text-18px font-bold",children:"End"}),e(V,{dateAdapter:H,children:e(le,{className:"input-container",defaultValue:m,disablePast:!0,onChange:h=>c("end",h)})}),e(V,{dateAdapter:H,children:e(oe,{className:"input-container",defaultValue:E,disablePast:!0,onChange:h=>c("end",h)})})]}),x("dateAndTime")&&n("p",{className:"text-sm text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em] "}),x("dateAndTime")]})]})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid md:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Terms & Conditions"}),e("p",{className:"mt-2.5 "+Y.gray,children:"Describe the Terms & Conditions of the campaign"})]}),n("div",{children:[e("div",{children:e(se,{value:a.termsAndConditions,className:"react-quill",onChange:h=>{i(f=>({...f,termsAndConditions:h}))},placeholder:"Describe your campaign",modules:{toolbar:[[{header:"1"},{header:"2"},{font:[]}],[{list:"ordered"},{list:"bullet"}],["bold","italic","underline","strike"],["link"],[{color:[]},{background:[]}],[{align:[]}],["clean"]]}})}),n("p",{className:"text-right "+Y.gray,children:[a.termsAndConditions.length,"/150 words"]}),x("termsAndConditions")&&n("p",{className:"text-sm text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em] "}),x("termsAndConditions")]})]})]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{className:"grid md:grid-cols-[1fr_2fr] grid-cols-1 items-center gap-8",children:[n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Is it Time Bounded Survey"}),e("p",{className:"mt-2.5 "+Y.gray,children:"Set time limit in minutes"})]}),n("div",{children:[n("label",{className:"flex items-center gap-3",children:[e("input",{type:"number",className:"w-0 min-w-[6ch] rounded-[4px] border border-[#d1d1d1] px-1 py-2",value:a.timing.duration,onChange:h=>i(f=>({...f,timing:{...f.timing,duration:h.target.value}}))}),"Minute(s)"]}),x("duration")&&n("p",{className:"text-sm text-red-500",children:[e(_,{className:"inline align-text-bottom text-[1.1em] "}),x("duration")]}),e("hr",{className:"border-px my-6 border-400"}),n("div",{children:[e("p",{className:"text-18px font-bold text-text-black",children:"Force submit after timer expiry"}),n(me,{defaultValue:"yes",className:"!mt-2",onChange:h=>i(f=>({...f,timing:{...f.timing,forceSubmit:h.target.value}})),children:[e(j,{label:"Yes",value:"yes",control:e(B,{}),labelPlacement:"right"}),e(j,{label:"No",value:"no",control:e(B,{}),labelPlacement:"right"})]})]})]})]})]})},X=[{label:"Quiz Details",value:0},{label:"Questions",value:1},{label:"Select Participants",value:2},{label:"Rules & Rewards",value:3}];function q(a){const i=[];return a.title.length===0?i.push(["title","Must have a Quiz Title"]):a.title.length>75&&i.push(["title","Quiz Title should be less than or 75 characters"]),a.description.length===0?i.push(["description","Must have a Quiz Description"]):a.description.split(" ").length>150&&i.push(["description","Quiz Description should be less than or 150 words"]),a.dateAndTime.start>=a.dateAndTime.end&&i.push(["dateAndTime","Quiz EndDate always greater than StartDate"]),a.termsAndConditions.length===0?i.push(["termsAndConditions","Must have a Quiz Terms and Conditions"]):a.termsAndConditions.split(" ").length>150&&i.push(["description","Quiz Term & Conditions should be less than or 150 words"]),a.timing.duration==""||+a.timing.duration<=0?i.push(["duration","Must have a Quiz Duration"]):+a.timing.duration>1e3&&i.push(["duration","Quiz Duration should be less than or 900 minutes"]),i}function I(a){const i=[];return a.forEach((p,m)=>{p.question.length===0&&i.push([m,"Must have question filled"]),["radio","check-box","dropdown"].includes(p.type)&&p.options.length<2&&i.push([m,"Must have at least one options"]),["radio","check-box","dropdown"].includes(p.type)&&p.answer.length===0&&i.push([m,"Must have answer filled"])}),i}function pe(a){const i=[];return a.participantType==="teams"&&a.teams.length<2?i.push(["teams","Must have at least two participant in teams"]):a.participantType==="individual"&&a.individuals.length<2&&i.push(["individual","Must have at least two participant in individual"]),a.participantType==="groups"&&a.groups.length<1&&i.push(["groups","Must have at least one groups"]),a.participantType==="groups"&&a.groups.forEach((p,m)=>{p.label===""?i.push(["groupLabel","Must have group name filled"]):p.participants.length<2&&i.push(["groupParticipants","Must have at least two participant in Group"])}),i}const Ee=()=>{const[a,i]=L.useState(X[0].value),[p,m]=L.useState({}),E=r=>{if(a===0){m(o=>(delete o.details,{...o}));const t=q(c);if(t.length>0){N.error("Your details have some errors"),m(o=>({...o,details:t}));return}}else if(a===1){if(c.questions.length===0){N.error("Your quiz must have questions");return}m(o=>(delete o.questions,{...o}));const t=I(c.questions);if(t.length>0){N.error("Your question have some errors"),m(o=>({...o,questions:t}));return}}i(r)},[w,M]=L.useState(),[c,x]=L.useState({title:"",description:"",dateAndTime:{start:"",end:""},termsAndConditions:"",isTimeBounded:!0,timing:{duration:"5",forceSubmit:"yes"},questions:[],participantType:"",teams:[],individuals:[],groups:[{label:"",participants:[]}],groupIds:[],owner:""}),h=async()=>{try{const r=new FormData;r.append("title",c.title),r.append("description",c.description),r.append("termsAndConditions",c.termsAndConditions),r.append("startDate",c.dateAndTime.start),r.append("endDate",c.dateAndTime.end),M(response.id),N.success("Saved successfully")}catch(r){console.log(r),N.error("Error:",r.message)}},f=async()=>{try{if(c.participantType==="groups"){const r=c.groups.length-1,t=c.groups[r].participants.join(","),o={groupName:c.groups[r].label,participants:t},u=await api.quizs.addGroup(o);N.success("Groupe Saved");const y=u.id;x(D=>({...D,groupIds:[...D.groupIds,y]}))}else{const r=c.teams.join(","),t=c.individuals.join(","),o=c.groupIds.join(","),u={participantType:c.participantType,teams:r,individuals:t,groups:o};await api.quizs.addParticipants(u,w),N.success("Saved successfully")}}catch(r){console.log(r),N.error("Error:",r.message)}},v=async r=>{try{const t={question:survey.questions[r].question,questionType:survey.questions[r].type},o=await api.surveys.questions(t,surveyId);N.success(o.message)}catch(t){console.error(t)}},A=async()=>{const r=c.questions.length-1;c.questions.length>0&&(c.questions[r].question!==""?v(r):d())};function C(){if(a===0){m(t=>(delete t.details,{...t}));const r=q(c);if(r.length>0){N.error("Your details have some errors"),m(t=>({...t,details:r}));return}else h(),i(t=>++t)}else if(a===1){if(c.questions.length===0){N.error("Your quiz must have questions");return}m(t=>(delete t.questions,{...t}));const r=I(c.questions);if(r.length>0){N.error("Your question have some errors"),m(t=>({...t,questions:r}));return}else A(),i(t=>++t)}else if(a===2){m(t=>(delete t.quizParticipants,{...t}));const r=pe(c);if(r.length>0){N.error("Your details have some errors"),m(t=>({...t,quizParticipants:r}));return}else f(),i(t=>++t)}}function d(){if(a===0){m(t=>(delete t.details,{...t}));const r=q(c);if(r.length>0){N.error("Your details have some errors"),m(t=>({...t,details:r}));return}else h()}else if(a===1){if(c.questions.length===0){N.error("Your quiz must have questions"),m(t=>({...t,details:r}));return}else i(t=>++t);m(t=>(delete t.questions,{...t}));const r=I(c.questions);if(r.length>0){N.error("Your question have some errors"),m(t=>({...t,questions:r}));return}}else if(a===2){m(t=>(delete t.quizParticipants,{...t}));const r=pe(c);if(r.length>0){N.error("Your details have some errors"),m(t=>({...t,quizParticipants:r}));return}else f()}}return e(Q,{children:n("div",{children:[n("section",{className:"flex justify-between px-3 pb-3 mt-0 md:px-0 md:mt-4",children:[e("p",{className:"text-[20px] font-bold text-text-black",children:"Create Quiz"}),e(de,{to:"#",className:"rounded-md bg-[#5486E3] px-6 py-2 font-Lato text-white",children:"Preview"})]}),e("section",{className:"hidden md:flex gap-2 px-3 py-5 md:px-0",children:X==null?void 0:X.map((r,t)=>e("div",{className:"flex items-center gap-2",children:n(de,{to:"#",onClick:()=>E(r.value),className:"flex items-center gap-2",children:[e("span",{className:"inline-block h-0.5 w-[max(100px,_2vw)] bg-text-black"+(t==0?" hidden":"")}),e("span",{className:"inline-flex aspect-square w-[2em] items-center justify-center rounded-full border-2 font-bold  "+(r.value===a?"border-primary bg-primary text-white":"border-text-black text-text-black"),children:t+1}),e("span",{className:"font-semibold "+(r.value===a?"text-primary":"text-text-black"),children:r.label})]})},r.value))}),e("div",{className:"px-3 pb-2 md:px-0",children:e("div",{className:"h-px w-full bg-400"})}),e("section",{className:"px-3 md:px-0",children:a===0?e(Te,{details:c,setDetails:x,errors:p.details}):a===1?e(Ne,{questions:c,setQuestions:x,errors:p.questions,isTimeBounded:c.isTimeBounded,queErrorCheck:d,quizId:w,handleValidateQuestions:I}):a===2?e(ke,{quiz:c,setQuiz:x,quizId:w,errors:p.quizParticipants,queErrorCheck:d}):a===3?e(Ae,{}):"🚧dev. in progress 🏗️"}),n("section",{className:"flex justify-between py-5 px-3 md:py-10 md:px-0",children:[e("button",{type:"button",className:"btn-ghost",onClick:()=>i(r=>--r),children:"back"}),a<3?e("button",{type:"button",className:"btn-ghost bg-primary text-white transition-colors hover:text-primary",onClick:C,children:"Continue"}):e("button",{type:"button",className:"btn-ghost bg-primary text-white transition-colors hover:text-primary",children:"submit"})]})]})})};export{Ee as default};
