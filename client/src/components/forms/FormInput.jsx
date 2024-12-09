import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { placeholderCn, resetOutline } from '@/lib/classnames'
import PropTypes from 'prop-types'

const FormInput = ({ form, label, name, type = 'text', placeholder }) => {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>
                        {label}
                    </FormLabel>}
                    <FormControl>
                        <Input
                            type={type}
                            className={cn(resetOutline, placeholderCn)}
                            placeholder={placeholder}
                            {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default FormInput
FormInput.propTypes = {
    form: PropTypes.shape({
        control: PropTypes.any.isRequired
    }),
    label: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['text', 'password'])
}