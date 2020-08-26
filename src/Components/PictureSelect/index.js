import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.css'

class PictureSelect extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectUrl: '',// 查看图片url
            selectId: '',// 查看图片id
            isShow: false, // 是否展示遮罩
        };
    }

    // 全选
    checkAll() {
        /**
         * 如果arr为空改变使用onChange修改value为所有
         * 否则为空
         */
        const { pictures, onChange, value } = this.props;
        let arr = value;
        if (arr.length === 0) {
            pictures.map(item => {
                arr.push(item.id);
            })
        } else {
            arr = [];
        }
        onChange([...arr]);
    }

    // 单独选择
    checkOne (id) {
        /**
         * 如果包含对应id 则删除
         * 否则则添加
         * onChange修改value
         */
        const { value, onChange } = this.props;
        let arr = value;
        if (arr.includes(id)) {
            let index = arr.indexOf(id);
            arr.splice(index, 1);
        } else {
            arr.push(id)
        }
        onChange([...arr]);
    }

    // 点击图片
    selectImg(url, id) {
        this.setState({
            selectUrl: url,
            selectId: id,
            isShow: true
        })
    }

    // 关闭遮罩
    close() {
        this.setState({
            isShow: false
        })
    }

    render () {
        const { selectUrl, selectId, isShow } = this.state;
        const { pictures, value } = this.props;
        return (
            <>
                <div className="top">
                    <input type="checkbox" checked={value.length === pictures.length ? true : false} onChange={this.checkAll.bind(this)} />已选中{value.length}个文件
                </div>
                <ul className="list">
                    {
                        pictures.length > 0 ? pictures.map(item => {
                            return (<li key={item.id}>
                                <input type="checkbox" checked={value.includes(item.id) ? true : false} onChange={this.checkOne.bind(this, item.id)} />
                                <img src={item.url} alt={item.name} onClick={this.selectImg.bind(this, item.url, item.id)} />
                            </li>)
                        }) : "暂无数据"
                    }
                </ul>
                {
                    isShow && <div className="toast" onClick={this.close.bind(this)}>
                    <img src={selectUrl} alt={selectId} />
                    <p>{selectId}</p>
                </div>
                }
            </>
        )
    }
}

PictureSelect.propTypes = {
    pictures: PropTypes.array,
    value: PropTypes.array,
    onChange: PropTypes.func
};

export default PictureSelect;