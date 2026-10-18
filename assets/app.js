(()=>{'use strict';
const data=window.CCF_VENUES||[];
const byId=id=>document.getElementById(id);
const state={q:'',field:'',grade:'',type:'',linkState:'',page:1,pageSize:20};
const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isLink=s=>/^https?:\/\//i.test(s||'');
const pdfPage=r=>`source/原始目录-2026-用户上传.pdf#page=${Number(r['pdf页码'])||1}`;
const getRows=()=>data.filter(r=>{
const q=state.q.toLowerCase();
const match=!q||['简称','全称','出版社/主办方','学科领域','等级','类别'].some(k=>(r[k]||'').toLowerCase().includes(q));
const available=!!(r['官方网址']||r['学术索引网址']);
return match&&(!state.field||r['学科领域']===state.field)&&(!state.grade||r['等级']===state.grade)&&(!state.type||r['类别']===state.type)&&(!state.linkState||(state.linkState==='可访问'?available:!available));
});
const hyperlink=(url,label,cls='')=>isLink(url)?`<a class="link external ${cls}" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`:'<span style="color:#aeb8c5">—</span>';
function render(){
 const rows=getRows();const count=Math.ceil(rows.length/state.pageSize)||1;state.page=Math.max(1,Math.min(count,state.page));
 const start=(state.page-1)*state.pageSize;
 byId('tbody').innerHTML=rows.slice(start,start+state.pageSize).map(r=>{
 const grade=escapeHTML(r['等级']);const raw=r['原始网址']||'';const st=r['链接状态'];const good=!!r['学术索引网址'];
 const pill=st==='人工核对'?'':`<div class="badge-state ${good?'':'bad'}" title="${escapeHTML(r['备注'])}">${escapeHTML(st)}</div>`;
 const rawCell=`<span class="url-original ${good?'':'uncertain'}" title="${escapeHTML(raw)}">${escapeHTML(raw||'（原 PDF 空缺）')}</span>${pill}`;
 return `<tr><td><span class="grade grade-${grade.toLowerCase()}">${grade}</span></td>
 <td><span class="venue-kind">${escapeHTML(r['类别'])}</span></td>
 <td class="short">${escapeHTML(r['简称']||'—')}</td>
 <td class="fullname">${escapeHTML(r['全称'])}</td>
 <td>${escapeHTML(r['出版社/主办方']||'—')}</td>
 <td class="field">${escapeHTML(r['学科领域'])}</td>
 <td>${hyperlink(r['官方网址'],'官网','verified')}</td>
 <td>${hyperlink(r['学术索引网址'],'DBLP / 索引',st==='人工核对'?'verified':'unverified')}</td>
 <td>${rawCell}</td><td><a class="source-link" href="${encodeURI(pdfPage(r))}" target="_blank">第 ${Number(r['pdf页码'])} 页 ↗</a></td></tr>`;
 }).join('');
 byId('result-count').textContent=`筛选到 ${rows.length} 条 / 全部 ${data.length} 条`;
 byId('page-counter').textContent=rows.length?`第 ${state.page} / ${count} 页 · 每页 ${state.pageSize} 条`:'暂无结果';
 byId('empty').hidden=!!rows.length;byId('prev').disabled=state.page<=1;byId('next').disabled=state.page>=count;
}
function updateField(id,key){byId(id).addEventListener('input',e=>{state[key]=e.target.value.trim();state.page=1;render();});}
function csvCell(v){return '"'+String(v??'').replace(/"/g,'""')+'"';}
function exportCSV(){const rows=getRows();if(!rows.length)return;const keys=Object.keys(data[0]);const csv='\ufeff'+[keys.map(csvCell).join(','),...rows.map(r=>keys.map(k=>csvCell(r[k])).join(','))].join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='CCF2026-filtered.csv';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);}
const total=r=>r.length;
byId('stat-total').textContent=total(data);byId('stat-a').textContent=data.filter(r=>r['等级']==='A').length;
byId('stat-journal').textContent=data.filter(r=>r['类别']==='期刊').length;byId('stat-conf').textContent=data.filter(r=>r['类别']==='会议').length;
updateField('q','q');updateField('field','field');updateField('grade','grade');updateField('type','type');updateField('linkState','linkState');
byId('prev').onclick=()=>{state.page--;render();};byId('next').onclick=()=>{state.page++;render();};
byId('reset').onclick=()=>{['q','field','grade','type','linkState'].forEach(x=>{state[x]='';byId(x).value='';});state.page=1;render();};
byId('export-btn').onclick=exportCSV;
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();byId('q').focus();}});
render();
})();
