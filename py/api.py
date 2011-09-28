from mod_python import apache
import sys
from objectClasses import *
from config import *

###########################

full = api["full"]
server = api["server"]

###########################

def user(req):
    info = req.form
    page = "me"
    if "page" in info:
        page = info["page"]

    p = Person(full=full)
    p.setParams(info)
    data = ""
    if page.lower() in ("proposal", "proposals", "prop", "props"):
        data = p.prop()
    elif page.lower() in ("co-pi", "co-pis", "copi", "copis", "pi", "pis"):
        data = p.PI()
    elif page.lower() in ("search") and "q" in info:
        data = p.search(query=info["q"])
    else:
        data = p.me()
    return formatJson(data, info)
###########################

def proposal(req):
    info = req.form
    page = "me"
    if "page" in info:
        page = info["page"]

    p = Proposal(full=full)
    p.setParams(info)
    data = ""
    if page.lower() in ("co-pi", "co-pis", "copi", "copis", "pi", "pis"):
        data = p.PI()
    elif page.lower() in ("org", "inst", "organization", "institution"):
        data = p.org()
    elif page.lower() in ("search") and "q" in info:
        data = p.search(query=info["q"])
    else:
        data = p.me()
    return formatJson(data, info)
def prop(req):
    return proposal(req)

###########################

def organization(req):
    info = req.form
    page = "me"
    if "page" in info:
        page = info["page"]

    p = Organization(full=full)
    p.setParams(info)
    data = ""
    if page.lower() in ("proposal", "proposals", "prop", "props"):
        data = p.prop()
    elif page.lower() in ("pi", "pis"):
        data = p.PI()
    elif page.lower() in ("alias"):
        data = p.alias()
    elif page.lower() in ("summ"):
        data = p.summ()
    elif page.lower() in ("search") and "q" in info:
        data = p.search(query=info["q"])
    else:
        data = p.me() 
    return formatJson(data, info)   
def org(req):
    return organization(req)

###########################

def topic(req):
    info = req.form
    page = "me"
    if "page" in info:
	page = info["page"]
    p = Topic(full=full)
    p.setParams(info)

    """
    org =  ("org"  in info) and info["org"]  or None
    if page.lower() in ("pi", "pis"):
        return p.PI(org)
    elif page.lower() in ("org", "inst", "organization", "institution"):
        return p.org(org)
    elif page.lower() in ("summ", "summary"):
        return p.summ(org)
    elif page.lower() in ("search") and "q" in info:
        return p.search(query=info["q"])
    else:
        return p.me(org)
    """
    data = ""
    org =  ("org"  in info) and info["org"]  or None
    if page.lower() in ("pi", "pis"):
	data = p.PI(org)
    elif page.lower() in ("org", "inst", "organization", "institution"):
	data = p.org(org)
    elif page.lower() in ("summ", "summary"):
	data = p.summ(org)
    elif page.lower() in ("search") and "q" in info:
	data = p.search(query=info["q"])
    else:
	data = p.me(org)
    return formatJson(data, info)

def formatJson(data, info):
    if('jsoncallback' in info):
	return info['jsoncallback'] + "(" + data + ")"
    elif('callback' in info):
	return info['callback'] + "(" + data + ")"
    else:
    	return data

def access(req):
    info = req.form
    return formatJson(json.dumps({"access":server}), info)
