from mod_python import apache
import sys
sys.path.append("/home/ron/Govt/Govt-API/NSF/RptSql/py")
from objectClasses import *


#  - ID (specific to each object)
#
#  - Year (> < - >= <=) .. between .... getYear (CHECK)
#  - Type (a)ward, (d)ecline, (p)roposal
#
# Prop == year_r
# PIs
# Org
#
# Topic == awarded_year
#  - Division
#
# search*


###########################

full = True

###########################

def user(req):
    info = req.form
    page = "me"
    if "page" in info:
        page = info["page"]

    p = Person(full=full)
    p.setParams(info)
    
    if page.lower() in ("proposal", "proposals", "prop", "props"):
        return p.prop()
    elif page.lower() in ("co-pi", "co-pis", "copi", "copis", "pi", "pis"):
        return p.PI()
    elif page.lower() in ("search") and "q" in info:
        return p.search(query=info["q"])
    else:
        return p.me()

###########################

def proposal(req):
    info = req.form
    page = "me"
    if "page" in info:
        page = info["page"]

    p = Proposal(full=full)
    p.setParams(info)

    if page.lower() in ("co-pi", "co-pis", "copi", "copis", "pi", "pis"):
        return p.PI()
    elif page.lower() in ("org", "inst", "organization", "institution"):
        return p.org()
    elif page.lower() in ("search") and "q" in info:
        return p.search(query=info["q"])
    else:
        return p.me()
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

    if page.lower() in ("proposal", "proposals", "prop", "props"):
        return p.prop()
    elif page.lower() in ("pi", "pis"):
        return p.PI()
    elif page.lower() in ("alias"):
        return p.alias()
    elif page.lower() in ("search") and "q" in info:
        return p.search(query=info["q"])
    else:
        return p.me()
    
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

