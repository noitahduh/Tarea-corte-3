export interface TagOption {
  id: string;
  name: string;
  isSelected: boolean;
}

export interface TagFilterGroupProps {
  title: string;
  tags: TagOption[];
  onTagToggle?: (tagId: string) => void;
}

export function TagFilterGroup({ title, tags, onTagToggle }: TagFilterGroupProps) {
  return (
    <fieldset className="flex min-w-0 flex-col gap-2">
      <legend className="mb-2 text-sm font-semibold">{title}</legend>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const checkedProps = onTagToggle
            ? { checked: tag.isSelected, onChange: () => onTagToggle(tag.id) }
            : { defaultChecked: tag.isSelected };

          return (
            <label key={tag.id} className="group cursor-pointer">
              <input
                type="checkbox"
                name="tags"
                value={tag.id}
                className="peer sr-only"
                {...checkedProps}
              />
              <span className="badge badge-lg h-auto gap-1 border-base-300 bg-base-100 py-1 font-medium text-base-content transition-colors select-none group-hover:border-primary peer-checked:border-primary peer-checked:bg-primary peer-checked:text-primary-content peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-base-100">
                <span aria-hidden="true" className="group-has-checked:hidden">
                  +
                </span>
                <span aria-hidden="true" className="hidden group-has-checked:inline">
                  ✓
                </span>
                {tag.name}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
