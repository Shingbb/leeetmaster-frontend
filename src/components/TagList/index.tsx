import { Tag } from "antd";
import "./index.css";

interface Props {
  tagList?: string[];
}

/**
 * 标签列表组件
 * @param props
 * @constructor
 */
const TagList = (props: Props) => {
  const { tagList = [] } = props;

  return (
      // 遍历标签列表，为每个标签生成一个Tag组件
      // 使用map函数遍历tagList数组，每个元素生成一个Tag组件
    <div className="tag-list">
      {tagList.map((tag) => {
        // 生成并返回一个Tag组件，设置唯一的key属性以优化性能
        // key属性使用当前标签的值，这有助于React识别和更新DOM
        return <Tag key={tag}>{tag}</Tag>;
      })}
    </div>
  );
};

export default TagList;
