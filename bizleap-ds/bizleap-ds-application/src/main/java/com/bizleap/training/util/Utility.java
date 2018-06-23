package com.bizleap.training.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

public class Utility {
	// List of all date formats that we want to parse.
    // Add your own format here.
    private static List<SimpleDateFormat> 
            dateFormats = new ArrayList<SimpleDateFormat>(){{
               
                add(new SimpleDateFormat("dd/M/yyyy"));
                add(new SimpleDateFormat("yyyy-MM-dd"));
               /* add(new SimpleDateFormat("dd.M.yyyy"));
                add(new SimpleDateFormat("M/dd/yyyy hh:mm:ss a"));
                add(new SimpleDateFormat("dd.M.yyyy hh:mm:ss a"));
                add(new SimpleDateFormat("dd.MMM.yyyy"));
                add(new SimpleDateFormat("dd-MMM-yyyy"));
                add(new SimpleDateFormat("MMM-yy"));*/
            }
        };
    
		/**
	     * Convert String with various formats into java.util.Date
	     *
	     * @param input
	     *            Date as a string
	     * @return java.util.Date object if input string is parsed
	     *          successfully else returns null
	     */
	    public static Date convertToDate(String input) {
	        Date date = null;
	        if(null == input) {
	            return null;
	        }
	        for (SimpleDateFormat format : dateFormats) {
	            try {
	                format.setLenient(false);
	                date = format.parse(input);
	            } catch (ParseException e) {
	                // try other formats
	            }
	            if (date != null) {
	                break;
	            }
	        }
	 
	        return date;
	    }
	    public  static List<String> splitName(String name){
			//System.out.println("To split name "+name);
			List<String> nameList = new ArrayList<String>();
			String [] nameStr = name.split(" ");
			if(nameStr[0].equals("U") || nameStr[0].equals("Daw") || 
					nameStr[0].equals("Ma") || nameStr[0].equals("Ko") ||
					nameStr[0].equals("Mg"))
			{	nameList.add(nameStr[0]); name="";
				for(int i=1;i<nameStr.length;i++)
					name+=nameStr[i]+" ";
			}
			else nameList.add("");
			String mid=null, last=null;
			int j = -1;
			StringTokenizer st = new StringTokenizer(name);
			if(st.countTokens()>0){
			String[]nn = new String[st.countTokens()];
		
			while(st.hasMoreTokens())
				nn[++j]=st.nextToken();
			
			nameList.add(nn[0]);
			if(nn.length>1)
				last = nn[nn.length-1];
			
			for(int i = 1;i<nn.length-1;i++)
			{	if(mid==null)mid = nn[i];
				else mid += " "+nn[i];
			}
			nameList.add(mid);
			nameList.add(last);
			}
			return nameList;
		}
}
