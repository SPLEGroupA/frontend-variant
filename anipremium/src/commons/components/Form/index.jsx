import React from "react";

const Form = (props) => {
  const { title, id_name, children } = props;

  return (
    <div className="max-w-full prose">
      <h2 className="h2">{title}</h2>
      <form
        className="bg-white card shadow-xl max-w-full"
        id={id_name}
        {...props}
        title={undefined}
      >
        <div className="card-body">
          <fieldset className="columns-2 space-y-4">{children}</fieldset>
        </div>
      </form>
    </div>
  );
};

export default Form;
