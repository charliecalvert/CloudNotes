/* ! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
if (typeof document!=='undefined'&&!('classList' in document.createElement('a'))) {
    (function(j) {
        const a='classList'; const f='prototype'; const m=(j.HTMLElement||j.Element)[f]; const b=Object; const k=String[f].trim||function() {
            return this.replace(/^\s+|\s+$/g, '');
        }; const c=Array[f].indexOf||function(q) {
            let p=0; const o=this.length; for (;p<o; p++) {
                if (p in this&&this[p]===q) {
                    return p;
                }
            } return -1;
        }; const n=function(o, p) {
            this.name=o; this.code=DOMException[o]; this.message=p;
        }; const g=function(p, o) {
            if (o==='') {
                throw new n('SYNTAX_ERR', 'An invalid or illegal string was specified');
            } if (/\s/.test(o)) {
                throw new n('INVALID_CHARACTER_ERR', 'String contains an invalid character');
            } return c.call(p, o);
        }; const d=function(s) {
            const r=k.call(s.className); const q=r?r.split(/\s+/):[]; let p=0; const o=q.length; for (;p<o; p++) {
                this.push(q[p]);
            } this._updateClassName=function() {
                s.className=this.toString();
            };
        }; const e=d[f]=[]; const i=function() {
            return new d(this);
        }; n[f]=Error[f]; e.item=function(o) {
            return this[o]||null;
        }; e.contains=function(o) {
            o+=''; return g(this, o)!==-1;
        }; e.add=function(o) {
            o+=''; if (g(this, o)===-1) {
                this.push(o); this._updateClassName();
            }
        }; e.remove=function(p) {
            p+=''; const o=g(this, p); if (o!==-1) {
                this.splice(o, 1); this._updateClassName();
            }
        }; e.toggle=function(o) {
            o+=''; if (g(this, o)===-1) {
                this.add(o);
            } else {
                this.remove(o);
            }
        }; e.toString=function() {
            return this.join(' ');
        }; if (b.defineProperty) {
            const l={get: i, enumerable: true, configurable: true}; try {
                b.defineProperty(m, a, l);
            } catch (h) {
                if (h.number===-2146823252) {
                    l.enumerable=false; b.defineProperty(m, a, l);
                }
            }
        } else {
            if (b[f].__defineGetter__) {
                m.__defineGetter__(a, i);
            }
        }
    }(self));
};
