 if(Object.prototype.toSource){
	_toSource = function(vValue){
		return vValue.toSource();
	}
 }else{
	_toSource = function(vValue){
		var func = {
			$ : function($) {
				if (typeof $ == "undefined") return '""';
				if (typeof $ == "boolean") return $?"true":"false";
				if (typeof $ == "string") return this.s($);
				if (typeof $ == "number") return $;
				if ($ instanceof Array) return this.a($);
				if ($ instanceof Object) return this.o($);
			},
			s : function(s) {
				var e = {'"':'\\"',"\\":"\\\\","\n":"\\n","\r":"\\r","\t":"\\t"};
				var c = function(m){ return (typeof e[m] != "undefined")?e[m]:m };
				return '"'+s.replace(/[\\"'\n\r\t]/g, c)+'"';
			},
			a : function(a) {
				var s = "[",c = "",n=a.length;
				for(var i=0; i < n; i++) {
					if (typeof a[i] == "function") continue;
					s += c+this.$(a[i]);
					if (!c) c = ",";
				}
				return s+"]";
			},
			o : function(o) {
				var s = "{",c = "";
				for(var x in o) {
					if (typeof o[x] == "function") continue;
					s += c+this.s(x)+":"+this.$(o[x]);
					if (!c) c = ",";
				}
				return s+"}";
			}
		}
		return func.$(vValue);
	}
 }