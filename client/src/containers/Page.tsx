import { ChildrenElement } from "../types";

/**
 * Adjusts ChildrenElement type with custom page variables.
 */
interface PagePropType extends ChildrenElement {
  title: string | JSX.Element;
  actionBtn?: JSX.Element;
}

/**
 * @param children Page content rendered as JSX.Element
 * @param title Page title.
 * @param button Action button displayed at the top of the page.
 */
const Page = ({ children, title, actionBtn }: PagePropType): JSX.Element => {
  return (
    <div className="p-10">
      <div className="mb-10 flex flex-row justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        {actionBtn}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Page;
