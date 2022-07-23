import { ChildrenElement } from "../types";

/**
 * Adjusts ChildrenElement type with custom page variables.
 */
interface PagePropType extends ChildrenElement {
  title: string | JSX.Element;
}

/**
 * @param children Page content rendered as JSX.Element
 * @param title Page title.
 */
const Page = ({ children, title }: PagePropType): JSX.Element => {
  return (
    <div className="p-10">
      <div className="mb-10">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Page;
