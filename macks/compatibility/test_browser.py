"""Chromium DOM and behavioral tests. set_content bypasses local navigation restrictions."""
import json
from pathlib import Path
import os, shutil
from playwright.sync_api import sync_playwright
BASE=Path(__file__).resolve().parent
HTML=(BASE/'index.html').read_text()
MATRIX=[
 ('incomplete','','','api','INCOMPLETE'),
 ('hcp-basic','hcp','basic','api','PLAN-BLOCKED IN DOCUMENTATION'),
 ('hcp-essentials','hcp','essentials','api','PLAN-BLOCKED IN DOCUMENTATION'),
 ('hcp-max','hcp','max','api','DOCUMENTED ELIGIBILITY / ACCOUNT TEST REQUIRED'),
 ('hcp-unknown','hcp','unknown','api','UNKNOWN PLAN / VERIFY BEFORE QUOTE'),
 ('jobber-forms','jobber','core','form','DOCUMENTED NATIVE FEATURE / SETUP TEST REQUIRED'),
 ('jobber-legacy','jobber','unknown','form','PLAN DETAILS UNKNOWN'),
 ('jobber-angi','jobber','grow','angi','DOCUMENTED PLAN ELIGIBILITY / TEST REQUIRED'),
 ('jobber-ga4','jobber','connect','tracking','MEASUREMENT LIMITATION DOCUMENTED'),
 ('unsupported-route','hcp','max','angi','NOT VERIFIED FOR THIS ROUTE'),
 ('unknown-vendor','unknown','unknown','form','NOT VERIFIED FOR THIS ROUTE'),
]
results=[]
def assert_equal(actual,expected):
 assert actual==expected, f"actual={actual!r} expected={expected!r}"
def test(name,fn):
 try:
  fn();results.append(('PASS',name,''))
 except Exception as e:results.append(('FAIL',name,str(e)))
with sync_playwright() as p:
 browser=p.chromium.launch(headless=True,executable_path=os.getenv('CHROMIUM_BIN') or shutil.which('chromium') or None,args=['--no-sandbox'])
 page=browser.new_page()
 errors=[]; outbound=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('request',lambda r:outbound.append(r.url))
 page.set_content(HTML)
 test('no page JavaScript errors',lambda:assert_equal(errors,[]))
 for label,v,pl,route,expected in MATRIX:
  def check(v=v,pl=pl,route=route,expected=expected):
   page.locator('#vendor').select_option(v)
   if v:page.locator('#plan').select_option(pl)
   page.locator('#route').select_option(route)
   page.locator('#check').click()
   assert_equal(page.locator('#status').inner_text(),expected)
   assert_equal(page.locator('#answer').is_visible(),True)
  test(label,check)
 def vendor_reset():
  page.locator('#vendor').select_option('hcp');assert_equal(page.locator('#answer').is_visible(),False)
 test('vendor change resets result',vendor_reset)
 def plan_reset():
  page.locator('#plan').select_option('max');page.locator('#route').select_option('api');page.locator('#check').click();page.locator('#plan').select_option('basic');assert_equal(page.locator('#answer').is_visible(),False)
 test('plan change resets result',plan_reset)
 def route_reset():
  page.locator('#vendor').select_option('jobber');page.locator('#plan').select_option('core');page.locator('#route').select_option('form');page.locator('#check').click();page.locator('#route').select_option('tracking');assert_equal(page.locator('#answer').is_visible(),False)
 test('operation change resets result',route_reset)
 test('no outgoing browser requests',lambda:assert_equal(outbound,[]))
 def provenance():
  page.locator('#vendor').select_option('jobber');page.locator('#plan').select_option('core');page.locator('#route').select_option('form');page.locator('#check').click()
  assert page.locator('#source').get_attribute('href').startswith('https://')
  assert page.locator('#source').get_attribute('rel')=='noopener noreferrer'
 test('official HTTPS source linked safely',provenance)
 def source_unknown():
  page.locator('#vendor').select_option('unknown');page.locator('#plan').select_option('unknown');page.locator('#route').select_option('api');page.locator('#check').click()
  assert_equal(page.locator('#status').inner_text(),'NOT VERIFIED FOR THIS ROUTE')
  assert_equal(page.locator('#sourceRow').is_visible(),False)
 test('unknown provider does not falsely cite unrelated documentation',source_unknown)
 def copy_feedback():
  page.locator('#copy').click()
  page.wait_for_function("document.getElementById('copyMessage').textContent.length > 0")
  text=page.locator('#copyMessage').inner_text()
  assert ('copied' in text.lower()) or ('unavailable' in text.lower()),text
 test('copy button gives actual browser outcome feedback',copy_feedback)
 def keyboard():
  assert_equal(page.locator('#answer').get_attribute('aria-live'),'polite')
  for id in ['vendor','plan','route','check']:assert_equal(page.locator('#'+id).count(),1)
  page.locator('#vendor').focus();assert_equal(page.evaluate('document.activeElement.id'),'vendor')
  page.keyboard.press('Tab');assert_equal(page.evaluate('document.activeElement.id'),'plan')
 test('keyboard form navigation',keyboard)
 page.close()
 mobile=browser.new_page(viewport={'width':375,'height':750},device_scale_factor=2,is_mobile=True,has_touch=True)
 mobile.set_content(HTML)
 def overflow():
  scroll,width=mobile.evaluate('()=>[document.documentElement.scrollWidth,window.innerWidth]')
  assert scroll<=width,(scroll,width)
 test('mobile no horizontal overflow',overflow)
 def tap():
  mobile.locator('#vendor').select_option('hcp');mobile.locator('#plan').select_option('max');mobile.locator('#route').select_option('api');mobile.locator('#check').tap();assert_equal(mobile.locator('#answer').is_visible(),True)
 test('mobile touch workflow',tap)
 mobile.screenshot(path=str(BASE/'mobile.png'),full_page=True)
 browser.close()
result={'passed':sum(k=='PASS' for k,*_ in results),'failed':sum(k=='FAIL' for k,*_ in results),'checks':[{'result':k,'name':n,'detail':d} for k,n,d in results]}
(BASE/'baseline-test-results.json').write_text(json.dumps(result,indent=2)+'\n')
for k,n,d in results:print(k,n,d)
print('SUMMARY',result['passed'],'passed;',result['failed'],'failed')
if result['failed']:raise SystemExit(1)
