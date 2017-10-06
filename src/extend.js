function extend(Child, Parent) {
    const prevChildProto = {};
    for (var cm in Child.prototype) {
        const member = Child.prototype[cm];
        if (typeof member === 'function') {
            prevChildProto[cm] = member;
        }
    }
    const F = function() {};
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    for (var pcm in prevChildProto)
        Child.prototype[pcm] = prevChildProto[pcm];
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}
export default extend;