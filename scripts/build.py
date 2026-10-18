#!/usr/bin/env python3
"""Rebuild JavaScript data from editable JSON (no dependencies)."""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
records=json.loads((root/'data'/'venues.json').read_text(encoding='utf-8'))
assert isinstance(records,list)
required={'id','学科领域','类别','等级','简称','全称','出版社/主办方','原始网址','pdf页码','官方网址','学术索引网址','链接状态','备注'}
assert all(required<=set(r) for r in records), 'Some rows have missing fields'
assert len(set(x['id'] for x in records))==len(records),'Duplicate IDs'
(root/'data'/'venues.js').write_text('window.CCF_VENUES = '+json.dumps(records,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
print('Built',len(records),'records')
