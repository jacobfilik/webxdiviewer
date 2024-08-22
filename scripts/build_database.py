from larch.io import xdi
from pathlib import Path
import json

path = "../public/xdidata"

p = path +"/As/as2o3_100K_scan1.xdi"

element = "element"
symbol = "symbol"
edge = "edge"
comments = "comments"
beamline = "beamline"
facility = "facility"
name = "name"
formula = "formula"
prep = "prep"
sample = "sample"
scan = "scan"
start_time = "start_time"
unspecified = "unspecified"
location_key = "location"

# print(out.comments)
def extract_metadata(path, location):
    out = xdi.read_xdi(path)

    metadata = {location_key : location}

    if element in out.attrs and symbol in out.attrs[element] and edge in out.attrs[element]:
        el = out.attrs[element]
        metadata[element] = {symbol : el[symbol]}
        metadata[edge] = {name : el[edge]}
    else:
        raise Exception("Header does not contain element metadata")

    if sample in out.attrs and name in out.attrs[sample]:
        el = out.attrs[sample]
        metadata[sample] = {name : el[name]}
        metadata[sample][formula] = el.get(formula,unspecified)
        metadata[sample][prep] = el.get(prep,unspecified)
    else:
        raise Exception("Header does not contain sample metadata")

    metadata[comments] = out.comments

    if beamline in out.attrs:
        metadata[beamline] = {name: out.attrs[beamline].get(name, unspecified)}

    if facility in out.attrs:
        metadata[facility] = {name: out.attrs[facility].get(name,unspecified)}


    if scan in out.attrs and start_time in out.attrs[scan]:
        metadata[start_time] = out.attrs[scan][start_time]
    else:
        metadata[start_time] = unspecified

    return metadata

p = Path(path)

m = []

for child in p.rglob("*.xdi"):
    if child.is_file():
        md = extract_metadata(str(child), str(child.relative_to(p)))
        m.append(md)


with open("db.json", 'w') as fh:
    fh.write(json.dumps(m))