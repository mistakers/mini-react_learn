function createTextNode(Text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            children: [],
            nodeValue: Text,
        }
    } 
}

function createElement(type, props, ...children) {
    return {
        type: type,
        props: {
            ...props,
            children: children ? children.map(chind => {
                return  typeof chind === 'string' ? createTextNode(chind) : chind
              }): [],
       }
    }
}



function render(el, container) {
    const { type, props } = el;
    let dom = type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement('div');
    Object.keys(props).forEach(key => {
        if (key !== 'children') {
            dom[key] = props[key]
        }
    })
    props.children && props.children.forEach(child => {
        render(child, dom)
    })

    container.append(dom);
}

const React = {
    createTextNode,
    createElement,
    render
}

export default React;