/*
 Highcharts JS v10.2.1 (2022-10-13)

 3D features for Highcharts JS

 License: www.highcharts.com/license
*/
(function (a) { "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/highcharts-3d", ["highcharts"], function (F) { a(F); a.Highcharts = F; return a }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (a) {
    function F(a, y, v, D) { a.hasOwnProperty(y) || (a[y] = D.apply(null, v), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: y, module: a[y] } }))) } a = a ? a._modules : {}; F(a, "Core/Math3D.js",
        [a["Core/Globals.js"], a["Core/Utilities.js"]], function (a, y) {
            function v(m, f, l, d) {
                var b = f.options.chart.options3d, a = q(d, l ? f.inverted : !1), g = { x: f.plotWidth / 2, y: f.plotHeight / 2, z: b.depth / 2, vd: q(b.depth, 1) * q(b.viewDistance, 0) }, B = f.scale3d || 1; d = H * b.beta * (a ? -1 : 1); b = H * b.alpha * (a ? -1 : 1); var n = Math.cos(b), u = Math.cos(-d), C = Math.sin(b), p = Math.sin(-d); l || (g.x += f.plotLeft, g.y += f.plotTop); return m.map(function (b) {
                    var f = (a ? b.y : b.x) - g.x; var d = (a ? b.x : b.y) - g.y; b = (b.z || 0) - g.z; f = {
                        x: u * f - p * b, y: -C * p * f + n * d - u * C * b, z: n * p * f + C * d +
                            n * u * b
                    }; d = z(f, g, g.vd); d.x = d.x * B + g.x; d.y = d.y * B + g.y; d.z = f.z * B + g.z; return { x: a ? d.y : d.x, y: a ? d.x : d.y, z: d.z }
                })
            } function z(a, f, l) { f = 0 < l && l < Number.POSITIVE_INFINITY ? l / (a.z + f.z + l) : 1; return { x: a.x * f, y: a.y * f } } function m(a) { var f = 0, l; for (l = 0; l < a.length; l++) { var d = (l + 1) % a.length; f += a[l].x * a[d].y - a[d].x * a[l].y } return f / 2 } var H = a.deg2rad, q = y.pick; return {
                perspective: v, perspective3D: z, pointCameraDistance: function (a, f) {
                    var l = f.options.chart.options3d, d = f.plotWidth / 2; f = f.plotHeight / 2; l = q(l.depth, 1) * q(l.viewDistance, 0) +
                        l.depth; return Math.sqrt(Math.pow(d - q(a.plotX, a.x), 2) + Math.pow(f - q(a.plotY, a.y), 2) + Math.pow(l - q(a.plotZ, a.z), 2))
                }, shapeArea: m, shapeArea3D: function (a, f, l) { return m(v(a, f, l)) }
            }
        }); F(a, "Core/Renderer/SVG/SVGElement3D.js", [a["Core/Color/Color.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Utilities.js"]], function (a, y, v) {
            var z = a.parse, m = v.defined; a = v.merge; var H = v.objectEach, q = v.pick, C = {
                base: {
                    initArgs: function (f) {
                        var a = this, d = a.renderer, b = d[a.pathType + "Path"](f), m = b.zIndexes; a.parts.forEach(function (g) {
                            var f =
                                { "class": "highcharts-3d-" + g, zIndex: m[g] || 0 }; d.styledMode && ("top" === g ? f.filter = "url(#highcharts-brighter)" : "side" === g && (f.filter = "url(#highcharts-darker)")); a[g] = d.path(b[g]).attr(f).add(a)
                        }); a.attr({ "stroke-linejoin": "round", zIndex: m.group }); a.originalDestroy = a.destroy; a.destroy = a.destroyParts; a.forcedSides = b.forcedSides
                    }, singleSetterForParts: function (a, m, d, b, k, g) {
                        var f = {}; b = [null, null, b || "attr", k, g]; var n = d && d.zIndexes; d ? (n && n.group && this.attr({ zIndex: n.group }), H(d, function (b, g) {
                            f[g] = {}; f[g][a] =
                                b; n && (f[g].zIndex = d.zIndexes[g] || 0)
                        }), b[1] = f) : (f[a] = m, b[0] = f); return this.processParts.apply(this, b)
                    }, processParts: function (a, m, d, b, k) { var g = this; g.parts.forEach(function (f) { m && (a = q(m[f], !1)); if (!1 !== a) g[f][d](a, b, k) }); return g }, destroyParts: function () { this.processParts(null, null, "destroy"); return this.originalDestroy() }
                }
            }; C.cuboid = a(C.base, {
                parts: ["front", "top", "side"], pathType: "cuboid", attr: function (a, l, d, b) {
                    if ("string" === typeof a && "undefined" !== typeof l) { var f = a; a = {}; a[f] = l } return a.shapeArgs ||
                        m(a.x) ? this.singleSetterForParts("d", null, this.renderer[this.pathType + "Path"](a.shapeArgs || a)) : y.prototype.attr.call(this, a, void 0, d, b)
                }, animate: function (a, l, d) { if (m(a.x) && m(a.y)) { a = this.renderer[this.pathType + "Path"](a); var b = a.forcedSides; this.singleSetterForParts("d", null, a, "animate", l, d); this.attr({ zIndex: a.zIndexes.group }); b !== this.forcedSides && (this.forcedSides = b, this.renderer.styledMode || C.cuboid.fillSetter.call(this, this.fill)) } else y.prototype.animate.call(this, a, l, d); return this }, fillSetter: function (a) {
                    this.forcedSides =
                    this.forcedSides || []; this.singleSetterForParts("fill", null, { front: a, top: z(a).brighten(0 <= this.forcedSides.indexOf("top") ? 0 : .1).get(), side: z(a).brighten(0 <= this.forcedSides.indexOf("side") ? 0 : -.1).get() }); this.color = this.fill = a; return this
                }
            }); return C
        }); F(a, "Core/Renderer/SVG/SVGRenderer3D.js", [a["Core/Animation/AnimationUtilities.js"], a["Core/Color/Color.js"], a["Core/Globals.js"], a["Core/Math3D.js"], a["Core/Renderer/SVG/SVGElement.js"], a["Core/Renderer/SVG/SVGElement3D.js"], a["Core/Renderer/SVG/SVGRenderer.js"],
        a["Core/Utilities.js"]], function (a, y, v, D, m, H, q, C) {
            var f = this && this.__extends || function () { var a = function (h, b) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, c) { a.__proto__ = c } || function (a, c) { for (var r in c) c.hasOwnProperty(r) && (a[r] = c[r]) }; return a(h, b) }; return function (h, b) { function g() { this.constructor = h } a(h, b); h.prototype = null === b ? Object.create(b) : (g.prototype = b.prototype, new g) } }(), l = a.animObject, d = y.parse, b = v.charts, k = v.deg2rad, g = D.perspective, B = D.shapeArea, n = C.defined, u = C.extend,
            w = C.merge, p = C.pick, z = Math.cos, E = Math.sin, J = Math.PI, L = 4 * (Math.sqrt(2) - 1) / 3 / (J / 2); return function (a) {
                function h() { return null !== a && a.apply(this, arguments) || this } f(h, a); h.compose = function (a) { a = a.prototype; var b = h.prototype; a.elements3d = H; a.arc3d = b.arc3d; a.arc3dPath = b.arc3dPath; a.cuboid = b.cuboid; a.cuboidPath = b.cuboidPath; a.element3d = b.element3d; a.face3d = b.face3d; a.polyhedron = b.polyhedron; a.toLinePath = b.toLinePath; a.toLineSegments = b.toLineSegments }; h.curveTo = function (a, b, c, r, e, t, x, A) {
                    var h = [], g = t - e; return t >
                        e && t - e > Math.PI / 2 + .0001 ? (h = h.concat(this.curveTo(a, b, c, r, e, e + Math.PI / 2, x, A)), h = h.concat(this.curveTo(a, b, c, r, e + Math.PI / 2, t, x, A))) : t < e && e - t > Math.PI / 2 + .0001 ? (h = h.concat(this.curveTo(a, b, c, r, e, e - Math.PI / 2, x, A)), h = h.concat(this.curveTo(a, b, c, r, e - Math.PI / 2, t, x, A))) : [["C", a + c * Math.cos(e) - c * L * g * Math.sin(e) + x, b + r * Math.sin(e) + r * L * g * Math.cos(e) + A, a + c * Math.cos(t) + c * L * g * Math.sin(t) + x, b + r * Math.sin(t) - r * L * g * Math.cos(t) + A, a + c * Math.cos(t) + x, b + r * Math.sin(t) + A]]
                }; h.prototype.toLinePath = function (a, b) {
                    var c = []; a.forEach(function (a) {
                        c.push(["L",
                            a.x, a.y])
                    }); a.length && (c[0][0] = "M", b && c.push(["Z"])); return c
                }; h.prototype.toLineSegments = function (a) { var b = [], c = !0; a.forEach(function (a) { b.push(c ? ["M", a.x, a.y] : ["L", a.x, a.y]); c = !c }); return b }; h.prototype.face3d = function (a) {
                    var h = this, c = this.createElement("path"); c.vertexes = []; c.insidePlotArea = !1; c.enabled = !0; c.attr = function (c) {
                        if ("object" === typeof c && (n(c.enabled) || n(c.vertexes) || n(c.insidePlotArea))) {
                            this.enabled = p(c.enabled, this.enabled); this.vertexes = p(c.vertexes, this.vertexes); this.insidePlotArea =
                                p(c.insidePlotArea, this.insidePlotArea); delete c.enabled; delete c.vertexes; delete c.insidePlotArea; var e = g(this.vertexes, b[h.chartIndex], this.insidePlotArea), t = h.toLinePath(e, !0); e = B(e); c.d = t; c.visibility = this.enabled && 0 < e ? "inherit" : "hidden"
                        } return m.prototype.attr.apply(this, arguments)
                    }; c.animate = function (c) {
                        if ("object" === typeof c && (n(c.enabled) || n(c.vertexes) || n(c.insidePlotArea))) {
                            this.enabled = p(c.enabled, this.enabled); this.vertexes = p(c.vertexes, this.vertexes); this.insidePlotArea = p(c.insidePlotArea,
                                this.insidePlotArea); delete c.enabled; delete c.vertexes; delete c.insidePlotArea; var e = g(this.vertexes, b[h.chartIndex], this.insidePlotArea), t = h.toLinePath(e, !0); e = B(e); e = this.enabled && 0 < e ? "visible" : "hidden"; c.d = t; this.attr("visibility", e)
                        } return m.prototype.animate.apply(this, arguments)
                    }; return c.attr(a)
                }; h.prototype.polyhedron = function (a) {
                    var b = this, c = this.g(), h = c.destroy; this.styledMode || c.attr({ "stroke-linejoin": "round" }); c.faces = []; c.destroy = function () {
                        for (var e = 0; e < c.faces.length; e++)c.faces[e].destroy();
                        return h.call(this)
                    }; c.attr = function (e, t, a, h) { if ("object" === typeof e && n(e.faces)) { for (; c.faces.length > e.faces.length;)c.faces.pop().destroy(); for (; c.faces.length < e.faces.length;)c.faces.push(b.face3d().add(c)); for (var x = 0; x < e.faces.length; x++)b.styledMode && delete e.faces[x].fill, c.faces[x].attr(e.faces[x], null, a, h); delete e.faces } return m.prototype.attr.apply(this, arguments) }; c.animate = function (e, t, a) {
                        if (e && e.faces) {
                            for (; c.faces.length > e.faces.length;)c.faces.pop().destroy(); for (; c.faces.length < e.faces.length;)c.faces.push(b.face3d().add(c));
                            for (var x = 0; x < e.faces.length; x++)c.faces[x].animate(e.faces[x], t, a); delete e.faces
                        } return m.prototype.animate.apply(this, arguments)
                    }; return c.attr(a)
                }; h.prototype.element3d = function (a, b) { var c = this.g(); u(c, this.elements3d[a]); c.initArgs(b); return c }; h.prototype.cuboid = function (a) { return this.element3d("cuboid", a) }; h.prototype.cuboidPath = function (a) {
                    function h(c) {
                        return 0 === x && 1 < c && 6 > c ? { x: I[c].x, y: I[c].y + 10, z: I[c].z } : I[0].x === I[7].x && 4 <= c ? { x: I[c].x + 10, y: I[c].y, z: I[c].z } : 0 === d && 2 > c || 5 < c ? {
                            x: I[c].x, y: I[c].y,
                            z: I[c].z + 10
                        } : I[c]
                    } function c(c) { return I[c] } var r = a.x || 0, e = a.y || 0, t = a.z || 0, x = a.height || 0, A = a.width || 0, d = a.depth || 0, f = b[this.chartIndex], m = f.options.chart.options3d.alpha, n = 0, I = [{ x: r, y: e, z: t }, { x: r + A, y: e, z: t }, { x: r + A, y: e + x, z: t }, { x: r, y: e + x, z: t }, { x: r, y: e + x, z: t + d }, { x: r + A, y: e + x, z: t + d }, { x: r + A, y: e, z: t + d }, { x: r, y: e, z: t + d }], l = []; I = g(I, f, a.insidePlotArea); var G = function (e, a, t) {
                        var x = [[], -1], b = e.map(c), r = a.map(c); e = e.map(h); a = a.map(h); 0 > B(b) ? x = [b, 0] : 0 > B(r) ? x = [r, 1] : t && (l.push(t), x = 0 > B(e) ? [b, 0] : 0 > B(a) ? [r, 1] : [b, 0]);
                        return x
                    }; var k = G([3, 2, 1, 0], [7, 6, 5, 4], "front"); a = k[0]; var u = k[1]; k = G([1, 6, 7, 0], [4, 5, 2, 3], "top"); A = k[0]; var q = k[1]; k = G([1, 2, 5, 6], [0, 7, 4, 3], "side"); G = k[0]; k = k[1]; 1 === k ? n += 1E6 * (f.plotWidth - r) : k || (n += 1E6 * r); n += 10 * (!q || 0 <= m && 180 >= m || 360 > m && 357.5 < m ? f.plotHeight - e : 10 + e); 1 === u ? n += 100 * t : u || (n += 100 * (1E3 - t)); return { front: this.toLinePath(a, !0), top: this.toLinePath(A, !0), side: this.toLinePath(G, !0), zIndexes: { group: Math.round(n) }, forcedSides: l, isFront: u, isTop: q }
                }; h.prototype.arc3d = function (a) {
                    function b(c) {
                        var a =
                            !1, t = {}, b; c = w(c); for (b in c) -1 !== e.indexOf(b) && (t[b] = c[b], delete c[b], a = !0); return a ? [t, c] : !1
                    } var c = this.g(), h = c.renderer, e = "x y r innerR start end depth".split(" "); a = w(a); a.alpha = (a.alpha || 0) * k; a.beta = (a.beta || 0) * k; c.top = h.path(); c.side1 = h.path(); c.side2 = h.path(); c.inn = h.path(); c.out = h.path(); c.onAdd = function () { var e = c.parentGroup, a = c.attr("class"); c.top.add(c);["out", "inn", "side1", "side2"].forEach(function (t) { c[t].attr({ "class": a + " highcharts-3d-side" }).add(e) }) };["addClass", "removeClass"].forEach(function (e) {
                        c[e] =
                        function () { var a = arguments;["top", "out", "inn", "side1", "side2"].forEach(function (t) { c[t][e].apply(c[t], a) }) }
                    }); c.setPaths = function (e) { var a = c.renderer.arc3dPath(e), t = 100 * a.zTop; c.attribs = e; c.top.attr({ d: a.top, zIndex: a.zTop }); c.inn.attr({ d: a.inn, zIndex: a.zInn }); c.out.attr({ d: a.out, zIndex: a.zOut }); c.side1.attr({ d: a.side1, zIndex: a.zSide1 }); c.side2.attr({ d: a.side2, zIndex: a.zSide2 }); c.zIndex = t; c.attr({ zIndex: t }); e.center && (c.top.setRadialReference(e.center), delete e.center) }; c.setPaths(a); c.fillSetter =
                        function (c) { var e = d(c).brighten(-.1).get(); this.fill = c; this.side1.attr({ fill: e }); this.side2.attr({ fill: e }); this.inn.attr({ fill: e }); this.out.attr({ fill: e }); this.top.attr({ fill: c }); return this };["opacity", "translateX", "translateY", "visibility"].forEach(function (e) { c[e + "Setter"] = function (e, a) { c[a] = e;["out", "inn", "side1", "side2", "top"].forEach(function (t) { c[t].attr(a, e) }) } }); c.attr = function (e) {
                            var a; if ("object" === typeof e && (a = b(e))) { var t = a[0]; arguments[0] = a[1]; u(c.attribs, t); c.setPaths(c.attribs) } return m.prototype.attr.apply(c,
                                arguments)
                        }; c.animate = function (e, a, h) {
                            var t = this.attribs, r = "data-" + Math.random().toString(26).substring(2, 9); delete e.center; delete e.z; delete e.alpha; delete e.beta; var x = l(p(a, this.renderer.globalAnimation)); if (x.duration) { a = b(e); c[r] = 0; e[r] = 1; c[r + "Setter"] = v.noop; if (a) { var A = a[0]; x.step = function (c, e) { function a(c) { return t[c] + (p(A[c], t[c]) - t[c]) * e.pos } e.prop === r && e.elem.setPaths(w(t, { x: a("x"), y: a("y"), r: a("r"), innerR: a("innerR"), start: a("start"), end: a("end"), depth: a("depth") })) } } a = x } return m.prototype.animate.call(this,
                                e, a, h)
                        }; c.destroy = function () { this.top.destroy(); this.out.destroy(); this.inn.destroy(); this.side1.destroy(); this.side2.destroy(); return m.prototype.destroy.call(this) }; c.hide = function () { this.top.hide(); this.out.hide(); this.inn.hide(); this.side1.hide(); this.side2.hide() }; c.show = function (c) { this.top.show(c); this.out.show(c); this.inn.show(c); this.side1.show(c); this.side2.show(c) }; return c
                }; h.prototype.arc3dPath = function (a) {
                    function b(c) { c %= 2 * Math.PI; c > Math.PI && (c = 2 * Math.PI - c); return c } var c = a.x || 0, r =
                        a.y || 0, e = a.start || 0, t = (a.end || 0) - .00001, x = a.r || 0, A = a.innerR || 0, g = a.depth || 0, d = a.alpha || 0, f = a.beta || 0, m = Math.cos(e), n = Math.sin(e); a = Math.cos(t); var l = Math.sin(t), k = x * Math.cos(f); x *= Math.cos(d); var u = A * Math.cos(f), q = A * Math.cos(d); A = g * Math.sin(f); var p = g * Math.sin(d); g = [["M", c + k * m, r + x * n]]; g = g.concat(h.curveTo(c, r, k, x, e, t, 0, 0)); g.push(["L", c + u * a, r + q * l]); g = g.concat(h.curveTo(c, r, u, q, t, e, 0, 0)); g.push(["Z"]); var B = 0 < f ? Math.PI / 2 : 0; f = 0 < d ? 0 : Math.PI / 2; B = e > -B ? e : t > -B ? -B : e; var G = t < J - f ? t : e < J - f ? J - f : t, w = 2 * J - f; d = [["M",
                            c + k * z(B), r + x * E(B)]]; d = d.concat(h.curveTo(c, r, k, x, B, G, 0, 0)); t > w && e < w ? (d.push(["L", c + k * z(G) + A, r + x * E(G) + p]), d = d.concat(h.curveTo(c, r, k, x, G, w, A, p)), d.push(["L", c + k * z(w), r + x * E(w)]), d = d.concat(h.curveTo(c, r, k, x, w, t, 0, 0)), d.push(["L", c + k * z(t) + A, r + x * E(t) + p]), d = d.concat(h.curveTo(c, r, k, x, t, w, A, p)), d.push(["L", c + k * z(w), r + x * E(w)]), d = d.concat(h.curveTo(c, r, k, x, w, G, 0, 0))) : t > J - f && e < J - f && (d.push(["L", c + k * Math.cos(G) + A, r + x * Math.sin(G) + p]), d = d.concat(h.curveTo(c, r, k, x, G, t, A, p)), d.push(["L", c + k * Math.cos(t), r + x * Math.sin(t)]),
                                d = d.concat(h.curveTo(c, r, k, x, t, G, 0, 0))); d.push(["L", c + k * Math.cos(G) + A, r + x * Math.sin(G) + p]); d = d.concat(h.curveTo(c, r, k, x, G, B, A, p)); d.push(["Z"]); f = [["M", c + u * m, r + q * n]]; f = f.concat(h.curveTo(c, r, u, q, e, t, 0, 0)); f.push(["L", c + u * Math.cos(t) + A, r + q * Math.sin(t) + p]); f = f.concat(h.curveTo(c, r, u, q, t, e, A, p)); f.push(["Z"]); m = [["M", c + k * m, r + x * n], ["L", c + k * m + A, r + x * n + p], ["L", c + u * m + A, r + q * n + p], ["L", c + u * m, r + q * n], ["Z"]]; c = [["M", c + k * a, r + x * l], ["L", c + k * a + A, r + x * l + p], ["L", c + u * a + A, r + q * l + p], ["L", c + u * a, r + q * l], ["Z"]]; l = Math.atan2(p,
                                    -A); r = Math.abs(t + l); a = Math.abs(e + l); e = Math.abs((e + t) / 2 + l); r = b(r); a = b(a); e = b(e); e *= 1E5; t = 1E5 * a; r *= 1E5; return { top: g, zTop: 1E5 * Math.PI + 1, out: d, zOut: Math.max(e, t, r), inn: f, zInn: Math.max(e, t, r), side1: m, zSide1: .99 * r, side2: c, zSide2: .99 * t }
                }; return h
            }(q)
        }); F(a, "Core/Chart/Chart3D.js", [a["Core/Color/Color.js"], a["Core/Math3D.js"], a["Core/DefaultOptions.js"], a["Core/Utilities.js"]], function (a, y, v, D) {
            var m = a.parse, z = y.perspective, q = y.shapeArea3D, C = v.defaultOptions, f = D.addEvent, l = D.isArray, d = D.merge, b = D.pick, k =
                D.wrap, g; (function (a) {
                    function g(c) { this.is3d() && "scatter" === c.options.type && (c.options.type = "scatter3d") } function u() {
                        if (this.chart3d && this.is3d()) {
                            var c = this.renderer, a = this.options.chart.options3d, e = this.chart3d.get3dFrame(), b = this.plotLeft, h = this.plotLeft + this.plotWidth, g = this.plotTop, d = this.plotTop + this.plotHeight; a = a.depth; var f = b - (e.left.visible ? e.left.size : 0), k = h + (e.right.visible ? e.right.size : 0), n = g - (e.top.visible ? e.top.size : 0), l = d + (e.bottom.visible ? e.bottom.size : 0), u = 0 - (e.front.visible ? e.front.size :
                                0), p = a + (e.back.visible ? e.back.size : 0), q = this.hasRendered ? "animate" : "attr"; this.chart3d.frame3d = e; this.frameShapes || (this.frameShapes = { bottom: c.polyhedron().add(), top: c.polyhedron().add(), left: c.polyhedron().add(), right: c.polyhedron().add(), back: c.polyhedron().add(), front: c.polyhedron().add() }); this.frameShapes.bottom[q]({
                                    "class": "highcharts-3d-frame highcharts-3d-frame-bottom", zIndex: e.bottom.frontFacing ? -1E3 : 1E3, faces: [{
                                        fill: m(e.bottom.color).brighten(.1).get(), vertexes: [{ x: f, y: l, z: u }, { x: k, y: l, z: u },
                                        { x: k, y: l, z: p }, { x: f, y: l, z: p }], enabled: e.bottom.visible
                                    }, { fill: m(e.bottom.color).brighten(.1).get(), vertexes: [{ x: b, y: d, z: a }, { x: h, y: d, z: a }, { x: h, y: d, z: 0 }, { x: b, y: d, z: 0 }], enabled: e.bottom.visible }, { fill: m(e.bottom.color).brighten(-.1).get(), vertexes: [{ x: f, y: l, z: u }, { x: f, y: l, z: p }, { x: b, y: d, z: a }, { x: b, y: d, z: 0 }], enabled: e.bottom.visible && !e.left.visible }, { fill: m(e.bottom.color).brighten(-.1).get(), vertexes: [{ x: k, y: l, z: p }, { x: k, y: l, z: u }, { x: h, y: d, z: 0 }, { x: h, y: d, z: a }], enabled: e.bottom.visible && !e.right.visible }, {
                                        fill: m(e.bottom.color).get(),
                                        vertexes: [{ x: k, y: l, z: u }, { x: f, y: l, z: u }, { x: b, y: d, z: 0 }, { x: h, y: d, z: 0 }], enabled: e.bottom.visible && !e.front.visible
                                    }, { fill: m(e.bottom.color).get(), vertexes: [{ x: f, y: l, z: p }, { x: k, y: l, z: p }, { x: h, y: d, z: a }, { x: b, y: d, z: a }], enabled: e.bottom.visible && !e.back.visible }]
                                }); this.frameShapes.top[q]({
                                    "class": "highcharts-3d-frame highcharts-3d-frame-top", zIndex: e.top.frontFacing ? -1E3 : 1E3, faces: [{ fill: m(e.top.color).brighten(.1).get(), vertexes: [{ x: f, y: n, z: p }, { x: k, y: n, z: p }, { x: k, y: n, z: u }, { x: f, y: n, z: u }], enabled: e.top.visible },
                                    { fill: m(e.top.color).brighten(.1).get(), vertexes: [{ x: b, y: g, z: 0 }, { x: h, y: g, z: 0 }, { x: h, y: g, z: a }, { x: b, y: g, z: a }], enabled: e.top.visible }, { fill: m(e.top.color).brighten(-.1).get(), vertexes: [{ x: f, y: n, z: p }, { x: f, y: n, z: u }, { x: b, y: g, z: 0 }, { x: b, y: g, z: a }], enabled: e.top.visible && !e.left.visible }, { fill: m(e.top.color).brighten(-.1).get(), vertexes: [{ x: k, y: n, z: u }, { x: k, y: n, z: p }, { x: h, y: g, z: a }, { x: h, y: g, z: 0 }], enabled: e.top.visible && !e.right.visible }, {
                                        fill: m(e.top.color).get(), vertexes: [{ x: f, y: n, z: u }, { x: k, y: n, z: u }, {
                                            x: h, y: g,
                                            z: 0
                                        }, { x: b, y: g, z: 0 }], enabled: e.top.visible && !e.front.visible
                                    }, { fill: m(e.top.color).get(), vertexes: [{ x: k, y: n, z: p }, { x: f, y: n, z: p }, { x: b, y: g, z: a }, { x: h, y: g, z: a }], enabled: e.top.visible && !e.back.visible }]
                                }); this.frameShapes.left[q]({
                                    "class": "highcharts-3d-frame highcharts-3d-frame-left", zIndex: e.left.frontFacing ? -1E3 : 1E3, faces: [{ fill: m(e.left.color).brighten(.1).get(), vertexes: [{ x: f, y: l, z: u }, { x: b, y: d, z: 0 }, { x: b, y: d, z: a }, { x: f, y: l, z: p }], enabled: e.left.visible && !e.bottom.visible }, {
                                        fill: m(e.left.color).brighten(.1).get(),
                                        vertexes: [{ x: f, y: n, z: p }, { x: b, y: g, z: a }, { x: b, y: g, z: 0 }, { x: f, y: n, z: u }], enabled: e.left.visible && !e.top.visible
                                    }, { fill: m(e.left.color).brighten(-.1).get(), vertexes: [{ x: f, y: l, z: p }, { x: f, y: n, z: p }, { x: f, y: n, z: u }, { x: f, y: l, z: u }], enabled: e.left.visible }, { fill: m(e.left.color).brighten(-.1).get(), vertexes: [{ x: b, y: g, z: a }, { x: b, y: d, z: a }, { x: b, y: d, z: 0 }, { x: b, y: g, z: 0 }], enabled: e.left.visible }, { fill: m(e.left.color).get(), vertexes: [{ x: f, y: l, z: u }, { x: f, y: n, z: u }, { x: b, y: g, z: 0 }, { x: b, y: d, z: 0 }], enabled: e.left.visible && !e.front.visible },
                                    { fill: m(e.left.color).get(), vertexes: [{ x: f, y: n, z: p }, { x: f, y: l, z: p }, { x: b, y: d, z: a }, { x: b, y: g, z: a }], enabled: e.left.visible && !e.back.visible }]
                                }); this.frameShapes.right[q]({
                                    "class": "highcharts-3d-frame highcharts-3d-frame-right", zIndex: e.right.frontFacing ? -1E3 : 1E3, faces: [{ fill: m(e.right.color).brighten(.1).get(), vertexes: [{ x: k, y: l, z: p }, { x: h, y: d, z: a }, { x: h, y: d, z: 0 }, { x: k, y: l, z: u }], enabled: e.right.visible && !e.bottom.visible }, {
                                        fill: m(e.right.color).brighten(.1).get(), vertexes: [{ x: k, y: n, z: u }, { x: h, y: g, z: 0 }, {
                                            x: h,
                                            y: g, z: a
                                        }, { x: k, y: n, z: p }], enabled: e.right.visible && !e.top.visible
                                    }, { fill: m(e.right.color).brighten(-.1).get(), vertexes: [{ x: h, y: g, z: 0 }, { x: h, y: d, z: 0 }, { x: h, y: d, z: a }, { x: h, y: g, z: a }], enabled: e.right.visible }, { fill: m(e.right.color).brighten(-.1).get(), vertexes: [{ x: k, y: l, z: u }, { x: k, y: n, z: u }, { x: k, y: n, z: p }, { x: k, y: l, z: p }], enabled: e.right.visible }, { fill: m(e.right.color).get(), vertexes: [{ x: k, y: n, z: u }, { x: k, y: l, z: u }, { x: h, y: d, z: 0 }, { x: h, y: g, z: 0 }], enabled: e.right.visible && !e.front.visible }, {
                                        fill: m(e.right.color).get(),
                                        vertexes: [{ x: k, y: l, z: p }, { x: k, y: n, z: p }, { x: h, y: g, z: a }, { x: h, y: d, z: a }], enabled: e.right.visible && !e.back.visible
                                    }]
                                }); this.frameShapes.back[q]({
                                    "class": "highcharts-3d-frame highcharts-3d-frame-back", zIndex: e.back.frontFacing ? -1E3 : 1E3, faces: [{ fill: m(e.back.color).brighten(.1).get(), vertexes: [{ x: k, y: l, z: p }, { x: f, y: l, z: p }, { x: b, y: d, z: a }, { x: h, y: d, z: a }], enabled: e.back.visible && !e.bottom.visible }, {
                                        fill: m(e.back.color).brighten(.1).get(), vertexes: [{ x: f, y: n, z: p }, { x: k, y: n, z: p }, { x: h, y: g, z: a }, { x: b, y: g, z: a }], enabled: e.back.visible &&
                                            !e.top.visible
                                    }, { fill: m(e.back.color).brighten(-.1).get(), vertexes: [{ x: f, y: l, z: p }, { x: f, y: n, z: p }, { x: b, y: g, z: a }, { x: b, y: d, z: a }], enabled: e.back.visible && !e.left.visible }, { fill: m(e.back.color).brighten(-.1).get(), vertexes: [{ x: k, y: n, z: p }, { x: k, y: l, z: p }, { x: h, y: d, z: a }, { x: h, y: g, z: a }], enabled: e.back.visible && !e.right.visible }, { fill: m(e.back.color).get(), vertexes: [{ x: b, y: g, z: a }, { x: h, y: g, z: a }, { x: h, y: d, z: a }, { x: b, y: d, z: a }], enabled: e.back.visible }, {
                                        fill: m(e.back.color).get(), vertexes: [{ x: f, y: l, z: p }, { x: k, y: l, z: p },
                                        { x: k, y: n, z: p }, { x: f, y: n, z: p }], enabled: e.back.visible
                                    }]
                                }); this.frameShapes.front[q]({
                                    "class": "highcharts-3d-frame highcharts-3d-frame-front", zIndex: e.front.frontFacing ? -1E3 : 1E3, faces: [{ fill: m(e.front.color).brighten(.1).get(), vertexes: [{ x: f, y: l, z: u }, { x: k, y: l, z: u }, { x: h, y: d, z: 0 }, { x: b, y: d, z: 0 }], enabled: e.front.visible && !e.bottom.visible }, { fill: m(e.front.color).brighten(.1).get(), vertexes: [{ x: k, y: n, z: u }, { x: f, y: n, z: u }, { x: b, y: g, z: 0 }, { x: h, y: g, z: 0 }], enabled: e.front.visible && !e.top.visible }, {
                                        fill: m(e.front.color).brighten(-.1).get(),
                                        vertexes: [{ x: f, y: n, z: u }, { x: f, y: l, z: u }, { x: b, y: d, z: 0 }, { x: b, y: g, z: 0 }], enabled: e.front.visible && !e.left.visible
                                    }, { fill: m(e.front.color).brighten(-.1).get(), vertexes: [{ x: k, y: l, z: u }, { x: k, y: n, z: u }, { x: h, y: g, z: 0 }, { x: h, y: d, z: 0 }], enabled: e.front.visible && !e.right.visible }, { fill: m(e.front.color).get(), vertexes: [{ x: h, y: g, z: 0 }, { x: b, y: g, z: 0 }, { x: b, y: d, z: 0 }, { x: h, y: d, z: 0 }], enabled: e.front.visible }, { fill: m(e.front.color).get(), vertexes: [{ x: k, y: l, z: u }, { x: f, y: l, z: u }, { x: f, y: n, z: u }, { x: k, y: n, z: u }], enabled: e.front.visible }]
                                })
                        }
                    }
                    function w() { this.styledMode && [{ name: "darker", slope: .6 }, { name: "brighter", slope: 1.4 }].forEach(function (a) { this.renderer.definition({ tagName: "filter", attributes: { id: "highcharts-" + a.name }, children: [{ tagName: "feComponentTransfer", children: [{ tagName: "feFuncR", attributes: { type: "linear", slope: a.slope } }, { tagName: "feFuncG", attributes: { type: "linear", slope: a.slope } }, { tagName: "feFuncB", attributes: { type: "linear", slope: a.slope } }] }] }) }, this) } function p() {
                        var a = this.options; this.is3d() && (a.series || []).forEach(function (c) {
                            "scatter" ===
                            (c.type || a.chart.type || a.chart.defaultSeriesType) && (c.type = "scatter3d")
                        })
                    } function B() {
                        var a = this.options.chart.options3d; if (this.chart3d && this.is3d()) {
                            a && (a.alpha = a.alpha % 360 + (0 <= a.alpha ? 0 : 360), a.beta = a.beta % 360 + (0 <= a.beta ? 0 : 360)); var b = this.inverted, e = this.clipBox, h = this.margin; e[b ? "y" : "x"] = -(h[3] || 0); e[b ? "x" : "y"] = -(h[0] || 0); e[b ? "height" : "width"] = this.chartWidth + (h[3] || 0) + (h[1] || 0); e[b ? "width" : "height"] = this.chartHeight + (h[0] || 0) + (h[2] || 0); this.scale3d = 1; !0 === a.fitToPlot && (this.scale3d = this.chart3d.getScale(a.depth));
                            this.chart3d.frame3d = this.chart3d.get3dFrame()
                        }
                    } function E() { this.is3d() && (this.isDirtyBox = !0) } function v() { this.chart3d && this.is3d() && (this.chart3d.frame3d = this.chart3d.get3dFrame()) } function y() { this.chart3d || (this.chart3d = new N(this)) } function K(a) { return this.is3d() || a.apply(this, [].slice.call(arguments, 1)) } function h(a) { var c = this.series.length; if (this.is3d()) for (; c--;)a = this.series[c], a.translate(), a.render(); else a.call(this) } function G(a) {
                        a.apply(this, [].slice.call(arguments, 1)); this.is3d() &&
                            (this.container.className += " highcharts-3d-chart")
                    } var N = function () {
                        function a(a) { this.frame3d = void 0; this.chart = a } a.prototype.get3dFrame = function () {
                            var a = this.chart, e = a.options.chart.options3d, c = e.frame, h = a.plotLeft, g = a.plotLeft + a.plotWidth, d = a.plotTop, f = a.plotTop + a.plotHeight, k = e.depth, n = function (c) { c = q(c, a); return .5 < c ? 1 : -.5 > c ? -1 : 0 }, l = n([{ x: h, y: f, z: k }, { x: g, y: f, z: k }, { x: g, y: f, z: 0 }, { x: h, y: f, z: 0 }]), u = n([{ x: h, y: d, z: 0 }, { x: g, y: d, z: 0 }, { x: g, y: d, z: k }, { x: h, y: d, z: k }]), m = n([{ x: h, y: d, z: 0 }, { x: h, y: d, z: k }, {
                                x: h,
                                y: f, z: k
                            }, { x: h, y: f, z: 0 }]), p = n([{ x: g, y: d, z: k }, { x: g, y: d, z: 0 }, { x: g, y: f, z: 0 }, { x: g, y: f, z: k }]), G = n([{ x: h, y: f, z: 0 }, { x: g, y: f, z: 0 }, { x: g, y: d, z: 0 }, { x: h, y: d, z: 0 }]); n = n([{ x: h, y: d, z: k }, { x: g, y: d, z: k }, { x: g, y: f, z: k }, { x: h, y: f, z: k }]); var N = !1, B = !1, w = !1, E = !1;[].concat(a.xAxis, a.yAxis, a.zAxis).forEach(function (a) { a && (a.horiz ? a.opposite ? B = !0 : N = !0 : a.opposite ? E = !0 : w = !0) }); var K = function (a, c, e) {
                                for (var h = ["size", "color", "visible"], g = {}, d = 0; d < h.length; d++)for (var f = h[d], k = 0; k < a.length; k++)if ("object" === typeof a[k]) {
                                    var n = a[k][f];
                                    if ("undefined" !== typeof n && null !== n) { g[f] = n; break }
                                } a = e; !0 === g.visible || !1 === g.visible ? a = g.visible : "auto" === g.visible && (a = 0 < c); return { size: b(g.size, 1), color: b(g.color, "none"), frontFacing: 0 < c, visible: a }
                            }; c = { axes: {}, bottom: K([c.bottom, c.top, c], l, N), top: K([c.top, c.bottom, c], u, B), left: K([c.left, c.right, c.side, c], m, w), right: K([c.right, c.left, c.side, c], p, E), back: K([c.back, c.front, c], n, !0), front: K([c.front, c.back, c], G, !1) }; "auto" === e.axisLabelPosition ? (p = function (a, c) {
                                return a.visible !== c.visible || a.visible &&
                                    c.visible && a.frontFacing !== c.frontFacing
                            }, e = [], p(c.left, c.front) && e.push({ y: (d + f) / 2, x: h, z: 0, xDir: { x: 1, y: 0, z: 0 } }), p(c.left, c.back) && e.push({ y: (d + f) / 2, x: h, z: k, xDir: { x: 0, y: 0, z: -1 } }), p(c.right, c.front) && e.push({ y: (d + f) / 2, x: g, z: 0, xDir: { x: 0, y: 0, z: 1 } }), p(c.right, c.back) && e.push({ y: (d + f) / 2, x: g, z: k, xDir: { x: -1, y: 0, z: 0 } }), l = [], p(c.bottom, c.front) && l.push({ x: (h + g) / 2, y: f, z: 0, xDir: { x: 1, y: 0, z: 0 } }), p(c.bottom, c.back) && l.push({ x: (h + g) / 2, y: f, z: k, xDir: { x: -1, y: 0, z: 0 } }), u = [], p(c.top, c.front) && u.push({
                                x: (h + g) / 2, y: d, z: 0,
                                xDir: { x: 1, y: 0, z: 0 }
                            }), p(c.top, c.back) && u.push({ x: (h + g) / 2, y: d, z: k, xDir: { x: -1, y: 0, z: 0 } }), m = [], p(c.bottom, c.left) && m.push({ z: (0 + k) / 2, y: f, x: h, xDir: { x: 0, y: 0, z: -1 } }), p(c.bottom, c.right) && m.push({ z: (0 + k) / 2, y: f, x: g, xDir: { x: 0, y: 0, z: 1 } }), f = [], p(c.top, c.left) && f.push({ z: (0 + k) / 2, y: d, x: h, xDir: { x: 0, y: 0, z: -1 } }), p(c.top, c.right) && f.push({ z: (0 + k) / 2, y: d, x: g, xDir: { x: 0, y: 0, z: 1 } }), h = function (c, e, h) {
                                if (0 === c.length) return null; if (1 === c.length) return c[0]; for (var b = z(c, a, !1), g = 0, d = 1; d < b.length; d++)h * b[d][e] > h * b[g][e] ? g =
                                    d : h * b[d][e] === h * b[g][e] && b[d].z < b[g].z && (g = d); return c[g]
                            }, c.axes = { y: { left: h(e, "x", -1), right: h(e, "x", 1) }, x: { top: h(u, "y", -1), bottom: h(l, "y", 1) }, z: { top: h(f, "y", -1), bottom: h(m, "y", 1) } }) : c.axes = { y: { left: { x: h, z: 0, xDir: { x: 1, y: 0, z: 0 } }, right: { x: g, z: 0, xDir: { x: 0, y: 0, z: 1 } } }, x: { top: { y: d, z: 0, xDir: { x: 1, y: 0, z: 0 } }, bottom: { y: f, z: 0, xDir: { x: 1, y: 0, z: 0 } } }, z: { top: { x: w ? g : h, y: d, xDir: w ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 } }, bottom: { x: w ? g : h, y: f, xDir: w ? { x: 0, y: 0, z: 1 } : { x: 0, y: 0, z: -1 } } } }; return c
                        }; a.prototype.getScale = function (a) {
                            var c =
                                this.chart, h = c.plotLeft, b = c.plotWidth + h, g = c.plotTop, d = c.plotHeight + g, f = h + c.plotWidth / 2, k = g + c.plotHeight / 2, n = Number.MAX_VALUE, l = -Number.MAX_VALUE, u = Number.MAX_VALUE, p = -Number.MAX_VALUE, m = 1; var r = [{ x: h, y: g, z: 0 }, { x: h, y: g, z: a }];[0, 1].forEach(function (a) { r.push({ x: b, y: r[a].y, z: r[a].z }) });[0, 1, 2, 3].forEach(function (a) { r.push({ x: r[a].x, y: d, z: r[a].z }) }); r = z(r, c, !1); r.forEach(function (a) { n = Math.min(n, a.x); l = Math.max(l, a.x); u = Math.min(u, a.y); p = Math.max(p, a.y) }); h > n && (m = Math.min(m, 1 - Math.abs((h + f) / (n + f)) % 1));
                            b < l && (m = Math.min(m, (b - f) / (l - f))); g > u && (m = 0 > u ? Math.min(m, (g + k) / (-u + g + k)) : Math.min(m, 1 - (g + k) / (u + k) % 1)); d < p && (m = Math.min(m, Math.abs((d - k) / (p - k)))); return m
                        }; return a
                    }(); a.Composition = N; a.defaultOptions = { chart: { options3d: { enabled: !1, alpha: 0, beta: 0, depth: 100, fitToPlot: !0, viewDistance: 25, axisLabelPosition: null, frame: { visible: "default", size: 1, bottom: {}, top: {}, left: {}, right: {}, back: {}, front: {} } } } }; a.compose = function (c, b) {
                        var e = c.prototype; b = b.prototype; e.is3d = function () {
                            return !(!this.options.chart.options3d ||
                                !this.options.chart.options3d.enabled)
                        }; e.propsRequireDirtyBox.push("chart.options3d"); e.propsRequireUpdateSeries.push("chart.options3d"); b.matrixSetter = function () { if (1 > this.pos && (l(this.start) || l(this.end))) { var a = this.start || [1, 0, 0, 1, 0, 0], c = this.end || [1, 0, 0, 1, 0, 0]; var e = []; for (var h = 0; 6 > h; h++)e.push(this.pos * c[h] + (1 - this.pos) * a[h]) } else e = this.end; this.elem.attr(this.prop, e, null, !0) }; d(!0, C, a.defaultOptions); f(c, "init", y); f(c, "addSeries", g); f(c, "afterDrawChartBox", u); f(c, "afterGetContainer", w);
                        f(c, "afterInit", p); f(c, "afterSetChartSize", B); f(c, "beforeRedraw", E); f(c, "beforeRender", v); k(e, "isInsidePlot", K); k(c, "renderSeries", h); k(c, "setClassName", G)
                    }
                })(g || (g = {})); ""; return g
        }); F(a, "Core/Axis/ZAxis.js", [a["Core/Axis/Axis.js"], a["Core/Utilities.js"]], function (a, y) {
            function z(a) { return new d(this, a) } function D() { var a = this, d = this.options.zAxis = f(this.options.zAxis || {}); this.is3d() && (this.zAxis = [], d.forEach(function (b, d) { b.index = d; b.isX = !0; a.addZAxis(b).setScale() })) } var m = this && this.__extends ||
                function () { var a = function (b, g) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a, b) { for (var g in b) b.hasOwnProperty(g) && (a[g] = b[g]) }; return a(b, g) }; return function (b, g) { function d() { this.constructor = b } a(b, g); b.prototype = null === g ? Object.create(g) : (d.prototype = g.prototype, new d) } }(), H = y.addEvent, q = y.merge, C = y.pick, f = y.splat, l = [], d = function (a) {
                    function b(b, d) { b = a.call(this, b, d) || this; b.isZAxis = !0; return b } m(b, a); b.compose = function (a) {
                        -1 === l.indexOf(a) &&
                        (l.push(a), H(a, "afterGetAxes", D), a = a.prototype, a.addZAxis = z, a.collectionsWithInit.zAxis = [a.addZAxis], a.collectionsWithUpdate.push("zAxis"))
                    }; b.prototype.getSeriesExtremes = function () {
                        var a = this, b = this.chart; this.hasVisibleSeries = !1; this.dataMin = this.dataMax = this.ignoreMinPadding = this.ignoreMaxPadding = void 0; this.stacking && this.stacking.buildStacks(); this.series.forEach(function (d) {
                            if (d.visible || !b.options.chart.ignoreHiddenSeries) a.hasVisibleSeries = !0, d = d.zData, d.length && (a.dataMin = Math.min(C(a.dataMin,
                                d[0]), Math.min.apply(null, d)), a.dataMax = Math.max(C(a.dataMax, d[0]), Math.max.apply(null, d)))
                        })
                    }; b.prototype.setAxisSize = function () { var b = this.chart; a.prototype.setAxisSize.call(this); this.width = this.len = b.options.chart.options3d && b.options.chart.options3d.depth || 0; this.right = b.chartWidth - this.width - this.left }; b.prototype.setOptions = function (b) { b = q({ offset: 0, lineWidth: 0 }, b); this.isZAxis = !0; a.prototype.setOptions.call(this, b); this.coll = "zAxis" }; return b
                }(a); return d
        }); F(a, "Core/Axis/Axis3DDefaults.js",
            [], function () { return { labels: { position3d: "offset", skew3d: !1 }, title: { position3d: null, skew3d: null } } }); F(a, "Core/Axis/Tick3DComposition.js", [a["Core/Utilities.js"]], function (a) {
                function z(a) { var f = this.axis.axis3D; f && m(a.pos, f.fix3dPosition(a.pos)) } function v(a) { var f = this.axis.axis3D, l = a.apply(this, [].slice.call(arguments, 1)); if (f) { var d = l[0], b = l[1]; if ("M" === d[0] && "L" === b[0]) return f = [f.fix3dPosition({ x: d[1], y: d[2], z: 0 }), f.fix3dPosition({ x: b[1], y: b[2], z: 0 })], this.axis.chart.renderer.toLineSegments(f) } return l }
                var D = a.addEvent, m = a.extend, H = a.wrap, q = []; return { compose: function (a) { -1 === q.indexOf(a) && (q.push(a), D(a, "afterGetLabelPosition", z), H(a.prototype, "getMarkPath", v)) } }
            }); F(a, "Core/Axis/Axis3DComposition.js", [a["Core/Axis/Axis3DDefaults.js"], a["Core/Globals.js"], a["Core/Math3D.js"], a["Core/Axis/Tick3DComposition.js"], a["Core/Utilities.js"]], function (a, y, v, D, m) {
                function z() {
                    var a = this.chart, b = this.options; a.is3d && a.is3d() && "colorAxis" !== this.coll && (b.tickWidth = M(b.tickWidth, 0), b.gridLineWidth = M(b.gridLineWidth,
                        1))
                } function q(a) { this.chart.is3d() && "colorAxis" !== this.coll && a.point && (a.point.crosshairPos = this.isXAxis ? a.point.axisXpos : this.len - a.point.axisYpos) } function C() { this.axis3D || (this.axis3D = new L(this)) } function f(a) { return this.chart.is3d() && "colorAxis" !== this.coll ? [] : a.apply(this, [].slice.call(arguments, 1)) } function l(a) {
                    if (!this.chart.is3d() || "colorAxis" === this.coll) return a.apply(this, [].slice.call(arguments, 1)); var b = arguments, d = b[2], g = []; b = this.getPlotLinePath({ value: b[1] }); d = this.getPlotLinePath({ value: d });
                    if (b && d) for (var c = 0; c < b.length; c += 2) { var f = b[c], e = b[c + 1], k = d[c], l = d[c + 1]; "M" === f[0] && "L" === e[0] && "M" === k[0] && "L" === l[0] && g.push(f, e, l, ["L", k[1], k[2]], ["Z"]) } return g
                } function d(a) {
                    var b = this.axis3D, d = this.chart, g = a.apply(this, [].slice.call(arguments, 1)); if ("colorAxis" === this.coll || !d.chart3d || !d.is3d() || null === g) return g; var c = d.options.chart.options3d, f = this.isZAxis ? d.plotWidth : c.depth; c = d.chart3d.frame3d; var e = g[0], k = g[1]; g = []; "M" === e[0] && "L" === k[0] && (b = [b.swapZ({ x: e[1], y: e[2], z: 0 }), b.swapZ({
                        x: e[1],
                        y: e[2], z: f
                    }), b.swapZ({ x: k[1], y: k[2], z: 0 }), b.swapZ({ x: k[1], y: k[2], z: f })], this.horiz ? (this.isZAxis ? (c.left.visible && g.push(b[0], b[2]), c.right.visible && g.push(b[1], b[3])) : (c.front.visible && g.push(b[0], b[2]), c.back.visible && g.push(b[1], b[3])), c.top.visible && g.push(b[0], b[1]), c.bottom.visible && g.push(b[2], b[3])) : (c.front.visible && g.push(b[0], b[2]), c.back.visible && g.push(b[1], b[3]), c.left.visible && g.push(b[0], b[1]), c.right.visible && g.push(b[2], b[3])), g = B(g, this.chart, !1)); return d.renderer.toLineSegments(g)
                }
                function b(a, b) {
                    var d = this.chart, h = this.ticks, c = this.gridGroup; if (this.categories && d.frameShapes && d.is3d() && c && b && b.label) {
                        c = c.element.childNodes[0].getBBox(); var g = d.frameShapes.left.getBBox(), e = d.options.chart.options3d; d = { x: d.plotWidth / 2, y: d.plotHeight / 2, z: e.depth / 2, vd: M(e.depth, 1) * M(e.viewDistance, 0) }; e = b.pos; var f = h[e - 1], k = h[e + 1], l = h = void 0; 0 !== e && f && f.label && f.label.xy && (h = n({ x: f.label.xy.x, y: f.label.xy.y, z: null }, d, d.vd)); k && k.label && k.label.xy && (l = n({ x: k.label.xy.x, y: k.label.xy.y, z: null }, d,
                            d.vd)); e = { x: b.label.xy.x, y: b.label.xy.y, z: null }; e = n(e, d, d.vd); return Math.abs(h ? e.x - h.x : l ? l.x - e.x : c.x - g.x)
                    } return a.apply(this, [].slice.call(arguments, 1))
                } function k(a) { var b = a.apply(this, [].slice.call(arguments, 1)); return this.axis3D ? this.axis3D.fix3dPosition(b, !0) : b } var g = y.deg2rad, B = v.perspective, n = v.perspective3D, u = v.shapeArea, w = m.addEvent, p = m.merge, M = m.pick, E = m.wrap, J = [], L = function () {
                    function n(a) { this.axis = a } n.compose = function (h, g) {
                        D.compose(g); -1 === J.indexOf(h) && (J.push(h), p(!0, h.defaultOptions,
                            a), h.keepProps.push("axis3D"), w(h, "init", C), w(h, "afterSetOptions", z), w(h, "drawCrosshair", q), h = h.prototype, E(h, "getLinePath", f), E(h, "getPlotBandPath", l), E(h, "getPlotLinePath", d), E(h, "getSlotWidth", b), E(h, "getTitlePosition", k))
                    }; n.prototype.fix3dPosition = function (a, b) {
                        var d = this.axis, c = d.chart; if ("colorAxis" === d.coll || !c.chart3d || !c.is3d()) return a; var f = g * c.options.chart.options3d.alpha, e = g * c.options.chart.options3d.beta, h = M(b && d.options.title.position3d, d.options.labels.position3d); b = M(b && d.options.title.skew3d,
                            d.options.labels.skew3d); var k = c.chart3d.frame3d, l = c.plotLeft, n = c.plotWidth + l, m = c.plotTop, p = c.plotHeight + m, q = c = 0, w = { x: 0, y: 1, z: 0 }, E = !1; a = d.axis3D.swapZ({ x: a.x, y: a.y, z: 0 }); if (d.isZAxis) if (d.opposite) { if (null === k.axes.z.top) return {}; q = a.y - m; a.x = k.axes.z.top.x; a.y = k.axes.z.top.y; l = k.axes.z.top.xDir; E = !k.top.frontFacing } else { if (null === k.axes.z.bottom) return {}; q = a.y - p; a.x = k.axes.z.bottom.x; a.y = k.axes.z.bottom.y; l = k.axes.z.bottom.xDir; E = !k.bottom.frontFacing } else if (d.horiz) if (d.opposite) {
                                if (null === k.axes.x.top) return {};
                                q = a.y - m; a.y = k.axes.x.top.y; a.z = k.axes.x.top.z; l = k.axes.x.top.xDir; E = !k.top.frontFacing
                            } else { if (null === k.axes.x.bottom) return {}; q = a.y - p; a.y = k.axes.x.bottom.y; a.z = k.axes.x.bottom.z; l = k.axes.x.bottom.xDir; E = !k.bottom.frontFacing } else if (d.opposite) { if (null === k.axes.y.right) return {}; c = a.x - n; a.x = k.axes.y.right.x; a.z = k.axes.y.right.z; l = k.axes.y.right.xDir; l = { x: l.z, y: l.y, z: -l.x } } else { if (null === k.axes.y.left) return {}; c = a.x - l; a.x = k.axes.y.left.x; a.z = k.axes.y.left.z; l = k.axes.y.left.xDir } "chart" !== h && ("flap" ===
                                h ? d.horiz ? (e = Math.sin(f), f = Math.cos(f), d.opposite && (e = -e), E && (e = -e), w = { x: l.z * e, y: f, z: -l.x * e }) : l = { x: Math.cos(e), y: 0, z: Math.sin(e) } : "ortho" === h ? d.horiz ? (w = Math.cos(f), h = Math.sin(e) * w, f = -Math.sin(f), e = -w * Math.cos(e), w = { x: l.y * e - l.z * f, y: l.z * h - l.x * e, z: l.x * f - l.y * h }, f = 1 / Math.sqrt(w.x * w.x + w.y * w.y + w.z * w.z), E && (f = -f), w = { x: f * w.x, y: f * w.y, z: f * w.z }) : l = { x: Math.cos(e), y: 0, z: Math.sin(e) } : d.horiz ? w = { x: Math.sin(e) * Math.sin(f), y: Math.cos(f), z: -Math.cos(e) * Math.sin(f) } : l = { x: Math.cos(e), y: 0, z: Math.sin(e) }); a.x += c * l.x + q *
                                    w.x; a.y += c * l.y + q * w.y; a.z += c * l.z + q * w.z; c = B([a], d.chart)[0]; b && (0 > u(B([a, { x: a.x + l.x, y: a.y + l.y, z: a.z + l.z }, { x: a.x + w.x, y: a.y + w.y, z: a.z + w.z }], d.chart)) && (l = { x: -l.x, y: -l.y, z: -l.z }), a = B([{ x: a.x, y: a.y, z: a.z }, { x: a.x + l.x, y: a.y + l.y, z: a.z + l.z }, { x: a.x + w.x, y: a.y + w.y, z: a.z + w.z }], d.chart), c.matrix = [a[1].x - a[0].x, a[1].y - a[0].y, a[2].x - a[0].x, a[2].y - a[0].y, c.x, c.y], c.matrix[4] -= c.x * c.matrix[0] + c.y * c.matrix[2], c.matrix[5] -= c.x * c.matrix[1] + c.y * c.matrix[3]); return c
                    }; n.prototype.swapZ = function (a, b) {
                        var d = this.axis; return d.isZAxis ?
                            (b = b ? 0 : d.chart.plotLeft, { x: b + a.z, y: a.y, z: a.x - b }) : a
                    }; return n
                }(); return L
            }); F(a, "Core/Series/Series3D.js", [a["Core/Math3D.js"], a["Core/Series/Series.js"], a["Core/Utilities.js"]], function (a, y, v) {
                var z = this && this.__extends || function () {
                    var a = function (d, b) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, b) { a.__proto__ = b } || function (a, b) { for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]) }; return a(d, b) }; return function (d, b) {
                        function f() { this.constructor = d } a(d, b); d.prototype = null === b ? Object.create(b) :
                            (f.prototype = b.prototype, new f)
                    }
                }(), m = a.perspective; a = v.addEvent; var H = v.extend, q = v.merge, C = v.pick, f = v.isNumber; v = function (a) {
                    function d() { return null !== a && a.apply(this, arguments) || this } z(d, a); d.prototype.translate = function () { a.prototype.translate.apply(this, arguments); this.chart.is3d() && this.translate3dPoints() }; d.prototype.translate3dPoints = function () {
                        var a = this.options, d = this.chart, g = C(this.zAxis, d.options.zAxis[0]), l = [], n, u = []; this.zPadding = (a.stacking ? f(a.stack) ? a.stack : 0 : this.index || 0) * (a.depth ||
                            0 + (a.groupZPadding || 1)); for (n = 0; n < this.data.length; n++) { a = this.data[n]; if (g && g.translate) { var w = g.logarithmic && g.val2lin ? g.val2lin(a.z) : a.z; a.plotZ = g.translate(w); a.isInside = a.isInside ? w >= g.min && w <= g.max : !1 } else a.plotZ = this.zPadding; a.axisXpos = a.plotX; a.axisYpos = a.plotY; a.axisZpos = a.plotZ; l.push({ x: a.plotX, y: a.plotY, z: a.plotZ }); u.push(a.plotX || 0) } this.rawPointsX = u; d = m(l, d, !0); for (n = 0; n < this.data.length; n++)a = this.data[n], g = d[n], a.plotX = g.x, a.plotY = g.y, a.plotZ = g.z
                    }; d.defaultOptions = q(y.defaultOptions);
                    return d
                }(y); a(y, "afterTranslate", function () { this.chart.is3d() && this.translate3dPoints() }); H(y.prototype, { translate3dPoints: v.prototype.translate3dPoints }); return v
            }); F(a, "Series/Area3D/Area3DSeries.js", [a["Core/Math3D.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, y, v) {
                function z(a) {
                    var f = a.apply(this, [].slice.call(arguments, 1)); if (!this.chart.is3d()) return f; var d = H.getGraphPath, b = this.options, k = Math.round(this.yAxis.getThreshold(b.threshold)), g = []; if (this.rawPointsX) for (var q =
                        0; q < this.points.length; q++)g.push({ x: this.rawPointsX[q], y: b.stacking ? this.points[q].yBottom : k, z: this.zPadding }); b = this.chart.options.chart.options3d; g = m(g, this.chart, !0).map(function (a) { return { plotX: a.x, plotY: a.y, plotZ: a.z } }); this.group && b && b.depth && b.beta && (this.markerGroup && (this.markerGroup.add(this.group), this.markerGroup.attr({ translateX: 0, translateY: 0 })), this.group.attr({ zIndex: Math.max(1, 270 < b.beta || 90 > b.beta ? b.depth - Math.round(this.zPadding || 0) : Math.round(this.zPadding || 0)) })); g.reversed =
                            !0; d = d.call(this, g, !0, !0); d[0] && "M" === d[0][0] && (d[0] = ["L", d[0][1], d[0][2]]); this.areaPath && (d = this.areaPath.splice(0, this.areaPath.length / 2).concat(d), d.xMap = this.areaPath.xMap, this.areaPath = d); return f
                } var m = a.perspective, H = y.seriesTypes.line.prototype, q = v.wrap, C = []; return { compose: function (a) { -1 === C.indexOf(a) && (C.push(a), q(a.prototype, "getGraphPath", z)) } }
            }); F(a, "Series/Column3D/Column3DComposition.js", [a["Series/Column/ColumnSeries.js"], a["Core/Globals.js"], a["Core/Series/Series.js"], a["Core/Math3D.js"],
            a["Core/Series/SeriesRegistry.js"], a["Core/Axis/Stacking/StackItem.js"], a["Core/Utilities.js"]], function (a, y, v, D, m, H, q) {
                function z(a, b) { var d = a.series, f = { totalStacks: 0 }, g, k = 1; d.forEach(function (a) { g = B(a.options.stack, b ? 0 : d.length - 1 - a.index); f[g] ? f[g].series.push(a) : (f[g] = { series: [a], position: k }, k++) }); f.totalStacks = k + 1; return f } function f(a) {
                    var b = a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d && this.chart.is3d() && (b.stroke = this.options.edgeColor || b.fill, b["stroke-width"] = B(this.options.edgeWidth,
                        1)); return b
                } function l(a, b, d) { var f = this.chart.is3d && this.chart.is3d(); f && (this.options.inactiveOtherPoints = !0); a.call(this, b, d); f && (this.options.inactiveOtherPoints = !1) } function d(a) { for (var b = [], d = 1; d < arguments.length; d++)b[d - 1] = arguments[d]; return this.series.chart.is3d() ? this.graphic && "g" !== this.graphic.element.nodeName : a.apply(this, b) } var b = a.prototype, k = y.svg, g = D.perspective; y = q.addEvent; var B = q.pick; q = q.wrap; q(b, "translate", function (a) {
                    a.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() &&
                        this.translate3dShapes()
                }); q(v.prototype, "justifyDataLabel", function (a) { return arguments[2].outside3dPlot ? !1 : a.apply(this, [].slice.call(arguments, 1)) }); b.translate3dPoints = function () { }; b.translate3dShapes = function () {
                    var a = this, b = a.chart, d = a.options, f = d.depth, k = (d.stacking ? d.stack || 0 : a.index) * (f + (d.groupZPadding || 1)), l = a.borderWidth % 2 ? .5 : 0, m; b.inverted && !a.yAxis.reversed && (l *= -1); !1 !== d.grouping && (k = 0); k += d.groupZPadding || 1; a.data.forEach(function (d) {
                        d.outside3dPlot = null; if (null !== d.y) {
                            var n = d.shapeArgs,
                            h = d.tooltipPos, p;[["x", "width"], ["y", "height"]].forEach(function (b) { p = n[b[0]] - l; 0 > p && (n[b[1]] += n[b[0]] + l, n[b[0]] = -l, p = 0); p + n[b[1]] > a[b[0] + "Axis"].len && 0 !== n[b[1]] && (n[b[1]] = a[b[0] + "Axis"].len - n[b[0]]); if (0 !== n[b[1]] && (n[b[0]] >= a[b[0] + "Axis"].len || n[b[0]] + n[b[1]] <= l)) { for (var c in n) n[c] = "y" === c ? -9999 : 0; d.outside3dPlot = !0 } }); "rect" === d.shapeType && (d.shapeType = "cuboid"); n.z = k; n.depth = f; n.insidePlotArea = !0; m = { x: n.x + n.width / 2, y: n.y, z: k + f / 2 }; b.inverted && (m.x = n.height, m.y = d.clientX); d.plot3d = g([m], b, !0,
                                !1)[0]; h = g([{ x: h[0], y: h[1], z: k + f / 2 }], b, !0, !1)[0]; d.tooltipPos = [h.x, h.y]
                        }
                    }); a.z = k
                }; q(b, "animate", function (a) {
                    if (this.chart.is3d()) {
                        var b = arguments[1], d = this.yAxis, f = this, g = this.yAxis.reversed; k && (b ? f.data.forEach(function (a) { null !== a.y && (a.height = a.shapeArgs.height, a.shapey = a.shapeArgs.y, a.shapeArgs.height = 1, g || (a.shapeArgs.y = a.stackY ? a.plotY + d.translate(a.stackY) : a.plotY + (a.negative ? -a.height : a.height))) }) : (f.data.forEach(function (a) {
                            if (null !== a.y && (a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey,
                                a.graphic)) a.graphic[a.outside3dPlot ? "attr" : "animate"](a.shapeArgs, f.options.animation)
                        }), this.drawDataLabels()))
                    } else a.apply(this, [].slice.call(arguments, 1))
                }); q(b, "plotGroup", function (a, b, d, f, g, k) {
                    "dataLabelsGroup" !== b && this.chart.is3d() && (this[b] && delete this[b], k && (this.chart.columnGroup || (this.chart.columnGroup = this.chart.renderer.g("columnGroup").add(k)), this[b] = this.chart.columnGroup, this.chart.columnGroup.attr(this.getPlotBox()), this[b].survive = !0, "group" === b || "markerGroup" === b)) && (arguments[3] =
                        "visible"); return a.apply(this, Array.prototype.slice.call(arguments, 1))
                }); q(b, "setVisible", function (a, b) { var d = this; d.chart.is3d() && d.data.forEach(function (a) { a.visible = a.options.visible = b = "undefined" === typeof b ? !B(d.visible, a.visible) : b; d.options.data[d.data.indexOf(a)] = a.options; a.graphic && a.graphic.attr({ visibility: b ? "visible" : "hidden" }) }); a.apply(this, Array.prototype.slice.call(arguments, 1)) }); y(a, "afterInit", function () {
                    if (this.chart.is3d()) {
                        var a = this.options, b = a.grouping, d = a.stacking, f = this.yAxis.options.reversedStacks,
                        g = 0; if ("undefined" === typeof b || b) { b = z(this.chart, d); g = a.stack || 0; for (d = 0; d < b[g].series.length && b[g].series[d] !== this; d++); g = 10 * (b.totalStacks - b[g].position) + (f ? d : -d); this.xAxis.reversed || (g = 10 * b.totalStacks - g) } a.depth = a.depth || 25; this.z = this.z || 0; a.zIndex = g
                    }
                }); q(b, "pointAttribs", f); q(b, "setState", l); q(b.pointClass.prototype, "hasNewShapeType", d); m.seriesTypes.columnRange && (y = m.seriesTypes.columnrange.prototype, q(y, "pointAttribs", f), q(y, "setState", l), q(y.pointClass.prototype, "hasNewShapeType", d), y.plotGroup =
                    b.plotGroup, y.setVisible = b.setVisible); q(v.prototype, "alignDataLabel", function (a, b, d, f, k) {
                        var l = this.chart; f.outside3dPlot = b.outside3dPlot; if (l.is3d() && this.is("column")) { var m = this.options, n = B(f.inside, !!this.options.stacking), p = l.options.chart.options3d, h = b.pointWidth / 2 || 0; m = { x: k.x + h, y: k.y, z: this.z + m.depth / 2 }; l.inverted && (n && (k.width = 0, m.x += b.shapeArgs.height / 2), 90 <= p.alpha && 270 >= p.alpha && (m.y += b.shapeArgs.width)); m = g([m], l, !0, !1)[0]; k.x = m.x - h; k.y = b.outside3dPlot ? -9E9 : m.y } a.apply(this, [].slice.call(arguments,
                            1))
                    }); q(H.prototype, "getStackBox", function (a, b, d, f, k, l, q, v) { var n = a.apply(this, [].slice.call(arguments, 1)); if (b.is3d() && d.base) { var h = +d.base.split(",")[0], p = b.series[h]; h = b.options.chart.options3d; p && p instanceof m.seriesTypes.column && (p = { x: n.x + (b.inverted ? q : l / 2), y: n.y, z: p.options.depth / 2 }, b.inverted && (n.width = 0, 90 <= h.alpha && 270 >= h.alpha && (p.y += l)), p = g([p], b, !0, !1)[0], n.x = p.x - l / 2, n.y = p.y) } return n }); ""; return a
            }); F(a, "Series/Pie3D/Pie3DPoint.js", [a["Core/Series/SeriesRegistry.js"]], function (a) {
                var y =
                    this && this.__extends || function () { var a = function (m, v) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, m) { a.__proto__ = m } || function (a, m) { for (var f in m) m.hasOwnProperty(f) && (a[f] = m[f]) }; return a(m, v) }; return function (m, v) { function q() { this.constructor = m } a(m, v); m.prototype = null === v ? Object.create(v) : (q.prototype = v.prototype, new q) } }(); a = a.seriesTypes.pie.prototype.pointClass; var v = a.prototype.haloPath; return function (a) {
                        function m() {
                            var m = null !== a && a.apply(this, arguments) || this; m.series =
                                void 0; return m
                        } y(m, a); m.prototype.haloPath = function () { return this.series.chart.is3d() ? [] : v.apply(this, arguments) }; return m
                    }(a)
            }); F(a, "Series/Pie3D/Pie3DSeries.js", [a["Core/Globals.js"], a["Series/Pie3D/Pie3DPoint.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, y, v, D) {
                var m = this && this.__extends || function () {
                    var a = function (f, d) {
                        a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, d) { a.__proto__ = d } || function (a, d) { for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]) };
                        return a(f, d)
                    }; return function (f, d) { function b() { this.constructor = f } a(f, d); f.prototype = null === d ? Object.create(d) : (b.prototype = d.prototype, new b) }
                }(), z = a.deg2rad, q = a.svg; a = D.extend; var C = D.pick; v = function (a) {
                    function f() { return null !== a && a.apply(this, arguments) || this } m(f, a); f.prototype.addPoint = function () { a.prototype.addPoint.apply(this, arguments); this.chart.is3d() && this.update(this.userOptions, !0) }; f.prototype.animate = function (d) {
                        if (this.chart.is3d()) {
                            var b = this.options.animation; var f = this.center;
                            var g = this.group, l = this.markerGroup; q && (!0 === b && (b = {}), d ? (g.oldtranslateX = C(g.oldtranslateX, g.translateX), g.oldtranslateY = C(g.oldtranslateY, g.translateY), f = { translateX: f[0], translateY: f[1], scaleX: .001, scaleY: .001 }, g.attr(f), l && (l.attrSetters = g.attrSetters, l.attr(f))) : (f = { translateX: g.oldtranslateX, translateY: g.oldtranslateY, scaleX: 1, scaleY: 1 }, g.animate(f, b), l && l.animate(f, b)))
                        } else a.prototype.animate.apply(this, arguments)
                    }; f.prototype.drawDataLabels = function () {
                        if (this.chart.is3d()) {
                            var d = this.chart.options.chart.options3d;
                            this.data.forEach(function (a) { var b = a.shapeArgs, f = b.r, l = (b.start + b.end) / 2; a = a.labelPosition; var m = a.connectorPosition, q = -f * (1 - Math.cos((b.alpha || d.alpha) * z)) * Math.sin(l), w = f * (Math.cos((b.beta || d.beta) * z) - 1) * Math.cos(l);[a.natural, m.breakAt, m.touchingSliceAt].forEach(function (a) { a.x += w; a.y += q }) })
                        } a.prototype.drawDataLabels.apply(this, arguments)
                    }; f.prototype.pointAttribs = function (d) {
                        var b = a.prototype.pointAttribs.apply(this, arguments), f = this.options; this.chart.is3d() && !this.chart.styledMode && (b.stroke =
                            f.edgeColor || d.color || this.color, b["stroke-width"] = C(f.edgeWidth, 1)); return b
                    }; f.prototype.translate = function () {
                        a.prototype.translate.apply(this, arguments); if (this.chart.is3d()) {
                            var d = this, b = d.options, f = b.depth || 0, g = d.chart.options.chart.options3d, l = g.alpha, m = g.beta, q = b.stacking ? (b.stack || 0) * f : d._i * f; q += f / 2; !1 !== b.grouping && (q = 0); d.data.forEach(function (a) {
                                var g = a.shapeArgs; a.shapeType = "arc3d"; g.z = q; g.depth = .75 * f; g.alpha = l; g.beta = m; g.center = d.center; g = (g.end + g.start) / 2; a.slicedTranslation = {
                                    translateX: Math.round(Math.cos(g) *
                                        b.slicedOffset * Math.cos(l * z)), translateY: Math.round(Math.sin(g) * b.slicedOffset * Math.cos(l * z))
                                }
                            })
                        }
                    }; f.prototype.drawTracker = function () { a.prototype.drawTracker.apply(this, arguments); this.chart.is3d() && this.points.forEach(function (a) { a.graphic && ["out", "inn", "side1", "side2"].forEach(function (b) { a.graphic && (a.graphic[b].element.point = a) }) }) }; return f
                }(v.seriesTypes.pie); a(v.prototype, { pointClass: y }); ""; return v
            }); F(a, "Series/Pie3D/Pie3DComposition.js", [a["Series/Pie3D/Pie3DPoint.js"], a["Series/Pie3D/Pie3DSeries.js"],
            a["Core/Series/SeriesRegistry.js"]], function (a, y, v) { v.seriesTypes.pie.prototype.pointClass.prototype.haloPath = a.prototype.haloPath; v.seriesTypes.pie = y }); F(a, "Series/Scatter3D/Scatter3DPoint.js", [a["Series/Scatter/ScatterSeries.js"], a["Core/Utilities.js"]], function (a, y) {
                var v = this && this.__extends || function () {
                    var a = function (m, q) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, f) { a.__proto__ = f } || function (a, f) { for (var l in f) f.hasOwnProperty(l) && (a[l] = f[l]) }; return a(m, q) }; return function (m,
                        q) { function v() { this.constructor = m } a(m, q); m.prototype = null === q ? Object.create(q) : (v.prototype = q.prototype, new v) }
                }(), z = y.defined; return function (a) { function m() { var m = null !== a && a.apply(this, arguments) || this; m.options = void 0; m.series = void 0; return m } v(m, a); m.prototype.applyOptions = function () { a.prototype.applyOptions.apply(this, arguments); z(this.z) || (this.z = 0); return this }; return m }(a.prototype.pointClass)
            }); F(a, "Series/Scatter3D/Scatter3DSeries.js", [a["Core/Math3D.js"], a["Series/Scatter3D/Scatter3DPoint.js"],
            a["Series/Scatter/ScatterSeries.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, y, v, D, m) {
                var z = this && this.__extends || function () { var a = function (f, d) { a = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, d) { a.__proto__ = d } || function (a, d) { for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]) }; return a(f, d) }; return function (f, d) { function b() { this.constructor = f } a(f, d); f.prototype = null === d ? Object.create(d) : (b.prototype = d.prototype, new b) } }(), q = a.pointCameraDistance; a = m.extend;
                var C = m.merge; m = function (a) { function f() { var d = null !== a && a.apply(this, arguments) || this; d.data = void 0; d.options = void 0; d.points = void 0; return d } z(f, a); f.prototype.pointAttribs = function (d) { var b = a.prototype.pointAttribs.apply(this, arguments); this.chart.is3d() && d && (b.zIndex = q(d, this.chart)); return b }; f.defaultOptions = C(v.defaultOptions, { tooltip: { pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>" } }); return f }(v); a(m.prototype, {
                    axisTypes: ["xAxis", "yAxis", "zAxis"], directTouch: !0,
                    parallelArrays: ["x", "y", "z"], pointArrayMap: ["x", "y", "z"], pointClass: y
                }); D.registerSeriesType("scatter3d", m); ""; return m
            }); F(a, "masters/highcharts-3d.src.js", [a["Core/Globals.js"], a["Core/Renderer/SVG/SVGRenderer3D.js"], a["Core/Chart/Chart3D.js"], a["Core/Axis/ZAxis.js"], a["Core/Axis/Axis3DComposition.js"], a["Series/Area3D/Area3DSeries.js"]], function (a, y, v, D, m, F) { y.compose(a.SVGRenderer); v.compose(a.Chart, a.Fx); D.compose(a.Chart); m.compose(a.Axis, a.Tick); F.compose(a.seriesTypes.area) })
});
//# sourceMappingURL=highcharts-3d.js.map