<svelte:options tag="goa-form-item" />

<!-- Script -->
<script lang="ts">
  import { onMount } from "svelte";
  import type { Spacing } from "../../common/styling";
  import { calculateMargin } from "../../common/styling";
  import { typeValidator, toBoolean } from "../../common/utils";

  // Validators
  const [REQUIREMENT_TYPES, validateRequirementType] = typeValidator(
    "Requirement type",
    ["optional", "required"],
    false,
  );

  type RequirementType = (typeof REQUIREMENT_TYPES)[number];

  export let testid: string = "";

  // margin
  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Optional
  export let label: string = "";
  export let helptext: string = "";
  export let error: string = "";
  export let requirement: RequirementType = "";

  onMount(() => {
    validateRequirementType(requirement);
  })

</script>

<!-- HTML -->
<div
  data-testid={testid}
  style={calculateMargin(mt, mr, mb, ml)}
  class="goa-form-item"
>
  {#if label}
    <div class="label">
      {label}
      {#if requirement && REQUIREMENT_TYPES.includes(requirement)}
        <em>({requirement})</em>
      {/if}
    </div>
  {/if}
  <div class="form-item-input">
    <slot />
  </div>
  {#if error}
    <div class="error-msg">
      <goa-icon type="warning" size="small" theme="filled" style="pointer-events: none;" />
      {error}
    </div>
  {/if}
  {#if helptext}
    <div class="help-msg">{helptext}</div>
  {/if}
</div>

<!-- Style -->
<style>
  :host {
    box-sizing: border-box;
    font-family: var(--goa-font-family-sans);
  }

  * {
    box-sizing: border-box;
  }

  .label {
    display: block;
    font-weight: var(--goa-font-weight-bold);
    color: var(--goa-color-text-default);
    font-size: var(--goa-font-size-4);
    padding: 0.5rem 0;
  }

  .label em {
    color: var(--goa-color-greyscale-700);
    font-weight: var(--goa-font-weight-regular);
    font-size: var(--goa-font-size-2);
    line-height: var(--goa-line-height-1);
    font-style: normal;
  }

  .form-item-input {
    margin-bottom: 0.25rem;
  }

  .help-msg {
    font-size: var(--goa-font-size-2);
    color: var(--goa-color-text-default);
    margin-right: 56px;
  }

  .error-msg {
    display: inline-flex;
    gap: 0.25rem;
    font-size: var(--goa-font-size-2);
    color: var(--goa-color-interactive-error);
    margin-bottom: 0.25rem;
  }
</style>
